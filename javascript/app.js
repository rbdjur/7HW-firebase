// 1. Initialize firebase
// 2. Create button for adding new trains
// - update the html
// - update the firesbase
//3. Retrieve train info from train databse.
//4. Calculate next train and frequency

// 1. Initialize firebase
// declare variable with firebase information (javascript)
var config = {
    apiKey: "AIzaSyBjo1TJxrMsl2a3-dZRTivCH6MUqNhTzwM",
    authDomain: "real-hw-cbf41.firebaseapp.com",
    databaseURL: "https://real-hw-cbf41.firebaseio.com",
    projectId: "real-hw-cbf41",
    storageBucket: "",
    messagingSenderId: "997302293566"
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

    // Alert for train added
    alert(trainName + " " + "added");

    // clears all of the text-boxes
    $('#trainNameInput').val("");
    $('#destinationInput').val("");
    $('#firstTrainInput').val("");
    $('#frequencyInput').val("");

    // clears all of the text-boxes
    $('#trainNameInput').val("");
    $('#destinationInput').val("");
    $('#firstTrainInput').val("");
    $('#frequencyInput').val("");
    $('#currentTimeInput').val("");


    database.ref().push({
        nameOfTrain: trainName,
        trainDestination: destination,
        wait: frequency,
        //nextArrival: nextTrain,
        //minutesAway: tMinutesTillTrain
    });

});


// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());

    // Store everything into a variable
    var trainName = childSnapshot.val().nameOfTrain;
    var destination = childSnapshot.val().trainDestination;
    var firstTrain = childSnapshot.val().soonestTrain;
    var frequency = childSnapshot.val().wait;
    // var currentTime = childSnapshot.val().time;

    /*
    database.ref().push({
        trainName: trainData.nameOfTrain,
    });
    */

    // Train info
    console.log(trainName);
    console.log(destination);
    console.log(firstTrain);
    console.log(frequency);
    // console.log(time);

    // Add a .set() method to add the desired information to firebase and have it persist. 
    // also refer to train example exercise and firebase exercises that allow you to change the information from the back-end side (firebase). 
    var currentTime = moment();
  
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
    var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // TIME SECTION
    // SECOND create new row
    var newRow = $("<tr>");
   
    $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>" + timeNow.format("hh:mm") + "</td></tr>" ); 
    // FORTH Add row to tbody
    $("tbody").append(newRow);
    console.log("This works");


    // Prettify the train start
    var trainStartTime = moment.unix(firstTrain).format();
    console.log("moment js works?");
});