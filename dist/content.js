//Creating the div element that will contain the Extension Bar and Display.
const div = document.createElement('div');
div.classList.add('text-listener-container');
div.innerHTML =`
<div class="text-listener-bar">
    <div class="text-listener-bar-element">
        <h1>TL</h1>
    </div>
</div>
<div class="text-listener-display">
<p class="text-listener-display-text">
</p>
</div>`
//Creating the style tag for the Extension components.
let style =	document.createElement("STYLE");