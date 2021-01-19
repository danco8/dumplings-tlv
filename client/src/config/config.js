module.exports = {
    Server_URL: process.env.SERVER_URL || "https://dumplings-tlv-gal.herokuapp.com",
    Order_Properties: [
        {
            id: "orderDate",
            label: "הוזמן לתאריך"
        },
        {
            id: "costumerName",
            label: "שם לקוח"
        },
        {
            id: "status",
            label: "סטטוס"
        },
        {
            id: "quantity",
            label: "כמות"
        },
        {
            id: "type",
            label: "סוג מוצר"
        }
    ]

};