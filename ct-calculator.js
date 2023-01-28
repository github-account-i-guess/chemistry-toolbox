function addClassesToElement(element, classes) {
    classes.forEach(c => {
        element.classList.add(c);
    });
}

class CT_Calculator {
    /**
     * Creates a page that takes in a set of inputs and performs a calculation on them
     * TODO: make a separate page class in case you want to include multiple calculators on the same page.
     * @param {string} name The name of the calculator, this will be displayed in places like the navbar at the top of the page 
     * @param {Array[string]} inputs An array of the names of each input
     * @param {Function} inputToOutputFunction A function that will take in each input at produce an output
     */
    constructor (name, inputs, inputToOutputFunction) {
        this.name = name;
        this.inputs = inputs;
        this.inputToOutputFunction = inputToOutputFunction;
        this.inputEls = [];
    }
    
    /**
     * Creates a new tab in the nav bar and creates content for when you click on the tab
     * @param {HTMLElement} navDiv The nav bar to put the tab in
     * @param {HTMLElement} tabContentDiv The div to put the content in
     */
    createTabPane(navDiv, tabContentDiv) {
        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");
        
        listItem.innerHTML = `<button class="nav-link" id="${this.name}NavTab" data-bs-toggle="tab" data-bs-target="#${this.name}TabContent" type="button" role="tab" aria-controls="profile" aria-selected="false">${this.name}</button>`;

        navDiv.appendChild(listItem);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("tab-pane");
        contentDiv.id = this.name + "TabContent";
        contentDiv.role = "tabpanel";

        this.inputs.forEach(input => {
            
            const row = document.createElement("div");

            addClassesToElement(row, ["row", "py-2", "px-3"]);

            row.innerHTML = `
                <p>${input}</p>
            `;
            const inputEl = document.createElement("input");
            inputEl.classList.add("form-control");
            inputEl.type = "text";
            inputEl.placeholder = input;

            row.appendChild(inputEl);

            contentDiv.appendChild(row);
            this.inputEls.push(inputEl);
        });

        const calculateButton = document.createElement("button");
        addClassesToElement(calculateButton, ["btn", "btn-primary"]);
        calculateButton.innerHTML = "Calculate " + this.name;
        calculateButton.addEventListener("click", () => {
            alert(this.inputToOutputFunction(...this.inputEls.map(i => i.value)));
        });
        contentDiv.appendChild(calculateButton);
        tabContentDiv.appendChild(contentDiv);
    }
}

// Global HTML elements
const CT_htmlElements = {

}

// weird way to initialize all the elements without writing them all out :/
const CT_htmlElementIds = ['navTabs', "tabContent"];
CT_htmlElementIds.forEach(id => {
    CT_htmlElements[id] = document.querySelector(`#${id}`);
});

const CT_calculators = [
    new CT_Calculator("elementMolarMass", ["Atomic Number"], function (atomicNumber) {
        if (!atomicNumber) return "No atomic number";
        return CT_elements[atomicNumber].molarMass;
    }),
    new CT_Calculator("elementMoles", ["Atomic Number", "Molar Mass"], function (atomicNumber, molarMass) {
        if (!atomicNumber) return "No atomic number";
        if (!molarMass) return "No molar mass";

        return molarMass/CT_elements[atomicNumber].molarMass;
    })
]

// Populating the page with tabs
CT_calculators.forEach(function _ (calculator) {
    calculator.createTabPane(CT_htmlElements.navTabs, CT_htmlElements.tabContent);
});