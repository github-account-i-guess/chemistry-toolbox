class CT_Element {
    constructor ({ number, molarMass }) {
        Object.assign(this, { number, molarMass });
    }
}

const CT_elements = {
    1: new CT_Element ({ number: 1, molarMass: 1.00794}),

}