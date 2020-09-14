In previous articles we looked at all the essential JavaScript object theory and syntax details, giving you a solid base to start from. In this article we dive into a practical exercise, giving you some more practice in building custom JavaScript objects, with a fun and colorful result.

To see how it works, let's quickly look again at our Bouncing Balls example ([see it live](https://mdn.github.io/learning-area/javascript/oojs/bouncing-balls/index-finished.html), and also see [the source code](https://github.com/mdn/learning-area/tree/master/javascript/oojs/bouncing-balls)). The code for the loop that keeps everything moving looks like this:

```js
function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);

  for(let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();
```

We run the `loop()` function once at the bottom of the code to start the cycle, drawing the first animation frame; the `loop()` function then takes charge of calling `requestAnimationFrame(loop)` to run the next frame of the animation, again and again.

Note that on each frame we are completely clearing the canvas and redrawing everything. For every ball present we draw it, update its position, and check to see if it is colliding with any other balls. Once you've drawn a graphic to a canvas, there's no way to manipulate that graphic individually like you can with DOM elements. You can't move each ball around on the canvas, because once it's drawn, it's part of the canvas, and is not an individual accessible element or object. Instead, you have to erase and redraw, either by erasing the entire frame and redrawing everything, or by having code that knows exactly what parts need to be erased and only erases and redraws the minimum area of the canvas necessary.

Optimizing animation of graphics is an entire specialty of programming, with lots of clever techniques available. Those are beyond what we need for our example, though!

In general, the process of doing a canvas animation involves the following steps:

