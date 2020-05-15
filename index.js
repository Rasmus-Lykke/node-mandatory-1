// Importing from the node_modules folder, node can autoresolve
var express = require("express");
// Instanciating express
var app = express();

// To serve images, CSS files, and JaaaScript files in a directory named public
app.use(express.static('public'));
app.use(express.static('pictures'));

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));
 
// parse application/json obs! only need this line but above is usefull
app.use(express.json());


// Callback function
app.get("/", (req, res) => {
    return res.sendFile(__dirname + "/public/index.html");
}) ;

app.get("/filer", (req, res) => {
    return res.sendFile(__dirname + "/public/filer.html");
});

app.get("/vaerktoejer", (req, res) => {
    return res.sendFile(__dirname + "/public/vaerktoejer.html");
});

app.get("/kildeliste", (req, res) => {
    return res.sendFile(__dirname + "/public/kildeliste.html");
});

///////////////// CARS /////////////////

const request = require("request");

// The list which holds our cars
let cars = [
    {id: 1, brand: "Audi"}, 
    {id: 2, brand: "Mercedes"}, 
    {id: 3, brand: "BMW"},
    {id: 4, brand: "Volvo"},
    {id: 5, brand: "Volkswagen"}
];

// A variable which holds the length of our cars list
let highId = 5;

// Send all the cars in the response
app.get("/cars", (req, res) => {
    return res.send({ response: {cars} });
});

// Send an individual car in the response from the given id in the url.
app.get("/cars/:id", (req, res) => {
    const car = cars.find(car => car.id === Number(req.params.id));
    return res.send({ response: {car: car}} );
});

// Add add a car to the list and send the list as a response.
app.post("/addcars", (req, res) => {
    // Increse the highId with one so we dont have
    // two cars with the same id
    highId += 1;
 
    // Push the new car to the list. 
    // Get the brand from the request parameter.
    cars.push({
        "id": highId,
        "brand": req.body.brand
    });

    // Sending the list as the response
    return res.send({ response: {cars} });
});

// Update a car in the list from the id given 
// in the request paramenter
app.put("/updatecar/:id", (req, res) => {

    // Find the index in the list where the car with the given id is located.
    const foundIndex = cars.findIndex(car => car.id === Number(req.params.id));

    // Delete the id because we dont want the use to control our id's
    delete req.body.id;
    /*
    Using the "..." spread operator for adding or replacing. 
    in this case replacing. The first ... is the original values
    and the second ... is the new values. 
    If there is nothing to replace original values they will remain.
    */
    cars[foundIndex] = { ...cars[foundIndex], ...req.body };

    // Sending the list as the response
    return res.send({ response: {cars} });
});

// Delete a car in the list from the id given 
// in the request paramenter
app.delete("/deletecars/:id", (req, res) => {

    delete cars[cars.findIndex(cars => cars.id==req.params.id)];

    // Sending the list as the response
    return res.send({ response: {cars} });
});


///////////////// PORT ///////////////

const port = process.env.PORT ? process.env.PORT : 3000;

// ".listen(3000)" is the port number, should not be declaren manually but can be
const server = app.listen(port, error => {

    if(error) {
        Console.log("Error running on the server", error);
    } 

    console.log("Server is running on port", server.address().port)
});