# A first splash into JavaScript

## Thinking like a programmer

One of the hardest things to learn in programming is not the syntax you need to learn, but how to apply it to solve real world problems. You need to start thinking like a programmer — this generally involves looking at descriptions of what your program needs to do,  working out what code features are needed to achieve those things, and how to make them work together.

This requires a mixture of hard work, experience with the programming syntax, and practice — plus a bit of creativity. The more you code, the better you'll get at it. We can't promise that you'll develop "programmer brain" in five minutes, but we will give you plenty of opportunity to practice thinking like a programmer throughout the course.

With that in mind, let's look at the example we'll be building up in this article, and review the general process of dissecting it into tangible tasks.

## Example — Guess the number game

Let's imagine your boss has given you the following brief for creating this game:

> I want you to create a simple guess the number type game. It should choose a random number between 1 and 100, then challenge the player to guess the number in 10 turns. After each turn the player should be told if they are right or wrong — and, if they are wrong, whether the guess was too low or too high. It should also tell the player what numbers they previously guessed. The game will end once the player guesses correctly, or once they run out of turns. When the game ends, the player should be given an option to start playing again.

Upon looking at this brief, the first thing we can do is to start breaking it down into simple actionable tasks, in as much of a programmer mindset as possible:

1. Generate a random number between 1 and 100.
2. Record the turn number the player is on. Start it on 1.
3. Provide the player with a way to guess what the number is.
4. Once a guess has been submitted first record it somewhere so the user can see their previous guesses.
5. Next, check whether it is the correct number.
6. If it is correct:
   1. Display congratulations message.
   2. Stop the player from being able to enter more guesses (this would mess the game up).
   3. Display control allowing the player to restart the game.
7. If it is wrong and the player has turns left:
   1. Tell the player they are wrong.
   2. Allow them to enter another guess.
   3. Increment the turn number by 1.
8. If it is wrong and the player has no turns left:
   1. Tell the player it is game over.
   2. Stop the player from being able to enter more guesses (this would mess the game up).
   3. Display control allowing the player to restart the game.
9. Once the game restarts, make sure the game logic and UI are completely reset, then go back to step 1.

Let's now move forward, looking at how we can turn these steps into code, building up the example, and exploring JavaScript features as we go.

### Initial setup

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Number guessing game</title>
    <style>
      html {
        font-family: sans-serif;
      }

      body {
        width: 50%;
        max-width: 800px;
        min-width: 480px;
        margin: 0 auto;
      }

      .lastResult {
        color: white;
        padding: 3px;
      }
    </style>
  </head>
  <body>
    <h1>Number guessing game</h1>

    <p>We have selected a random number between 1 and 100. See if you can guess it in 10 turns or fewer. We'll tell you if your guess was too high or too low.</p>

    <div class="form">
      <label for="guessField">Enter a guess: </label><input type="text" id="guessField" class="guessField">
      <input type="submit" value="Submit guess" class="guessSubmit">
    </div>
    <div class="resultParas">
      <p class="guesses"></p>
      <p class="lastResult"></p>
      <p class="lowOrHi"></p>
    </div>
    <script>
      // Your JavaScript goes here
    </script>
  </body>
</html>
```

### Adding variables to store our data

Let's get started. First of all, add the following lines inside your script element:

```js
let randomNumber = Math.floor(Math.random() * 100) + 1;

const guesses = document.querySelector('.guesses');
const lastResult = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');

const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');