1. Clear the canvas contents (e.g. with [`fillRect()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillRect) or [`clearRect()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect)).
2. Save state (if necessary) using [`save()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save) — this is needed when you want to save settings you've updated on the canvas before continuing, which is useful for more advanced applications.
3. Draw the graphics you are animating.
4. Restore the settings you saved in step 2, using [`restore()`](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore)
5. Call `requestAnimationFrame()` to schedule drawing of the next frame of the animation.

**Note**: We won't cover `save()` and `restore()` here, but they are explained nicely in our [Transformations](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Transformations) tutorial (and the ones that follow it).

## Let's bounce some balls[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice#Let's_bounce_some_balls)

In this article we will write a classic "bouncing balls" demo, to show you how useful objects can be in JavaScript. Our little balls will bounce around on the screen, and change color when they touch each other. The finished example will look a little something like this:

![img](https://mdn.mozillademos.org/files/13865/bouncing-balls.png)



This example will make use of the [Canvas API](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Drawing_graphics) for drawing the balls to the screen, and the [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) API for animating the whole display — you don't need to have any previous knowledge of these APIs, and we hope that by the time you've finished this article you'll be interested in exploring them more. Along the way we'll make use of some nifty objects, and show you a couple of nice techniques like bouncing balls off walls, and checking whether they have hit each other (otherwise known as **collision detection**).

## Getting started[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice#Getting_started)

To begin with, make local copies of our `index.html`, `style.css`, and `main.js` files. These contain the following, respectively:

1. A very simple HTML document featuring an [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1) element, a [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas) element to draw our balls on, and elements to apply our CSS and JavaScript to our HTML.
2. Some very simple styles, which mainly serve to style and position the `<h1>`, and get rid of any scrollbars or margin round the edge of the page (so that it looks nice and neat).
3. Some JavaScript that serves to set up the `<canvas>` element and provide a general function that we're going to use.

The first part of the script looks like so:

```js
var canvas = document.querySelector('canvas');

var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;
```

This script gets a reference to the `<canvas>` element, then calls the `getContext()` method on it to give us a context on which we can start to draw. The resulting variable (`ctx`) is the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it.

Next, we set variables called `width` and `height`, and the width and height of the canvas element (represented by the `canvas.width` and `canvas.height` properties) to equal the width and height of the browser viewport (the area that the webpage appears on — this can be got from the [`Window.innerWidth`](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerWidth) and [`Window.innerHeight`](https://developer.mozilla.org/en-US/docs/Web/API/Window/innerHeight) properties).

You'll see here that we are chaining multiple assignments together, to get the variables all set quicker — this is perfectly OK.

The last bit of the initial script looks as follows:

```js
function random(min, max) {
  var num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}
```

This function takes two numbers as arguments, and returns a random number in the range between the two.

## Modeling a ball in our program[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice#Modeling_a_ball_in_our_program)

Our program will feature lots of balls bouncing around the screen. Since these balls will all behave in the same kind of way, it makes sense to represent them with an object. Let's start by adding the following constructor to the bottom of our code.

```js
function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}
```

Here we include some parameters that define the properties each ball needs to function in our program:

- `x` and `y` coordinates — the horizontal and vertical coordinates where the ball will start on the screen. This can range between 0 (top left hand corner) to the width and height of the browser viewport (bottom right hand corner).
- horizontal and vertical velocity (`velX` and `velY`) — each ball is given a horizontal and vertical velocity; in real terms these values will be regularly added to the `x`/`y` coordinate values when we start to animate the balls, to move them by this much on each frame.
- `color` — each ball gets a color.
- `size` — each ball gets a size — this will be its radius, in pixels.

This sorts the properties out, but what about the methods? We want to actually get our balls to do something in our program.

### Drawing the ball[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice#Drawing_the_ball)

First add the following `draw()` method to the `Ball()`'s `prototype`:

```js
Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();
}
```

Using this function, we can tell our ball to draw itself onto the screen, by calling a series of members of the 2D canvas context we defined earlier (`ctx`). The context is like the paper, and now we want to command our pen to draw something on it:

- First, we use `beginPath()` to state that we want to draw a shape on the paper.

- Next, we use `fillStyle` to define what color we want the shape to be — we set it to our ball's `color` property.

- Next, we use the

   

  ```
  arc()
  ```

   

  method to trace an arc shape on the paper. Its parameters are:

  - The `x` and `y` position of the arc's center — we are specifying our ball's `x` and `y`properties.
  - The radius of our arc — we are specifying our ball's `size` property.
  - The last two parameters specify the start and end number of degrees round the circle that the arc is drawn between. Here we specify 0 degrees, and `2 * PI`, which is the equivalent of 360 degrees in radians (annoyingly, you have to specify this in radians). That gives us a complete circle. If you had specified only `1 * PI`, you'd get a semi-circle (180 degrees).

- Last of all, we use the `fill()` method, which basically states "finish drawing the path we started with `beginPath()`, and fill the area it takes up with the color we specified earlier in `fillStyle`."

You can start testing your object out already.

1. Save the code so far, and load the HTML file in a browser.

2. Open the browser's JavaScript console, and then refresh the page so that the canvas size change to the smaller visible viewport left when the console opens.

3. Type in the following to create a new ball instance:

   ```js
   var testBall = new Ball(50, 100, 4, 4, 'blue', 10);
   ```

4. Try calling its members:

   ```js
   testBall.x
   testBall.size
   testBall.color
   testBall.draw()
   ```

5. When you enter the last line, you should see the ball draw itself somewhere on your canvas.

### Updating the ball's data[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice#Updating_the_ball's_data)

We can draw the ball in position, but to actually start moving the ball, we need an update function of some kind. Add the following code at the bottom of your JavaScript file, to add an `update()` method to the `Ball()`'s `prototype`:

```js
Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}
```

The first four parts of the function check whether the ball has reached the edge of the canvas. If it has, we reverse the polarity of the relevant velocity to make the ball travel in the opposite direction. So for example, if the ball was traveling upwards (positive `velY`), then the vertical velocity is changed so that it starts to travel downwards instead (negative `velY`).

In the four cases, we are:

- Checking to see whether the `x` coordinate is greater than the width of the canvas (the ball is going off the right hand edge).
- Checking to see whether the `x` coordinate is smaller than 0 (the ball is going off the left hand edge).
- Checking to see whether the `y` coordinate is greater than the height of the canvas (the ball is going off the top edge).
- Checking to see whether the `y` coordinate is smaller than 0 (the ball is going off the bottom edge).

In each case, we are including the `size` of the ball in the calculation because the `x`/`y`coordinates are in the center of the ball, but we want the edge of the ball to bounce off the perimeter — we don't want the ball to go halfway off the screen before it starts to bounce back.

The last two lines add the `velX` value to the `x` coordinate, and the `velY` value to the `y`coordinate — the ball is in effect moved each time this method is called.

This will do for now; let's get on with some animation!

## Animating the ball[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice#Animating_the_ball)

Now let's make this fun. We are now going to start adding balls to the canvas, and animating them.

1. First, we need to create somewhere to store all our balls and then populate it. The following will do this job — add it to the bottom of your code now:

   ```js
   var balls = [];
   
   while (balls.length < 25) {
     var size = random(10,20);
     var ball = new Ball(
       // ball position always drawn at least one ball width
       // away from the edge of the canvas, to avoid drawing errors
       random(0 + size,width - size),
       random(0 + size,height - size),
       random(-7,7),
       random(-7,7),
       'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
       size
     );
   
     balls.push(ball);
   }
   ```

   All programs that animate things generally involve an animation loop, which serves to update the information in the program and then render the resulting view on each frame of the animation; this is the basis for most games and other such programs. The `while`loop creates a new instance of our `Ball()` using random values generated with our `random()` function, then `push()`es it onto the end of our balls array, but only while the number of balls in the array is less than 25. So when we have 25 balls on screen, no more balls appear. You can try varying the number in `balls.length < 25` to get more or less balls on screen. Depending on how much processing power your computer/browser has, specifying several thousand balls might slow down the animation rather a lot!

2. Add the following to the bottom of your code now:

   ```js
   function loop() {
     ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
     ctx.fillRect(0, 0, width, height);
   
     for (var i = 0; i < balls.length; i++) {
       balls[i].draw();
       balls[i].update();
     }
   
     requestAnimationFrame(loop);
   }
   ```

   Our `loop()` function does the following:

   - Sets the canvas fill color to semi-transparent black, then draws a rectangle of the color across the whole width and height of the canvas, using `fillRect()` (the four parameters provide a start coordinate, and a width and height for the rectangle drawn). This serves to cover up the previous frame's drawing before the next one is drawn. If you don't do this, you'll just see long snakes worming their way around the canvas instead of balls moving! The color of the fill is set to semi-transparent, `rgba(0,0,0,0.25)`, to allow the previous few frames to shine through slightly, producing the little trails behind the balls as they move. If you changed 0.25 to 1, you won't see them at all any more. Try varying this number to see the effect it has.
   - Loops through all the balls in the `balls` array, and runs each ball's `draw()` and `update()` function to draw each one on the screen, then do the necessary updates to position and velocity in time for the next frame.
   - Runs the function again using the `requestAnimationFrame()` method — when this method is constantly run and passed the same function name, it will run that function a set number of times per second to create a smooth animation. This is generally done recursively — which means that the function is calling itself every time it runs, so it will run over and over again.

3. Last but not least, add the following line to the bottom of your code — we need to call the function once to get the animation started.

   ```js
   loop();
   ```

That's it for the basics — try saving and refreshing to test your bouncing balls out!

## Adding collision detection[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice#Adding_collision_detection)

Now for a bit of fun, let's add some collision detection to our program, so our balls will know when they have hit another ball.

1. First of all, add the following method definition below where you defined the

    

   ```
   update()
   ```

   method (i.e. the

    

   ```
   Ball.prototype.update
   ```

    

   block).

   ```js
   Ball.prototype.collisionDetect = function() {
     for (var j = 0; j < balls.length; j++) {
       if (!(this === balls[j])) {
         var dx = this.x - balls[j].x;
         var dy = this.y - balls[j].y;
         var distance = Math.sqrt(dx * dx + dy * dy);
   
         if (distance < this.size + balls[j].size) {
           balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
         }
       }
     }
   }
   ```

   This method is a little complex, so don't worry if you don't understand exactly how it works for now. An explanation follows:

   - For each ball, we need to check every other ball to see if it has collided with the current ball. To do this, we open up another `for` loop to loop through all the balls in the `balls[]` array.
   - Immediately inside our for loop, we use an `if` statement to check whether the current ball being looped through is the same ball as the one we are currently checking. We don't want to check whether a ball has collided with itself! To do this, we check whether the current ball (i.e., the ball whose collisionDetect method is being invoked) is the same as the loop ball (i.e., the ball that is being referred to by the current iteration of the for loop in the collisionDetect method). We then use `!` to negate the check, so that the code inside the if statement only runs if they are **not**the same.
   - We then use a common algorithm to check the collision of two circles. We are basically checking whether any of the two circle's areas overlap. This is explained further in [2D collision detection](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection).
   - If a collision is detected, the code inside the inner `if` statement is run. In this case we are just setting the `color` property of both the circles to a new random color. We could have done something far more complex, like get the balls to bounce off each other realistically, but that would have been far more complex to implement. For such physics simulations, developers tend to use a games or physics library such as [PhysicsJS](http://wellcaffeinated.net/PhysicsJS/), [matter.js](http://brm.io/matter-js/), [Phaser](http://phaser.io/), etc.

2. You also need to call this method in each frame of the animation. Add the following below the

    

   ```
   balls[i].update();
   ```

    

   line:

   ```js
   balls[i].collisionDetect();
   ```

3. Save and refresh the demo again, and you'll see your balls change color when they collide!

**Note**: If you have trouble getting this example to work, try comparing your JavaScript code against our [finished version](https://github.com/mdn/learning-area/blob/master/javascript/oojs/bouncing-balls/main-finished.js) (also see it [running live](http://mdn.github.io/learning-area/javascript/oojs/bouncing-balls/index-finished.html)).

## Summary[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice#Summary)

We hope you had fun writing your own real world random bouncing balls example, using various object and object-oriented techniques from throughout the module! This should have given you some useful practice in using objects, and good real world context.

That's it for object articles — all that remains now is for you to test your skills in the object assessment.

## See also[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Object_building_practice#See_also)

- [Canvas tutorial](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial) — a beginner's guide to using 2D canvas.
- [requestAnimationFrame()](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame)
- [2D collision detection](https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection)
- [3D collision detection](https://developer.mozilla.org/en-US/docs/Games/Techniques/3D_collision_detection)
- [2D breakout game using pure JavaScript](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript) — a great beginner's tutorial showing how to build a 2D game.
- [2D breakout game using Phaser](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_breakout_game_Phaser) — explains the basics of building a 2D game using a JavaScript game library.

[ Previous](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON)[ Overview: Objects](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects)[Next ](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features)

 



In this assessment, you are expected to use the bouncing balls demo from the previous article as a starting point, and add some new and interesting features to it.

| Prerequisites: | Before attempting this assessment you should have already worked through all the articles in this module. |
| :------------- | ------------------------------------------------------------ |
| Objective:     | To test comprehension of JavaScript objects and object-oriented constructs |

## Starting point[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features#Starting_point)

To get this assessment started, make a local copy of [index-finished.html](https://github.com/mdn/learning-area/blob/master/javascript/oojs/bouncing-balls/index-finished.html), [style.css](https://github.com/mdn/learning-area/blob/master/javascript/oojs/bouncing-balls/style.css), and [main-finished.js](https://github.com/mdn/learning-area/blob/master/javascript/oojs/bouncing-balls/main-finished.js) from our last article in a new directory in your local computer.

**Note**: Alternatively, you could use a site like [JSBin](http://jsbin.com/) or [Thimble](https://thimble.mozilla.org/) to do your assessment. You could paste the HTML, CSS and JavaScript into one of these online editors. If the online editor you are using doesn't have separate JavaScript/CSS panels, feel free to put them inline `<script>`/`<style>` elements inside the HTML page.

## Project brief[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features#Project_brief)

Our bouncy ball demo is fun, but now we want to make it a little bit more interactive by adding a user-controlled evil circle, which will eat the balls if it catches them. We also want to test your object-building skills by creating a generic `Shape()` object that our balls and evil circle can inherit from. Finally, we want to add a score counter to track the number of balls left to capture.

The following screenshot gives you an idea of what the finished program should look like:

![img](https://mdn.mozillademos.org/files/13875/bouncing-evil-circle.png)



To give you more of an idea, have a look at the [finished example](http://mdn.github.io/learning-area/javascript/oojs/assessment/) (no peeking at the source code!)

## Steps to complete[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features#Steps_to_complete)

The following sections describe what you need to do.

### Creating our new objects[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features#Creating_our_new_objects)

First of all, change your existing `Ball()` constructor so that it becomes a `Shape()` constructor and add a new `Ball()` constructor:

1. The `Shape()` constructor should define the `x`, `y`, `velX`, and `velY` properties in the same way as the `Ball()` constructor did originally, but not the `color` and `size`properties.
2. It should also define a new property called `exists`, which is used to track whether the balls exist in the program (have not been eaten by the evil circle). This should be a boolean (`true`/`false`).
3. The `Ball()` constructor should inherit the `x`, `y`, `velX`, `velY`, and `exists` properties from the `Shape()` constructor.
4. It should also define a `color` and a `size` property, like the original `Ball()` constructor did.
5. Remember to set the `Ball()` constructor's `prototype` and `constructor` appropriately.

The ball `draw()`, `update()`, and `collisionDetect()` method definitions should be able to stay exactly the same as they were before.

You also need to add a new parameter to the `new Ball() ( ... )` constructor call — the `exists` parameter should be the 5th parameter, and should be given a value of `true`.

At this point, try reloading the code — it should work just the same as it did before, with our redesigned objects.

### Defining EvilCircle()[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features#Defining_EvilCircle())

Now it's time to meet the bad guy — the `EvilCircle()`! Our game is only going to involve one evil circle, but we are still going to define it using a constructor that inherits from `Shape()` to give you some practice. You might want to add another circle to the app later on that can be controlled by another player, or have several computer-controlled evil circles. You're probably not going to take over the world with a single evil circle, but it will do for this assessment.

The `EvilCircle()` constructor should inherit `x`, `y`, `velX`, `velY`, and `exists` from `Shape()`, but `velX` and `velY` should always equal 20.

You should do this something like `Shape.call(this, x, y, 20, 20, exists);`

It should also define its own properties, as follows:

- `color` — `'white'`
- `size` — `10`

Again, remember to define your inherited properties as parameters in the constructor, and set the `prototype` and `constructor` properties correctly.

### Defining EvilCircle()'s methods[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features#Defining_EvilCircle()'s_methods)

`EvilCircle()` should have four methods, as described below.

#### `draw()`

This method has the same purpose as `Ball()`'s `draw()` method: It draws the object instance on the canvas. It will work in a very similar way, so you can start by copying the `Ball.prototype.draw` definition. You should then make the following changes:

- We want the evil circle to not be filled in, but rather just have an outer line (stroke). You can achieve this by updating `fillStyle` and `fill()` to `strokeStyle` and `stroke()`.
- We also want to make the stroke a bit thicker, so you can see the evil circle a bit more easily. This can be achieved by setting a value for `lineWidth` somewhere after the `beginPath()` call (3 will do).

#### `checkBounds()`

This method will do the same thing as the first part of `Ball()`'s `update()` function — look to see whether the evil circle is going to go off the edge of the screen, and stop it from doing so. Again, you can mostly just copy the `Ball.prototype.update` definition, but there are a few changes you should make:

- Get rid of the last two lines — we don't want to automatically update the evil circle's position on every frame, because we will be moving it in some other way, as you'll see below.
- Inside the `if()` statements, if the tests return true we don't want to update `velX`/`velY`; we want to instead change the value of `x`/`y` so the evil circle is bounced back onto the screen slightly. Adding or subtracting (as appropriate) the evil circle's `size` property would make sense.

#### `setControls()`

This method will add an `onkeydown` event listener to the `window` object so that when certain keyboard keys are pressed, we can move the evil circle around. The following code block should be put inside the method definition:

```js
var _this = this;
window.onkeydown = function(e) {
    if (e.keyCode === 65) {
      _this.x -= _this.velX;
    } else if (e.keyCode === 68) {
      _this.x += _this.velX;
    } else if (e.keyCode === 87) {
      _this.y -= _this.velY;
    } else if (e.keyCode === 83) {
      _this.y += _this.velY;
    }
  }
