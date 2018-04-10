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
var currentTime = $('#currentTimeInput').val();
// Define current time (hours + minutes) and place in variable 
// Tell the TA's about my code challenge I overame using multiple variables. I did it!
var hourNow = moment().hour();
var minuteNow = moment().minute();
// var displayTime = 
console.log(hourNow, minuteNow);
// var currentTime = $('#currentTimeInput').val("e.g. 12:00 am/pm");
$('#currentTimeInput').val(hourNow + " " + ":" + " " + minuteNow);
console.log("Working?");

// // Create variable with current date
// var d = new date();
// console.log(d);

// SECOND create new row
var newRow = $("<tr>");
// THIRD put data into new row for each criteria of data
newRow.append("<td>" + trainName + "</td>");
newRow.append("<td>" + destination + "</td>");
newRow.append("<td>" + frequency + "</td>");
newRow.append("<td>" + " " + "</td>");
newRow.append("<td>" + " " + "</td>");
newRow.append("<td>" + hourNow + " " + " : " + " " + minuteNow + " " + "</td>");

// //Not appending in correct spot
// newRow.append("<td>" + timeNow + "</td>");
// FORTH Add row to tbody
$("tbody").append(newRow);

// Create local "temporary" object for holding train data
var newTrain = {
    nameOfTrain: trainName,
    trainDestination: destination,
    soonestTrain:  firstTrain,
    wait: frequency, 
    // time: currentTime
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
$('#currentTimeInput').val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
// This line of code at 75 shows error that failed: permission_denied
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

// Store everything into a variable
var trainName = childSnapshot.val().nameOfTrain;
var destination = childSnapshot.val().trainDestination;
var firstTrain = childSnapshot.val().soonestTrain;
var frequency = childSnapshot.val().wait;
// var currentTime = childSnapshot.val().time;

// Train info
console.log(trainName);
console.log(destination);
console.log(firstTrain);
console.log(frequency);
// console.log(time);


// // Display time at current time
// var currentTime = new date();
// console.log(currentTime);






// // Prettify the train start
// var trainStartTime = moment.unix(firstTrain).format();
// console.log("moment js works?");


// // calculate time until next arrival by adding the value of the frequency input
// // Trains arrive every 10 minutes + This function adds time to an existing moment
// var trainArrival = moment().add(10, "minutes");
// console.log(trainArrival);



});

//Display time

// $(document).ready(function () {
//     var now = moment();
//     console.log(now);
    // var timeRow = $("<tr>");
    // timeRow.append("<td>" + now + "</td>");
    // $("tbody").append(timeRow);

// });










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
