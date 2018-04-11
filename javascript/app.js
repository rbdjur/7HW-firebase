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
    apiKey: "AIzaSyDg9drSeRVEzCw0QwOz3rfOECJc377zWdY",
    authDomain: "hw-7-use-this-one.firebaseapp.com",
    databaseURL: "https://hw-7-use-this-one.firebaseio.com",
    projectId: "hw-7-use-this-one",
    storageBucket: "hw-7-use-this-one.appspot.com",
    messagingSenderId: "420946593445"
  };
  firebase.initializeApp(config);
// console.log(config);

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

// Train comes every five minutes
var tFrequency = 5;

// Time is 3:30 AM
var firstTime = "3:30";

// First time (pushed back 1 year so time conflicts do not occur)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var timeNow = moment();
console.log("CURRENT TIME: " + moment(timeNow).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

 // Next Train
 var nextTrain = moment().add(tMinutesTillTrain, "minutes");
 console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));






// TIME SECTION

// // Define current time (hours + minutes) and place in variable 
// var hourNow = moment().hour();
// var minuteNow = moment().minute();
// $('#currentTimeInput').val(hourNow + " " + ":" + " " + minuteNow);
// console.log("Working?");

// // Trains run every 15 minutes 
// var nextTrain = moment().add(15, "minutes");
// var nextTrainHour = moment(nextTrain).hour();
// var nextTrainMinute = moment(nextTrain).minute();
// console.log(nextTrainHour, nextTrainMinute);

// Difference between times

// var diffTime = moment().diff(moment())

// Minutes Away Column
// - Do we use firebase to randomly generate numbers on the back-end side to populate this column when called upon?

// SECOND create new row
var newRow = $("<tr>");
// THIRD put data into new row for each criteria of data
newRow.append("<td>" + trainName + "</td>");
newRow.append("<td>" + destination + "</td>");
newRow.append("<td>" + frequency + "</td>");
newRow.append("<td>" + moment(nextTrain).format("hh:mm") + "</td>");
// newRow.append("<td>" + nextTrainHour + " " + " : " + " " + nextTrainMinute + " " + "</td>");
newRow.append("<td>" + tMinutesTillTrain + "</td>");
// newRow.append("<td>" + hourNow + " " + " : " + " " + minuteNow + " " + "</td>");
newRow.append("<td>" + timeNow.format("hh:mm") + "</td>");



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
console.log(newTrain.nameOfTrain);

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
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

// RIGHT HERE - put the values of the form in the html, inside here.  
var trainName = $('#trainNameInput').val();
var destination = $('#destinationInput').val();
var firstTrain = $('#firstTrainInput').val();
var frequency = $('#frequencyInput').val();
var currentTime = $('#currentTimeInput').val();

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

// Add a .set() method to add the desired information to firebase and have it persist. 
// also refer to train example exercise and firebase exercises that allow you to change the information from the back-end side (firebase). 






// Prettify the train start
var trainStartTime = moment.unix(firstTrain).format();
console.log("moment js works?");


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
