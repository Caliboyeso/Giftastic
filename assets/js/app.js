// The ready() method makes sure the DOM has been fully loaded before running the JS code
$(document).ready(function() {

    // Global Variables, Arrays, Objects
    // =============================================

    // This array holds a list of animals/people
    var buttonsList = ["Cat", "Drake", "Messi", "Rihanna", "Dog"];


    // Functions
    // =============================================

    // Function #1: populateButtons()
    // This function renders the objects in the buttonsList array as <button> tags
    function populateButtons(arrayToUse, classToAdd, areaToRender) {
        // Calling the empty() method to remove any added attributes to the <gif-buttons-section> div
        $(areaToRender).empty();
        // This for loop will loop through the buttonsList array
        for (var i = 0; i < arrayToUse.length; i++) {
            // This variable stores the <gif-buttons> div tag
            var button = $("<button id='gif-buttons'>");
            // Using the addClass() method to add class names to the button
            button.addClass(classToAdd);
            // Using the attr() method to set the button with the name from the buttonsList array
            button.attr("data-type", arrayToUse[i]);
            // Using the text() method to return the text content
            button.text(arrayToUse[i]);
            // Using the append() method to append the button to the <gif-buttons> div tag
            $(areaToRender).append(button);
        }
    }

    // onClick Events
    // =============================================

    // onClick Event #1: .gif-button
    // This onclick event renders images depending on the button clicked
    $(document).on("click", ".gif-button", function() {
        // Using the empty() method to remove any current images
        $("#gif-images-section").empty();
        // Using the removeClass() method to remove class names
        $(".gif-button").removeClass("active");
        // Using the addClass() method to add class names to selected button
        $(this).addClass("active");
        // This variable stores the name of the selected object
        var type = $(this).attr("data-type");
        // This variable stores the API key
        var apiKey = "rBJ7oBB1KMMi1GW9t9268IJrVEh1K2Rp"
        // This varibale stores the Giphy URL
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=" + apiKey + "&limit=20";
        // Using AJAX to send and retrieve data from the Giphy server
        $.ajax({
            // This is where the request is sent
            url: queryURL,
            // This method retrieves the data
            method: "GET"
        })
        // Using the then() method to return a promise
        .then(function(response) {
            // This variable stores the data that is retrieved
            var results = response.data;
            // This for loop loops through the results variable
            for (var i = 0; i < results.length; i++) {
                // This variable stores a <div> tag
                var gifData = $("<div class=\"gif-data\">");
                // This variable stores the ratings
                var imageRating = results[i].rating;
                // This variable stores the image ratings in a <p> tag
                var imageRating = $("<p id='image-rating'>").append("Rating: <span id='letter-rating'>" + imageRating.toUpperCase() + "</span>");
                // This variable stores to make images animated
                var animate = results[i].images.fixed_height.url;
                // This variable stores to make images not animated
                var still = results[i].images.fixed_height_still.url;
                // This variable stores a <img> tag
                var gifImage = $("<img>");
                // Using the attr() method to identify the image by the url
                gifImage.attr("src", still);
                // Using the attr() method to set data-still as an attribute and still as the value
                gifImage.attr("data-still", still);
                // Using the attr() method to set data-animate as an attribute and animate as the value
                gifImage.attr("data-animate", animate);
                // Using the attr() method to set data-state as an attribute and still as the value
                gifImage.attr("data-state", "still");
                // Using the addClass() method to set a class to the <img> tag
                gifImage.addClass("gif-image");
                // Using the append() method to append the ratings to the <gif-data> div
                gifData.append(imageRating);
                // Using the append() method to append the images to the <gif-data> div
                gifData.append(gifImage);
                // Using the append() method to append the <gif-data> div to the <gif-images-section> div
                $("#gif-images-section").append(gifData);
            }
        });
    });

    // onClick Event #2: .gif-image
    // This onclick event handles when the user clicks on a image
    $(document).on("click", ".gif-image", function() {
        // This variable stores the data-state of the image
        var state = $(this).attr("data-state");
        // If the data-state of the image is still...
        if (state === "still") {
            // Using the attr() method to set image source to animate
            $(this).attr("src", $(this).attr("data-animate"));
            // Using the attr() method to set the data-state to animate
            $(this).attr("data-state", "animate");
        }
        // Else if the state does not equal still...
        else {
            // Using the attr() method to set image source to still
            $(this).attr("src", $(this).attr("data-still"));
            // Using the attr() method to set the data-state to still
            $(this).attr("data-state", "still");
        }
    });

    // onClick Event #3: #submit-form-button
    // This onclick event handles when the user inputs data and clicks on the "Add" button
    $("#submit-form-button").on("click", function(e) {
        // Using the preventDefault() method to prevent the form from submitting
        e.preventDefault();
        // This variable stores the user input using the val() method
        var newGif = $("input").eq(0).val();
        // A if statement if the user input has more than two letters...
        if (newGif.length > 2) {
            // Using the push() method to store the user input in the buttonsList array
            buttonsList.push(newGif);
        }
        // Calling the populateButtons() function
        populateButtons(buttonsList, "gif-button", "#gif-buttons-section")
    });

    // Calling the populateButtons() function
    populateButtons(buttonsList, "gif-button", "#gif-buttons-section");

});