let guessCount = 1;
let resetButton;
```

This section of the code sets up the variables and constants we need to store the data our program will use. 

Constants are used to store values that you don't want to change, and are created with the keyword `const`. In this case, we are using constants to store references to parts of our user interface; the text inside some of them might change, but the HTML elements referenced stay the same.

You can assign a value to your variable or constant with an equals sign (`=`) followed by the value you want to give it.

In our example:

- The first variable — `randomNumber` — is assigned a random number between 1 and 100, calculated using a mathematical algorithm.

- The first three constants are each made to store a reference to the results paragraphs in our HTML, and are used to insert values into the paragraphs later on in the code:

  ```html
  <p class="guesses"></p>
  <p class="lastResult"></p>
  <p class="lowOrHi"></p>
  ```

- The next two constants store references to the form text input and submit button and are used to control submitting the guess later on.

  ```html
  <label for="guessField">Enter a guess: </label><input type="text" id="guessField" class="guessField">
  <input type="submit" value="Submit guess" class="guessSubmit">
  ```

- Our final two variables store a guess count of 1 (used to keep track of how many guesses the player has had), and a reference to a reset button that doesn't exist yet (but will later).

### Conditionals

Returning to our `checkGuess()` function, I think it's safe to say that we don't want it to just spit out a placeholder message. We want it to check whether a player's guess is correct or not, and respond appropriately.

At this point, replace your current `checkGuess()` function with this version instead:

```js
function checkGuess() {
  let userGuess = Number(guessField.value);
  if (guessCount === 1) {
    guesses.textContent = 'Previous guesses: ';
  }
  guesses.textContent += userGuess + ' ';
 
  if (userGuess === randomNumber) {
    lastResult.textContent = 'Congratulations! You got it right!';
    lastResult.style.backgroundColor = 'green';
    lowOrHi.textContent = '';
    setGameOver();
  } else if (guessCount === 10) {
    lastResult.textContent = '!!!GAME OVER!!!';
    setGameOver();
  } else {
    lastResult.textContent = 'Wrong!';
    lastResult.style.backgroundColor = 'red';
    if(userGuess < randomNumber) {
      lowOrHi.textContent = 'Last guess was too low!';
    } else if(userGuess > randomNumber) {
      lowOrHi.textContent = 'Last guess was too high!';
    }
  }
 
  guessCount++;
  guessField.value = '';
  guessField.focus();
}
```

This is a lot of code — phew! Let's go through each section and explain what it does.

- The first line (line 2 above) declares a variable called `userGuess` and sets its value to the current value entered inside the text field. We also run this value through the built-in `Number()` constructor, just to make sure the value is definitely a number.

- Next, we encounter our first conditional code block (lines 3–5 above). A conditional code block allows you to run code selectively, depending on whether a certain condition is true or not. It looks a bit like a function, but it isn't. The simplest form of conditional block starts with the keyword

  , then some parentheses, then some curly braces. Inside the parentheses we include a test. If the test returns


- Line 6 appends the current `userGuess` value onto the end of the `guesses` paragraph, plus a blank space so there will be a space between each guess shown.

- The next block (lines 8–24 above) does a few checks:

  - The first `if(){ }` checks whether the user's guess is equal to the `randomNumber`set at the top of our JavaScript. If it is, the player has guessed correctly and the game is won, so we show the player a congratulations message with a nice green color, clear the contents of the Low/High guess information box, and run a function called `setGameOver()`, which we'll discuss later.
  - Now we've chained another test onto the end of the last one using an `else if(){ }` structure. This one checks whether this turn is the user's last turn. If it is, the program does the same thing as in the previous block, except with a game over message instead of a congratulations message.
  - The final block chained onto the end of this code (the `else { }`) contains code that is only run if neither of the other two tests returns true (i.e. the player didn't guess right, but they have more guesses left). In this case we tell them they are wrong, then we perform another conditional test to check whether the guess was higher or lower than the answer, displaying a further message as appropriate to tell them higher or lower.

- The last three lines in the function (lines 26–28 above) get us ready for the next guess to be submitted. We add 1 to the `guessCount` variable so the player uses up their turn (`++`is an incrementation operation — increment by 1), and empty the value out of the form text field and focus it again, ready for the next guess to be entered.

### Events

At this point we have a nicely implemented `checkGuess()` function, but it won't do anything because we haven't called it yet. Ideally we want to call it when the "Submit guess" button is pressed, and to do this we need to use an event. Events are things that happen in the browser — a button being clicked, a page loading, a video playing, etc. — in response to which we can run blocks of code. The constructs that listen out for the event happening are called **event listeners**, and the blocks of code that run in response to the event firing are called **event handlers**.

Add the following line below your `checkGuess()` function:

```js
guessSubmit.addEventListener('click', checkGuess);
```

Here we are adding an event listener to the `guessSubmit` button. This is a method that takes two input values (called *arguments*) — the type of event we are listening out for (in this case `click`) as a string, and the code we want to run when the event occurs (in this case the `checkGuess()` function). Note that we don't need to specify the parentheses when writing it inside [`addEventListener()`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

### Finishing the game functionality

Let's add that `setGameOver()` function to the bottom of our code and then walk through it. Add this now, below the rest of your JavaScript:

```js
function setGameOver() {
  guessField.disabled = true;
  guessSubmit.disabled = true;
  resetButton = document.createElement('button');
  resetButton.textContent = 'Start new game';
  document.body.appendChild(resetButton);
  resetButton.addEventListener('click', resetGame);
}
```

- The first two lines disable the form text input and button by setting their disabled properties to `true`. This is necessary, because if we didn't, the user could submit more guesses after the game is over, which would mess things up.
- The next three lines generate a new [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button) element, set its text label to "Start new game", and add it to the bottom of our existing HTML.
- The final line sets an event listener on our new button so that when it is clicked, a function called `resetGame()` is run.

Now we need to define this function too! Add the following code, again to the bottom of your JavaScript:

```js
function resetGame() {
  guessCount = 1;

  const resetParas = document.querySelectorAll('.resultParas p');
  for (let i = 0 ; i < resetParas.length ; i++) {
    resetParas[i].textContent = '';
  }

  resetButton.parentNode.removeChild(resetButton);

  guessField.disabled = false;
  guessSubmit.disabled = false;
  guessField.value = '';
  guessField.focus();

  lastResult.style.backgroundColor = 'white';

  randomNumber = Math.floor(Math.random() * 100) + 1;
}
```

This rather long block of code completely resets everything to how it was at the start of the game, so the player can have another go. It:

- Puts the `guessCount` back down to 1.
- Empties all the text out of the information paragraphs.
- Removes the reset button from our code.
- Enables the form elements, and empties and focuses the text field, ready for a new guess to be entered.
- Removes the background color from the `lastResult` paragraph.
- Generates a new random number so that you are not just guessing the same number again!

**At this point you should have a fully working (simple) game — congratulations!**

All we have left to do now in this article is talk about a few other important code features that you've already seen, although you may have not realized it.

### Loops

One part of the above code that we need to take a more detailed look at is the [for](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for) loop. Loops are a very important concept in programming, which allow you to keep running a piece of code over and over again, until a certain condition is met.

To start with, go to your [browser developer tools JavaScript console](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_are_browser_developer_tools) again, and enter the following:

```js
for (let i = 1 ; i < 21 ; i++) { console.log(i) }
```

What happened? The numbers 1 to 20 were printed out in your console. This is because of the loop. A `for` loop takes three input values (arguments):

1. **A starting value**: In this case we are starting a count at 1, but this could be any number you like. You could replace the letter `i` with any name you like too, but `i` is used as a convention because it's short and easy to remember.
2. **An exit condition**: Here we have specified `i < 21` — the loop will keep going until `i` is no longer less than 21. When `i` reaches 21, the loop will no longer run.
3. **An incrementor**: We have specified `i++`, which means "add 1 to i". The loop will run once for every value of `i`, until `i` reaches a value of 21 (as discussed above). In this case, we are simply printing the value of `i` out to the console on every iteration using [`console.log()`](https://developer.mozilla.org/en-US/docs/Web/API/Console/log).

Now let's look at the loop in our number guessing game — the following can be found inside the `resetGame()` function:

```js
let resetParas = document.querySelectorAll('.resultParas p');
for (let i = 0 ; i < resetParas.length ; i++) {
  resetParas[i].textContent = '';
}
```

This code creates a variable containing a list of all the paragraphs inside `<div class="resultParas">` using the [`querySelectorAll()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) method, then it loops through each one, removing the text content of each.

