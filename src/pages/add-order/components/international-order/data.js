
const shipmentTypes = [
    {label:"Gift",value:"Gift"},
    {label:"Sample",value:"Sample"},
    {label:"Commercial",value:"Commercial"}
]

const currencyTypes = [
    {label:"INR",value:"INR"},
    {label:"USD",value:"USD"},
]

const IGSTTypes = [
    {label:"A-not applicable",value:"A-not applicable"},
    {label:"B-LUT or Export under Bond",value:"B-LUT or export under bond"},
    {label:"C-Export Against Payment of IGST",value:"C-Export Against Payment of IGST"},
]

const incoTypes = [
    {label:"CIF",value:'CIF'},
    {label:"FOB",value:'FOB'},
]


module.exports = {
    shipmentTypes: shipmentTypes,
    currencyTypes:currencyTypes,
    IGSTTypes:IGSTTypes,
    incoTypes:incoTypes
}