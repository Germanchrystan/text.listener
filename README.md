# Consilience Pre-Interview Challenge - Text Listener Chrome Extension

## Table of contents

- [Overview](#overview)
- [Steps](#steps)
- [Author](#author)

## Overview 
This is a Chrome extension that displays the selected text from a page, or the text that is just under the mouse cursor, or the closest text from the center of the window. Moreover, the extension also allows the user to google the text that is being selected. 


## Steps

1.  I started by writing the manifest.json file for the extension. There wasn't much to it, since I really don't need a background file or pop-up for this proyect in particular. I only had to set the basic information, such as the content scripts, the manifest version, the name of the proyect and its version.

2.  Then I thought about how could I display a bar that is fixed at the bottom of the page. I knew that using a pop-up wouldn't be possible, since I can't actually place it wherever I want, and it would disappear whenever the user clicks outside of it. 

    So in the content.js file I created two HTML fragments, one that serves as the markup for the bar and the window display, and the other that adds a style tag that would give the extension all the CSS format it needs. The bar and the display window must have a position fixed to the bottom of the document, and they should have their padding, margins, and sizes setted using the em measurement unit, since I don`t want the extension to change depending on which page it is placed on. I also added the "undesired" class name in the text tags of the extension in order to exclude them later when I search for the closest text element from the center. Those HTML fragments were then appended to the document, and then storaged in variables in order to use later.

3. Then I added the event listener. First of all, the word selection, which has the highest priority, is triggered whenever the mouse button is released. If there is any selected text, it will be displayed in the extension. Simple enough.

    The next event listener was a bit harder to code, and I still think it can be improved. When the mouse cursor is moved, I first check if there is no text selected. If there is, then the text in the display window won't change. 

    Then I check if there is an element that the mouse is hovering over. For that, I use the elementFromPoint function, passing the mouse cursor coordinates as arguments.

    If there is an element which the mouse is hovering over, and that element isn't the google button from the extension, or any of the elements which tags I want to exclude, and that element has text content, then that text content goes into the display. 
    
    If that long conditional returns false, then I return the closest text content from the center of the page. To do that I store all the elements inside the body of the page in the elements array. Then I filter all the HTML elements that I want to display in the extension: the ones with text content, the ones outside the extension bar that don't contain the "undesired" class name, and any other element which tag is included in the desired tag names array (h1 to h6, a, p, span and strong). I also store the coordinates of the filtered elements in another array. From that array I measure the distance of each element and the center of the window using the coordinates and measuring the hypotenuse between every distance. The shortest distance is found using the indexOf and Math.min functions. The text content is then displayed.

    
    I feel I could polish this part of the code a little bit more with time, since the conditional in the if statement that checks if there is a valid hovered element is way too long.

4. Lastly, I wanted to add something more, so I added a button to the extension bar that searches the text that is being selected. For that I added an event listener to the 'Google Selection' button, that takes the text selected (if there is any) and uses it as a query for a google search url. 


## Author
Im Germ??n Chrystan, a programmer and music composer from Argentina. You can reach me at
- LinkedIn - [Here](https://www.linkedin.com/in/germ%C3%A1n-chrystan/)
- Email - [Here](mailto:germanchrystan@gmail.com)