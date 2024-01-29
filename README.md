<p align="center">
<img width="350" src="https://raw.githubusercontent.com/BMSVieira/ordena.js/main/demo/img/logo_white.png">
</p>

◼️ Demo:
-
https://bmsvieira.github.io/ordena.js

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

<!-- Main element -->
<div class="od-list" id="list">

   <!-- Item -->
   <div class="od-item od-c-item">
      <div class="od-name od-c-name">Item 1</div>
   
         <!-- Nested Item -->
         <div class="od-item od-c-item nested">
            <div class="od-name od-c-name">Item 1.1</div>
         </div>
   
         <!-- Nested Item -->
         <div class="od-item od-c-item nested">
            <div class="od-name od-c-name">Item 1.2</div>
      
                  <!-- Nested Item -->
                  <div class="od-item od-c-item nested">
                     <div class="od-name od-c-name">Item 1.2.1</div>
                  </div>
         </div>
   </div>

   <!-- Item -->
   <div class="od-item od-c-item">
      <div class="od-name od-c-name">Item 2</div>
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
