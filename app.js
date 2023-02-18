const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");

const app = express();
const port = 4500;

let items = ["Clean Bathroom", "Make a Coffee", "Reading Newsletter"];
let works = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get('/', (req,res) => {
    
    const day = date.getDate();

    res.render("list", {
        listTitle: day,
        newListItems: items
    });

});

app.get("/work", (req,res) => {
    res.render("list", {
        listTitle: "Work List",
        newListItems: works
    });
});


app.post("/", (req,res) => {
    let item = req.body.newItem

    if(req.body.list === "Work") {
        works.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});

app.listen(port, () => {
    console.log("Server is running on port " + port);
});
