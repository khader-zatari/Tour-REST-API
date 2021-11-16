const express = require("express");
path = require('path'),
routers = require("./routers/routes.js");
require("./DB/mongoose");
const app = express();
const port = 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(path.join(__dirname, 'js')));
app.use('/home', express.static(path.join(__dirname, 'html/index.html')));
app.use('/addTour', express.static(path.join(__dirname, 'html/add_user_form.html')));
app.use('/editTour', express.static(path.join(__dirname, 'html/edit_user_form.html')));
app.use('/addpath', express.static(path.join(__dirname, 'html/add_path_form.html')));
app.use('/createtours', express.static(path.join(__dirname, 'html/add_user_form.html')));
app.use('/addGuidee', express.static(path.join(__dirname, 'html/add_guide.html')));
app.use('/editGuidee', express.static(path.join(__dirname, 'html/edit_guide.html')));

app.use("/", routers);



app.listen(port, () => {
  console.log("the server is running");
});
