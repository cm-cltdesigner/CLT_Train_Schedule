$(document).ready(function () {
	// 1. Link to Firebase
	var trainData = new Firebase("https://train-database.firebaseio.com/");

	// 2. Button for adding Trains
	$("#addTrainBtn").on("click", function () {

		// Grabs user input and assign to variables
		var trainName = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var trainTimeInput = moment($("#trainTimeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
		var frequencyInput = $("#frequencyInput").val().trim();

		var newTrain = {
			name: trainName,
			destination: destination,
			trainTime: trainTimeInput,
			frequency: frequencyInput,
		}

		// pushing anything to Firebase
		trainData.push(newTrain);

		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#trainInput").val("");
		$("#frequencyInput").val("");

	
		return false;
	});

	trainData.on("child_added", function (childSnapshot, prevChildKey) {

	
		var firebaseName = childSnapshot.val().name;
		var firebaseDestination = childSnapshot.val().destination;
		var firebaseTrainTimeInput = childSnapshot.val().trainTime;
		var firebaseFrequency = childSnapshot.val().frequency;

		var differentTime = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes");
		var timeRemainder = moment().diff(moment.unix(firebaseTrainTimeInput), "minutes") % firebaseFrequency;
		var minutes = firebaseFrequency - timeRemainder;

		var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");

		// Tesing for sanity
		console.log(minutes);
		console.log(nextTrainArrival);
		console.log(moment().format("hh:mm A"));
		console.log(nextTrainArrival);
		console.log(moment().format("X"));

		// Appending the users train info
		$("#trainTable > tbody").append("<tr><td>" + firebaseName +  "</td><td>" + firebaseDestination + "</td><td>" + firebaseFrequency + " mins" + "</td><td>" + nextTrainArrival + "</td><td>" + minutes + "</td></tr>");
	})});