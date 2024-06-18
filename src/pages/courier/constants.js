const condition = [
    {label:"Select Condition Type",value:"Select Condition Type"},
    {label:"Payment Mode",value:"Payment Mode"},
    {label:"Weight",value:"Weight"},
    {label:"Zone Wise",value:"Zone Wise"},
    {label:"Order Value",value:"Order Value"},
    {label:"State",value:"State"},
    {label:"Pincode",value:"Pincode"},
    {label:"City",value:"City"},
    {label:"Dangerous Goods(DG)",value:"Dangerous Goods(DG)"},
    {label:"Product SKU",value:"Product SKU"},
    {label:"Channel Id",value:"Channel Id"},
    {label:"Service Codes",value:"Service Codes"},
    {label:"AWB Assigned Time",value:"AWB Assigned Time"},
    {label:"Order Tags",value:"Order Tags"},
    {label:"Product Category",value:"Product Category"},
    {label:"Pickup Location ID",value:"Pickup Location ID"},
]

const paymentMethod = [
    {label:"Prepaid",value:"Prepaid"},
    {label:"COD",value:"COD"},
]

const weights = [
    {label:"Select",value:"Select"},
    {label:"Greater Than Equals To (>=)",value:"Greater Than Equals To"},
    {label:"Less Than Equals To (<=)",value:"Less Than Equals To"},
    {label:"Equals To (=)",value:"Equals To"},
]

const awbTime = [
    {label:"Select",value:"Select"},
    {label:"Before",value:"Before To"},
    {label:"After",value:"After To"},
    {label:"Between",value:"Between"}
]

const states = [
    {label:"Gujarat",value:"Gujarat"},
    {label:"Goa",value:"Goa"},

]

const city = [
    {label:"Bhavnagar",value:"Bhavnagar"},
    {label:"Ahmedabad",value:"Ahmedabad"}
]

module.exports = {
    condition:condition,
    paymentMethod:paymentMethod,
    weights:weights,
    awbTime:awbTime,
    states:states,
    city:city
}