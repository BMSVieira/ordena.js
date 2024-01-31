<p align="center">
<img width="400" src="https://raw.githubusercontent.com/BMSVieira/ordena.js/main/demo/img/logo_white.png">
</p>
<p align="center">Welcome to Ordena.js, a groundbreaking library that redefines the way we handle nested lists using pure vanilla JavaScript.</p>

<br>

◼️ Demo:
-
https://bmsvieira.github.io/ordena.js

<br>

<p align="left">
<img width="500" src="https://raw.githubusercontent.com/BMSVieira/ordena.js/main/demo/img/demogif.gif">
</p>

Features:
-
- 🔧 Fully Customizable
- 💪 No Dependencies, no Jquery, no Framework... built with VanillaJS
- 🌎 Tested in All Modern Browsers
- ⚙️ New Engine/Logic
- ⌨️ JSON Output
- 📱 Touch support (Coming soon)!


◼️ Installation (Browser):
-

<b>1 - Include JavaScript Source.</b>
```javascript
<script src="path/to/ordena.js"></script>
```
<b>2 - Include Styles.</b>
```javascript
<link rel="stylesheet" href="path/to/ordena.css">
```
<b>3 - Set HTML.</b>
```html
<!-- Main Element -->
<div class="od-list od-dark" id="list">
      <!-- Item -->
      <div class="od-item od-c-item">
         <div class="od-name">Item 1</div>
      </div>
      <!-- Item -->
      <div class="od-item od-c-item">
         <div class="od-name">Item 2</div>

            <!-- Nested Item -->
            <div class="od-item od-c-item od-nested">
               <div class="od-name">Item 2.1</div>
            </div>

            <!-- Nested Item -->
            <div class="od-item od-c-item od-nested">
               <div class="od-name">Item 2.2</div>
            </div>
      </div>
      <!-- Item -->
      <div class="od-item od-c-item">
         <div class="od-name">Item 5</div>
      </div>
      <!-- Item -->
      <div class="od-item od-c-item">
         <div class="od-name">Item 6</div>
      </div>
 </div>
```
<b>4 - Initilize.</b>
```javascript
document.addEventListener("DOMContentLoaded", function() {
   const demo = new Ordena({
      selector: "#list"
      // More configs...
   });
});
```

◼️ Methods:
-

<b>convertToJSON:</b>
Outputs serialized list in JSON

```javascript
demo.convertToJSON();
```

<b>refresh:</b>
Refresh all draggable properties and defines new uniqueIds to all items.<br>
Must be called whenever a new item is added to the list.

```javascript
demo.refresh();
```

◼️ Callbacks:
-

There are multiple callbacks you can use when building a new instance.

 ```javascript
// Called when drag started.
onDragStart: function(){ <!-- CODE HERE --> }
```
```javascript
// Called when drag ends.
onDragStop: function(){ <!-- CODE HERE --> }
```

◼️ Disable Item:
-

You can disable an item by using class `od-disabled`<br>
This item will not be able to dragged or moved.
```html
<div class="od-item od-c-item od-nested od-disabled">
   <div class="od-name">Item to be disabled</div>
</div>
```

◼️ Drag to delete:
-

You can have multiple elements that are allowed to delete an item, as long as they share the same class. (See demo)<br>
To define a delete-class, it must be done when instantiating Ordena, in the config property.
```javascript
config : {
    deleteItems : {
      class: "your-delete-class", // Class wich elements must have to be allowed to delete an item
      onComplete: function(){ <!-- CODE HERE --> }
    }
}
```
All elements allowed to delete items must be inside the `od-list` element, and everything dragged into them will be `remove()`.

