class Calculator {
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
    }
    
    createTabPane(navDiv, tabContentDiv) {
        const listItem = document.createElement("li");
        listItem.classList.add("nav-item");
        
        listItem.innerHTML = `<button class="nav-link" id="${this.name}NavTab" data-bs-toggle="tab" data-bs-target="#${this.name}TabContent" type="button" role="tab" aria-controls="profile" aria-selected="false">${this.name}</button>`;
        console.log(listItem);
        navDiv.appendChild(listItem);

        const contentDiv = document.createElement("div");
        contentDiv.classList.add("tab-pane");
        contentDiv.id = this.name + "TabContent";
        contentDiv.role = "tabpanel";
        this.inputs.forEach(input => {
            
            const row = document.createElement("div");

            ["row", "py-2", "px-3"].forEach(c => {
                row.classList.add(c);
            });

            row.innerHTML = `<input class = "form-control" type = "text" placeholder = "${input}" data-input-param = "${input}"></input>`;

            contentDiv.appendChild(row);
        });
        tabContentDiv.appendChild(contentDiv);
    }
}

// Global HTML elements
const htmlElements = {

}
const htmlElementIds = ['navTabs', "tabContent"];
htmlElementIds.forEach(id => {
    htmlElements[id] = document.querySelector(`#${id}`);
});

const elements = {
    
}

const calculators = [
    new Calculator("elementMolarMass", ["Atomic Number"], function (atomicNumber) {
        return elements[atomicNumber].molarMass;
    }),
    new Calculator("elementMoles", ["Atomic Number", "Molar Mass"], function (atomicNumber, molarMass) {
        return molarMass/elements[atomicNumber].molarMass;
    })
]

calculators.forEach(function _ (calculator) {
    calculator.createTabPane(htmlElements.navTabs, htmlElements.tabContent);
});