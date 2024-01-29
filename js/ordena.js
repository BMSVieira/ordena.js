class Ordena {
    constructor(options) {

        const defaults = {
            selector: 'defaultId',
            config: {
                handleThreshold: 0.25
            },
            onDragStart: function() {},
            onDragStop: function() {}
        };


        this.selector = options.selector || defaults.selector;
        this.list = document.querySelector(this.selector);
        this.draggedItem = null;
        this.handleThreshold = options.config.handleThreshold || defaults.config.handleThreshold
        this.onDragStart = options.onDragStart || defaults.onDragStart;
        this.onDragStop = options.onDragStop || defaults.onDragStop;


        this.list.addEventListener('dragstart', this.handleDragStart.bind(this));
        this.list.addEventListener('dragend', this.handleDragEnd.bind(this));
        this.list.addEventListener('dragover', this.handleDragOver.bind(this));
        this.list.addEventListener('drop', this.handleDrop.bind(this));

        // Add unique ID
        this.addUniqueIdentifier();

        // Set draggable elements
        this.setDraggable();
    }

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

    handleDragStart(e) {
        this.draggedItem = e.target;
        setTimeout(() => {
            e.target.style.opacity = 0.3;
        }, 0);

        if (typeof this.onDragStart == "function") {
            this.onDragStart();
        }
    }

    handleDragEnd(e) {
        setTimeout(() => {
            e.target.style.opacity = 1;
            this.draggedItem = null;
        }, 0);
    }

    addUniqueIdentifier() {
        const items = this.list.querySelectorAll('.od-item');

        let counter = 1;
        items.forEach((item) => {
            const uniqueId = counter++;
            item.setAttribute('data-npUniqueId', uniqueId.toString());
        });
    }

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

    handleDragOver(e) {
        e.preventDefault();

        const rect = e.target.getBoundingClientRect();
        const vertical = e.clientY - rect.top;
        const position = this.calculateLimits(e.target, vertical);

        this.draggedItem.dataset.position = position;
    }

    handleDrop(e) {
        e.preventDefault();

        const afterElement = e.target;
        const currentElement = this.draggedItem.parentElement;
        const position = this.draggedItem.dataset.position;

        console.log(position);

        if (position === "between") {

            afterElement.appendChild(this.draggedItem);
            this.draggedItem.classList.add('nested');
        
            // If target is the main list, removes nested class
            if(e.target.classList.contains("od-list")) { this.draggedItem.classList.remove('nested'); }

        } else if (position === "top") {

            currentElement.insertBefore(this.draggedItem, afterElement);

        } else if (position === "bottom") {

            if (afterElement.childElementCount >= 1) {

                afterElement.appendChild(this.draggedItem);
                this.draggedItem.classList.add('nested');

            } else {

                // If dragged item contains nested, it orders it.
                if(this.draggedItem.classList.contains("nested")){ 
                    currentElement.insertBefore(afterElement, this.draggedItem); 
                } else { 
                    
                        // in order to order items that are not in the nested, we must see if both doesnt have nested.
                        if(!this.draggedItem.classList.contains("nested") && !e.target.classList.contains("nested")){ 
                            currentElement.insertBefore(afterElement, this.draggedItem); 
                        } else {  }
                }
            }

            // If target is the main list, removes nested class
            if(e.target.classList.contains("od-list")) { this.draggedItem.classList.remove('nested'); }

        } else {
           console.log("null");
           console.log(this.draggedItem);
           this.list.appendChild(this.draggedItem);
           this.draggedItem.classList.remove('nested');
        }

        this.draggedItem.removeAttribute('data-position');
        if (typeof this.onDragStop == "function") {
            this.onDragStop();
        }
    }


    // Serialize to json
    convertToJSON() {
        const result = [];

        function traverse(node, processedNodes = new Set()) {
            const npUniqueId = node.getAttribute('data-npUniqueId');

            if (!processedNodes.has(npUniqueId)) {
                processedNodes.add(npUniqueId);

                const obj = {
                    npUniqueId: npUniqueId,
                    name: node.querySelector('.od-name').innerText,
                    children: [],
                };

                const nestedItems = node.querySelectorAll('.od-item.nested');
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

        const topLevelItems = this.list.querySelectorAll('.od-item:not(.nested)');
        topLevelItems.forEach(topLevelItem => {
            const topLevelObj = traverse(topLevelItem);
            if (topLevelObj) {
                result.push(topLevelObj);
            }
        });

        return result;
    }
}