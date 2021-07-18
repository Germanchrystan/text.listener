//================================================================================//
/*
                        Text Listener
    Google Chrome Extension coded by Germán Chrystan on July, 17 2021,
            as part of the Consilience Pre-Interview Challenge.
*/
//================================================================================//

//Creating the div element that will contain the Extension Bar and Display.
const div = document.createElement('div');
div.classList.add('text-listener-container');
div.innerHTML =
`
<div class="text-listener-bar">
    <div class="text-listener-bar-element">
        <h1>Text Listener</h1>
    </div>
    <div class="text-listener-bar-element google">
        <h1 class="google-h1">Google Selection</h1>
    </div>
</div>
<div class="text-listener-display">
    <h3 class="text-listener-display-indication"></h3>
    <p class="text-listener-display-text"></p>
</div>
`

//Creating the style tag for the Extension components.
let style =	document.createElement("STYLE");
style.innerHTML=
`
@import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
.text-listener-container{
    display: flex;
    flex-direction:row;
    width: 100vw;
    font-size: 16px;
}
.text-listener-bar{
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction:row;
    justify-content: space-between;
    align-items: center;
    background: rgb(131,58,180);
    background: linear-gradient(34deg, rgba(131,58,180,1) 15%, rgba(253,29,29,1) 54%, rgba(252,176,69,1) 92%);
    position: fixed;
    bottom: 0;
    padding: 1em;
    margin-bottom: 0;
    margin-top: 0;
    width: 100%;
    height: 1.5em;
    color: white;
    z-index: 10000;
}
.text-listener-bar-element {
    padding: 0;
    margin: 0;
    position:relative;
    top:0;
}
.text-listener-bar-element h1{
    padding: 0;
    margin: 0;
    margin-block-start:0;
    margin-block-end:0;
    font-size: 1em;
}
.google{
    cursor:pointer;
    margin-right: 2em;
    padding: .2em;
}
.google:hover{
    color: black;
}
.google-h1{
    background: rgba(0,0,0,0.4);
    padding: .7em 1em;
    border-radius: 3px;
}
.text-listener-display{
    display:none;
    position: fixed;
    bottom: 4em;
    right: 4em;
    background: linear-gradient(34deg, rgba(131,58,180,1) 15%, rgba(253,29,29,1) 54%, rgba(252,176,69,1) 92%);
    width: 15em;
    height: 15em;
    border-radius: 10px;
}
.text-listener-display-text{
    color: black;
    width: 14em;
    height: 10.5em;
    background: darkgrey;
    margin: .5rem auto;
    border-radius: 5px;
    overflow-y: scroll;
}
.text-listener-display-indication{
    color: white;
    text-align: center;
}
`;

//Appending those new elements to the body of the page.
document.body.appendChild(div);
document.body.appendChild(style);
//Storing the display elements in variables for later usage.
let display = document.querySelector('.text-listener-display');
let displayText = document.querySelector('.text-listener-display-text');
let displayIndication = document.querySelector('.text-listener-display-indication');
let googleSelection = document.querySelector('.google');
let selection;

//Tags I want removed from the elements array.
const removedTagNames = ['SCRIPT', 'STYLE', 'CODE', 'svg', 'DIV', 'NOSCRIPT'];
//Taking all the elements from the body and filtering them.
let elements = Array.from(document.querySelectorAll('body *')).filter((e) => 
e.textContent.length > 0 && !removedTagNames.includes(e.tagName) && !e.classList.contains('google-h1')) ;
//Storing in an Array all the coordinates of the elements
let elementCoords = elements.map(elt => {
  let rect = elt.getBoundingClientRect();
  return [rect.x, rect.y];
});


//Adding the event that will take the text selection and display it. 
window.addEventListener('mouseup', wordSelected)
    function wordSelected(){
    let selectedText = window.getSelection().toString();

    if(selectedText.length){
        display.style['display'] = 'block';
        displayText.textContent = selectedText;
        displayIndication.textContent = 'Selected Text'
        selection=selectedText;
    }
}


document.addEventListener('mousemove', ({x, y}) => {
    let selectedText = window.getSelection().toString();
    let hoveredElement = document.elementFromPoint(x,y);
    //Checking if there is no text being selected
    if(!selectedText.length){
        //Calculating all the distances between the mouse cursor and the HTML elements.
        let distances = [];
        elementCoords.forEach(coord => {
            let distance = Math.hypot(coord[0]-parseInt(x), coord[1]-parseInt(y));
            distances.push(parseInt(distance));
        });
        //Getting the closest element
        let closestLinkIndex = distances.indexOf(Math.min(...distances));
        display.style['display'] = 'block';
        //Checking if there is an element the mouse is hovering over
        if(hoveredElement && 
            hoveredElement.textContent.length && 
            !removedTagNames.includes(hoveredElement.tagName) && 
            !hoveredElement.classList.contains('google-h1')){

            displayIndication.textContent = 'Hovered Text';
            displayText.textContent = hoveredElement.textContent;
        } else {
            //If there isn`t, I display the closest text.
            displayIndication.textContent = 'Closest Text';
            displayText.textContent = elements[closestLinkIndex].textContent;
        }
    }
})

//Adding functionality to the 'Google Selection' Button
googleSelection.addEventListener('click', (e) => {
    if(selection && selection.length){
        window.location.href = `https://www.google.com/search?q=${selection}`
    } else if(!selection) {
        displayText.textContent = "You need to select text in order to Google it"
    }
})
