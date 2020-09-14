In this assessment you'll be tasked with taking some of the knowledge you've picked up in this module's articles and applying it to creating a fun app that generates random silly stories. Have fun!

## Project brief

You have been provided with some raw HTML/CSS and a few text strings and JavaScript functions; you need to write the necessary JavaScript to turn this into a working program, which does the following:

- Generates a silly story when the "Generate random story" button is pressed.
- Replaces the default name "Bob" in the story with a custom name, only if a custom name is entered into the "Enter custom name" text field before the generate button is pressed.
- Converts the default US weight and temperature quantities and units in the story into UK equivalents if the UK radio button is checked before the generate button is pressed.
- Will generate another random silly story if you press the button again (and again...)

The following screenshot shows an example of what the finished program should output:

![img](https://mdn.mozillademos.org/files/16178/Screen_Shot_2018-09-19_at_10.01.38_AM.png)

To give you more of an idea, [have a look at the finished example](http://mdn.github.io/learning-area/javascript/introduction-to-js-1/assessment-finished/) (no peeking at the source code!)

## Steps to complete[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Silly_story_generator#Steps_to_complete)

The following sections describe what you need to do.

Basic setup:

1. Create a new file called `main.js`, in the same directory as your `index.html` file.
2. Apply the external JavaScript file to your HTML by inserting a [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script) element into your HTML referencing `main.js`. Put it just before the closing `</body>` tag.

Initial variables and functions:

1. In the raw text file, copy all of the code underneath the heading "1. COMPLETE VARIABLE AND FUNCTION DEFINITIONS" and paste it into the top of the `main.js` file. This gives you three variables that store references to the "Enter custom name" text field (`customName`), the "Generate random story" button (`randomize`), and the [``](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/p) element at the bottom of the HTML body that the story will be copied into (`story`), respectively. In addition you've got a function called `randomValueFromArray()` that takes an array, and returns one of the items stored inside the array at random.

2. Now look at the second section of the raw text file — "2. RAW TEXT STRINGS". This contains text strings that will act as input into our program. We'd like you to contain these inside variables inside

    

   ```
   main.js
   ```

   :

   1. Store the first, big long, string of text inside a variable called `storyText`.
   2. Store the first set of three strings inside an array called `insertX`.
   3. Store the second set of three strings inside an array called `insertY`.
   4. Store the third set of three strings inside an array called `insertZ`.

Placing the event handler and incomplete function:

1. Now return to the raw text file.

2. Copy the code found underneath the heading "3. EVENT LISTENER AND PARTIAL FUNCTION DEFINITION" and paste it into the bottom of your

    

   ```
   main.js
   ```

    

   file. This:

   - Adds a click event listener to the `randomize` variable so that when the button it represents is clicked, the `result()` function is run.
   - Adds a partially-completed `result()` function definiton to your code. For the remainder of the assessment, you'll be filling in lines inside this function to complete it and make it work properly.

Completing the `result()` function:

1. Create a new variable called `newStory`, and set it's value to equal `storyText`. This is needed so we can create a new random story each time the button is pressed and the function is run. If we made changes directly to `storyText`, we'd only be able to generate a new story once.

2. Create three new variables called `xItem`, `yItem`, and `zItem`, and make them equal to the result of calling `randomValueFromArray()` on your three arrays (the result in each case will be a random item out of each array it is called on). For example you can call the function and get it to return one random string out of `insertX` by writing `randomValueFromArray(insertX)`.

3. Next we want to replace the three placeholders in the `newStory` string — `:insertx:`, `:inserty:`, and `:insertz:` — with the strings stored in `xItem`, `yItem`, and `zItem`. There is a particular string method that will help you here — in each case, make the call to the method equal to `newStory`, so each time it is called, `newStory` is made equal to itself, but with substitutions made. So each time the button is pressed, these placeholders are each replaced with a random silly string. As a further hint, the method in question only replaces the first instance of the substring it finds, so you might need to make one of the calls twice.

4. Inside the first `if` block, add another string replacement method call to replace the name 'Bob' found in the `newStory` string with the `name` variable. In this block we are saying "If a value has been entered into the `customName` text input, replace Bob in the story with that custom name."

5. Inside the second

    

   ```
   if
   ```

    

   block, we are checking to see if the

    

   ```
   uk
   ```

    

   radio button has been selected. If so, we want to convert the weight and temperature values in the story from pounds and Fahrenheit into stones and centigrade. What you need to do is as follows:

   1. Look up the formulae for converting pounds to stone, and Fahrenheit to centigrade.
   2. Inside the line that defines the `weight` variable, replace 300 with a calculation that converts 300 pounds into stones. Concatenate `' stone'` onto the end of the result of the overall `Math.round()` call.
   3. Inside the line that defines the `temperature` variable, replace 94 with a calculation that converts 94 Fahrenheit into centigrade. Concatenate `' centigrade'` onto the end of the result of the overall `Math.round()` call.
   4. Just under the two variable definitions, add two more string replacement lines that replace '94 fahrenheit' with the contents of the `temperature` variable, and '300 pounds' with the contents of the `weight` variable.

6. Finally, in the second-to-last line of the function, make the `textContent` property of the `story` variable (which references the paragraph) equal to `newStory`.

## Hints and tips[Section](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps/Silly_story_generator#Hints_and_tips)

- You don't need to edit the HTML in any way, except to apply the JavaScript to your HTML.

- If you are unsure whether the JavaScript is applied to your HTML properly, try removing everything else from the JavaScript file temporarily, adding in a simple bit of JavaScript that you know will create an obvious effect, then saving and refreshing. The following for example turns the background of the

   

  `<html>`

   

  element red — so the entire browser window should go red if the JavaScript is applied properly:

  ```js
  document.querySelector('html').style.backgroundColor = 'red';
  ```

- [Math.round()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round) is a built-in JavaScript method that simply rounds the result of a calculation to the nearest whole number.

- There are three instances of strings that need to be replaced. You may repeat the `replace()` method multiple times, or you can use regular expressions. For instance, `var text = 'I am the biggest lover, I love my love'; text.replace(/love/g,'like');` will replace all instances of 'love' to 'like'. Remember, Strings are immutable!



# Marking guide for "Silly story generator"
The following guide outlines a marking guide for the MDN Learning Area JavaScript Topic — [Silly story generator](https://developer.mozilla.org/en-US/Learn/JavaScript/First_steps/Silly_story_generator). Each subtask detailed in the assessment is listed below, along with an explanation of how many marks the task is worth, and the mark breakdown.

Note: These are guidelines, not set in stone rules — you are of course free to use your judgement on mark awarding when you meet an edge case, or something that isn't clear cut.

The overall mark awarded is out of 39. Work out their final mark, and then divide by 39 and multiply by 100 to give a percentage mark. For reference, you can find a [finished program](main.js) that would be awarded top marks.

## Basic setup

<dl>
<dt>Create <code>main.js</code></dt>
<dd>One mark for this; it is pretty simple.</dd>
<dt>Apply the external JS file to your HTML</dt>
<dd>One mark for this too.</dd>
</dl>

## Initial variables and functions

<dl>
<dt>Copy the code from section 1 of the raw text file into <code>main.js</code>.</dt>
<dd>One mark for this.</dd>
<dt>Store the big long text string inside a variable called <code>storyText</code>.</dt>
<dd>One mark for this — creating a simple variable and storing a string inside it is not complex.</dd>
<dt>Store the three sets of strings inside three arrays called <code>insertX</code>, <code>insertY</code>, and <code>insertZ</code>.</dt>
<dd>6 marks for this — 2 for each array. Creating an array of strings is not quite as simple as a string variable.</dd>
</dl>

## Placing the event handler and incomplete function
Only one mark for this bit — it's just more simple copy and paste.

## Completing the result() function

<dl>
<dt>Create a new variable called <code>newStory</code>, and set it's value to equal <code>storyText</code>.</dt>
<dd>One mark for this — another simple variable definition.</dd>
<dt>Create three new variables called <code>xItem</code>, <code>yItem</code>, and <code>zItem</code>...</dt>
<dd>6 marks for this, 2 for each correct definition. For each one they basically have to initialise the new variable, and declare it's value as the corresponding array passed to the <code>randomValueFromArray()</code> function. So for example, <code>var xItem = randomValueFromArray(insertX);</code>.</dd>
<dt>Next we want to replace the three placeholders in the newStory string...</dt>
<dd>8 marks, two for each of the four lines needed. For each of these lines, we need to call the <code>replace()</code> string method on <code>newStory</code>, giving it as parameters the placeholder first of all (e.g. <code>'insertx:'</code>), and then the variable value to replace the placeholder with (e.g. <code>xItem</code>). We need to store the result of that method call in <code>newStory</code>, so the result of each line is that <code>newStory</code> will be made equal to itself, but with some substitutions made. An example correct line is <code>newStory = newStory.replace(':insertx:',xItem);</code>. As an extra stipulation, the <code>xItem</code> line needs to be called twice, as using <code>replace()</code> like this only replaces the first instance of the matched substring.</dd>
<dt>Inside the second <code>if</code> block, we are checking to see if the <code>uk</code> radio button has been selected...</dt>
<dd>There are four parts to this question. Let's go through each one in turn:
  <ul>
    <li>Four marks for this, 2 for each formula. The two required formulae are <code>pounds x 0.0714286 = stone</code> and <code>(Farenheit - 32) * (5 / 9) = centigrade. </code></li>
    <li>Two marks for this. They need to replace <code>300</code> with <code>300*0.0714286</code>, and then concatenate <code>' stone'</code> onto the end of the whole line, so in total, the value of <code>weight</code> is <code>Math.round(300*0.0714286) + ' stone'</code>.</li>
    <li>Two marks for this. They need to replace <code>94</code> with <code>(94-32) * 5 / 9</code>, and then concatenate <code>' centigrade'</code> onto the end of the whole line, so in total, the value of <code>temperature</code> is <code>Math.round((94-32) * 5 / 9) + ' centigrade'</code>.</li>
    <li>Four marks in total for these; they are just the same as the other <code>replace()</code> lines that came before them. For these two lines we need <code>newStory = newStory.replace('94 farenheit',temperature);</code> and
    <code>newStory = newStory.replace('300 pounds',weight);</code></li>
  </ul>
</dd>
<dt>Finally, in the second-to-last line of the function, make the <code>textContent</code> property of the <code>story</code> variable...</dt>
<dd>One mark for this, as it's pretty easy; just add the <code>newStory</code> variable into the line — <code>story.textContent = newStory;</code>.</dd>
</dl>
