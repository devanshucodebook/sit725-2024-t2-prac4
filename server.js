var express = require("express");
const mongoose = require("mongoose");
var app = express();
var port = 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
mongoose.connect("mongodb+srv://14feb1994:vNnkqsywvh896OP2@cluster0.lfwug.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database connected");
}).catch((e) => {
    console.log("Error connecting to database", e);
});
const contactSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true }
});
const Contact = mongoose.model('Contact', contactSchema);
const saveContact = async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).send('Contact saved successfully');
    } catch (error) {
        res.status(400).send('Error saving contact: ' + error.message);
    }
};
app.post('/details', saveContact);
app.listen(port, () => {
    console.log("App listening on port: " + port);
});