### A small discussion on objects

Let's add one more final improvement before we get to this discussion. Add the following line just below the `let resetButton;` line near the top of your JavaScript, then save your file:

```js
guessField.focus();
```

This line uses the [`focus()`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus) method to automatically put the text cursor into the [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) text field as soon as the page loads, meaning that the user can start typing their first guess right away, without having to click the form field first. It's only a small addition, but it improves usability — giving the user a good visual clue as to what they've got to do to play the game.

Let's analyze what's going on here in a bit more detail. In JavaScript, everything is an object. An object is a collection of related functionality stored in a single grouping. You can create your own objects, but that is quite advanced and we won't be covering it until much later in the course. For now, we'll just briefly discuss the built-in objects that your browser contains, which allow you to do lots of useful things.

In this particular case, we first created a `guessField` constant that stores a reference to the text input form field in our HTML — the following line can be found amongst our declarations near the top of the code:

```js
const guessField = document.querySelector('.guessField');
```

To get this reference, we used the [`querySelector()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) method of the [`document`](https://developer.mozilla.org/en-US/docs/Web/API/Document) object. `querySelector()` takes one piece of information — a [CSS selector](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Selectors) that selects the element you want a reference to.

Because `guessField` now contains a reference to an [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input) element, it will now have access to a number of properties (basically variables stored inside objects, some of which can't have their values changed) and methods (basically functions stored inside objects). One method available to input elements is `focus()`, so we can now use this line to focus the text input:

```js
guessField.focus();
```

## Finished for now...

So that's it for building the example. You got to the end — well done! Try your final code out, or [play with our finished version here](http://mdn.github.io/learning-area/javascript/introduction-to-js-1/first-splash/number-guessing-game.html). If you can't get the example to work, check it against the [source code](https://github.com/mdn/learning-area/blob/master/javascript/introduction-to-js-1/first-splash/number-guessing-game.html).
