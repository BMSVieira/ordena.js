class Ordena {
    constructor(options) {

        const defaults = {
            selector: 'defaultId',
            config: {
                handleThreshold: 0.25,
                deleteItems : {
                    class: "",
                    onComplete: function(){}
                  },
            },
            onDragStart: function() {},
            onDragStop: function() {}
        };


        this.selector = options.selector || defaults.selector;
        this.list = document.querySelector(this.selector);
        this.draggedItem = null;
        this.handleThreshold = options.config.handleThreshold || defaults.config.handleThreshold
        this.deleteClass = options.config.deleteItems.class || defaults.config.deleteItems.class
        this.onDragStart = options.onDragStart || defaults.onDragStart;
        this.onDragStop = options.onDragStop || defaults.onDragStop;
        this.onDeleteComplete = options.config.deleteItems.onComplete || defaults.config.deleteItems.onComplete

        this.list.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.list.addEventListener('dragend', this.handleDragEnd.bind(this));
        this.list.addEventListener('dragover', this.handleDragOver.bind(this));
        this.list.addEventListener('drop', this.handleDrop.bind(this));

        // Add unique ID
        this.addUniqueIdentifier();

        // Set draggable elements
        this.setDraggable();
    }

    // Set draggable attribute to all elements
    setDraggable()
    {
        let isDragging = false;

        document.addEventListener('mousedown', (e) => {
            const clickedItem = e.target.closest('.od-item');
            isDragging = Boolean(clickedItem);
    
            if (isDragging) {
                clickedItem.draggable = true;
            }
        });
    
        document.addEventListener('mouseup', () => {

            isDragging = false;
            document.querySelectorAll('.od-item').forEach(item => {
                item.draggable = false;
            });
        });
    }

    // When drag starts
    handleDragStart(e) {
        this.draggedItem = e.target;
        setTimeout(() => {
            e.target.style.opacity = 0.3;
        }, 0);

        if (typeof this.onDragStart == "function" && !this.draggedItem.classList.contains("od-disabled")) {
            this.onDragStart();
        }
    }

    // When drag ends
    handleDragEnd(e) {
        setTimeout(() => {
            e.target.style.opacity = 1;
            this.draggedItem = null;
        }, 0);
    }

    // Add identifier to all items
    addUniqueIdentifier() {
        const items = this.list.querySelectorAll('.od-item');

        let counter = 1;
        items.forEach((item) => {
            const uniqueId = counter++;
            item.setAttribute('data-odUniqueId', uniqueId.toString());
        });
    }

    // Get real position
    calculateLimits(target, vertical) {
        const elementHeight = target.clientHeight;
        let finalCalculations = null;
        const first25Percent = Math.floor(elementHeight * this.handleThreshold);
        const last25Percent = elementHeight - first25Percent;

        if (vertical >= 0 && vertical <= first25Percent) {
            finalCalculations = "top";
        } else if (vertical >= last25Percent && vertical <= elementHeight) {
            finalCalculations = "bottom";
        } else if (vertical >= first25Percent && vertical <= last25Percent) {
            finalCalculations = "between";
        } else {
            finalCalculations = "null";
        }

        return finalCalculations;
    }

    // When element is dragged around
    handleDragOver(e) {
        e.preventDefault();

        const rect = e.target.getBoundingClientRect();
        const vertical = e.clientY - rect.top;
        const position = this.calculateLimits(e.target, vertical);

        this.draggedItem.dataset.position = position;
    }

    // When element is dropped
    handleDrop(e) {
        try {
            
                e.preventDefault();
                const afterElement = e.target;
                const currentElement = this.draggedItem.parentElement;
                const position = this.draggedItem.dataset.position;

                // Check if item is disabled
                if(this.draggedItem.classList.contains("od-disabled") || afterElement.classList.contains("od-disabled")) { throw("This item is disabled."); }
                // Check if target element is part of ordena list or if it is a delete box
                if(!afterElement.classList.contains("od-item") &&
                !afterElement.classList.contains(this.deleteClass) &&
                !afterElement.classList.contains("od-list")){ throw("This is not an Ordena item."); } 

                // handle delete boxes, check if target element is a delete box
                if(afterElement.classList.contains(this.deleteClass)) { 
                    
                    if (typeof this.onDeleteComplete == "function") {
                        this.onDeleteComplete();
                        this.draggedItem.remove()
                    }
                    return;
                }
              
                // Check position
                if (position === "between") {

                    afterElement.appendChild(this.draggedItem);
                    this.draggedItem.classList.add('od-nested');
                
                    // If target is the main list, removes od-nested class
                    if(e.target.classList.contains("od-list")) { this.draggedItem.classList.remove('od-nested'); }

                } else if (position === "top") {

                    currentElement.insertBefore(this.draggedItem, afterElement);

                } else if (position === "bottom") {

                    if (afterElement.childElementCount > 1) {

                        afterElement.appendChild(this.draggedItem);
                        this.draggedItem.classList.add('od-nested');

                    } else {

                        // If dragged item contains od-nested, it orders it.
                        if(this.draggedItem.classList.contains("od-nested")){ 

                                // check if dragged item is a children and target element is not.
                                if(this.draggedItem.classList.contains("od-nested") && !e.target.classList.contains("od-nested")){  } else { 
                                    afterElement.insertAdjacentElement("afterend",  this.draggedItem);
                                }

                        } else { 
                            
                                // in order to order items that are not in the od-nested, we must see if both doesnt have od-nested.
                                if(!this.draggedItem.classList.contains("od-nested") && !e.target.classList.contains("od-nested")){ 
                                    afterElement.insertAdjacentElement("afterend",  this.draggedItem);
                                } else {  }
                        }
                    }

                    // If target is the main list, removes od-nested class
                    if(e.target.classList.contains("od-list")) { this.draggedItem.classList.remove('od-nested'); }

                } else {
                this.list.appendChild(this.draggedItem);
                this.draggedItem.classList.remove('od-nested');
                }

                this.draggedItem.removeAttribute('data-position');
                if (typeof this.onDragStop == "function") {
                    this.onDragStop();
                }

        } catch (error) {
            console.warn("Ordena Warning: " + error);  
        }
    }


    // Serialize to json
    convertToJSON() {
        const result = [];

        function traverse(node, processedNodes = new Set()) {
            const odUniqueId = node.getAttribute('data-odUniqueId');

            if (!processedNodes.has(odUniqueId)) {
                processedNodes.add(odUniqueId);

                const obj = {
                    name: node.querySelector('.od-name').innerText,
                    children: [],
                };

                const nestedItems = node.querySelectorAll('.od-item.od-nested');
                nestedItems.forEach(nestedItem => {
                    const child = traverse(nestedItem, processedNodes);
                    if (child) {
                        obj.children.push(child);
                    }
                });

                return obj;
            }

            return null;
        }

        const topLevelItems = this.list.querySelectorAll('.od-item:not(.od-nested)');
        topLevelItems.forEach(topLevelItem => {
            const topLevelObj = traverse(topLevelItem);
            if (topLevelObj) {
                result.push(topLevelObj);
            }
        });

        return result;
    }

    // Refreshes all the item attributes
    refresh()
    {
        // Refresh unique ID
        this.addUniqueIdentifier();
        // Refresh draggable elements
        this.setDraggable();
    }
}