```

So when a key is pressed, the event object's [keyCode](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) property is consulted to see which key is pressed. If it is one of the four represented by the specified keycodes, then the evil circle will move left/right/up/down.

- For a bonus point, let us know which keys the specified keycodes map to.
- For another bonus point, can you tell us why we've had to set `var _this = this;` in the position it is in? It is something to do with function scope.

#### `collisionDetect()`

This method will act in a very similar way to `Ball()`'s `collisionDetect()` method, so you can use a copy of that as the basis of this new method. But there are a couple of differences:

- In the outer `if` statement, you no longer need to check whether the current ball in the iteration is the same as the ball that is doing the checking — because it is no longer a ball, it is the evil circle! Instead, you need to do a test to see if the ball being checked exists (with which property could you do this with?). If it doesn't exist, it has already been eaten by the evil circle, so there is no need to check it again.
- In the inner `if` statement, you no longer want to make the objects change color when a collision is detected — instead, you want to set any balls that collide with the evil circle to not exist any more (again, how do you think you'd do that?).

### Bringing the evil circle into the program[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features#Bringing_the_evil_circle_into_the_program)

Now we've defined the evil circle, we need to actually make it appear in our scene. To do this, you need to make some changes to the `loop()` function.

- First of all, create a new evil circle object instance (specifying the necessary parameters), then call its `setControls()` method. You only need to do these two things once, not on every iteration of the loop.
- At the point where you loop through every ball and call the `draw()`, `update()`, and `collisionDetect()` functions for each one, make it so that these functions are only called if the current ball exists.
- Call the evil ball instance's `draw()`, `checkBounds()`, and `collisionDetect()` methods on every iteration of the loop.

### Implementing the score counter[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features#Implementing_the_score_counter)

To implement the score counter, follow the following steps:

1. In your HTML file, add a [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p) element just below the [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/h1) element containing the text "Ball count: ".

2. In your CSS file, add the following rule at the bottom:

   ```css
   p {
     position: absolute;
     margin: 0;
     top: 35px;
     right: 5px;
     color: #aaa;
   }
   ```

3. In your JavaScript, make the following updates:

   - Create a variable that stores a reference to the paragraph.
   - Keep a count of the number of balls on screen in some way.
   - Increment the count and display the updated number of balls each time a ball is added to the scene.
   - Decrement the count and display the updated number of balls each time the evil circle eats a ball (causes it not to exist).

## Hints and tips[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features#Hints_and_tips)

- This assessment is quite challenging. Take each step slowly and carefully.
- It might be an idea to keep a separate copy of the demo after you get each stage working, so you can refer back to it if you find yourself in trouble later on.

## Assessment[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Adding_bouncing_balls_features#Assessment)

If you are following this assessment as part of an organized course, you should be able to give your work to your teacher/mentor for marking. If you are self-learning, then you can get the marking guide fairly easily by asking on the [discussion thread for this exercise](https://discourse.mozilla.org/t/adding-features-to-our-bouncing-balls-demo-assessment/24689), or in the [#mdn](irc://irc.mozilla.org/mdn) IRC channel on [Mozilla IRC](https://wiki.mozilla.org/IRC). Try the exercise first — there is nothing to be gained by cheating!
