const express = require("express");
require("dotenv").config();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect(`mongodb+srv://${process.env.MONGOAUTHUSER}:${process.env.MONGOAUTHPASS}@cluster0.ep40l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const path = require("path");
const app = express();

const port = process.env.PORT || 8000;

//define mongoose schema
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  address: String,
  desc: String,
});
var Contact = mongoose.model("Contact", contactSchema);

app.use("/static", express.static("static")); //for seerving static file
app.use(express.urlencoded({ extended: true }));

//set the template engine as pug
app.set("view engine", "pug");

//set the views directory
app.set("views", path.join(__dirname, "views"));

//our pug demo endpoint
app.get("/", (req, res) => {
  res.status(200).render("home.pug");
});

app.get("/contact", (req, res) => {
  res.status(200).render("contact.pug");
});

app.post("/contact", (req, res) => {
  req.setTimeout(120000);
  var myData = new Contact(req.body);
  myData.save().then(() => {
    res.send("This item is saved to database");
  })
    .catch(() => {
      res.status(400).send("This item was not saved to database");
    });
  // res.status(200).render("contact.pug");
});

app.listen(port, () => {
  console.log(`The application started successfully on port : ${port}`);
});
