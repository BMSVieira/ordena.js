<p align="center">
<img width="400" src="https://raw.githubusercontent.com/BMSVieira/ordena.js/main/demo/img/logo_white.png">
</p>
<p align="center">Welcome to Ordena.js, a groundbreaking library that redefines the way we handle nested lists using pure vanilla JavaScript.</p>

<br>

◼️ Demo:
-
https://bmsvieira.github.io/ordena.js

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
   });
});
```
