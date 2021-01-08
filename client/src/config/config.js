module.exports = {
    Server_URL: proccess.env.SERVER_URL || "/",
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