// 1. Initialize firebase
// 2. Create button for adding new trains
    // - update the html
    // - update the firesbase
//3. Retrieve train info from train databse.
//4. Calculate next train and frequency
// 

// 1. Initialize firebase
// declare variable with firebase information (javascript)
var config = {
    apiKey: "AIzaSyDB2GXeY6DhUDzpitlLuaDaO0GTgQQI3FI",
    authDomain: "homework-7-d216f.firebaseapp.com",
    databaseURL: "https://homework-7-d216f.firebaseio.com",
    projectId: "homework-7-d216f",
    storageBucket: "homework-7-d216f.appspot.com",
    messagingSenderId: "954744625559"
};

firebase.initializeApp(config);

// variable referencing database. 
var database = firebase.database();

// 2. Create button for adding new trains
$("#addTrainBtn").on("click", function (event) {
    console.log("inside function");
    event.preventDefault();
// store data in variables 
var trainName = $('#trainNameInput').val();
var destination = $('#destinationInput').val();
var firstTrain = $('#firstTrainInput').val();
var frequency = $('#frequencyInput').val();

// SECOND create new row
var newRow = $("<tr>");
// THIRD put data into new row for each criteria of data
newRow.append("<td>" + trainName + "</td>");
newRow.append("<td>" + destination + "</td>");
newRow.append("<td>" + frequency + "</td>");
// FORTH Add row to tbody
$("tbody").append(newRow);

// Create local "temporary" object for holding train data
var newTrain = {
    nameOfTrain: trainName,
    trainDestination: destination,
    soonestTrain:  firstTrain,
    wait: frequency, 
};
console.log(newTrain);

// Uploads employee data to the database
// Access issues communicating with firebase. 
database.ref().push(newTrain);
console.log("This works");

// logs information in console
console.log(newTrain.nameOfTrain);
console.log(newTrain.trainDestination);
console.log(newTrain.soonestTrain);
console.log(newTrain.wait);

alert(trainName + " " + "added");

// clears all of the text-boxes
$('#trainNameInput').val("");
$('#destinationInput').val("");
$('#firstTrainInput').val("");
$('#frequencyInput').val("");
});



// In console log I am getting train name is not defined, how do I define trainName within this?
// var newTrain = [
//     name = trainName,
//     trainDestination = destination,
//     soonestTrain =  firstTrain,
//     wait = frequency, 
// ];


    

// // update database information in firebase
// database.ref().set({
//     destinationInput : destination,
//     frequencyInput : frequency,
//     trainNameInput : trainName
// });
