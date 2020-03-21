      // Initial array of movies
      var cities = ["Stamford"];

      // displayMovieInfo function re-renders the HTML to display the appropriate content
      function displayMovieInfo() {

        var city = $(this).attr("data-name");
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=ee05c1384d36d5cf2e09bc6d27d833b8";

        // Creating an AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
var currentWeather = response.list[response.list.length - 1]
            console.log(currentWeather);


          // Creating a div to hold the city
          var movieDiv = $("<div class='movie'>");

          // Storing the temperature data
          var temperature = currentWeather.main.temp;

          // Creating an element to have the temperature in F displayed
          var pOne = $("<p>").text("Temp in F : " + temperature);

          // Displaying the temperature
          movieDiv.append(pOne);

          // Storing the humidity
          var humidity = currentWeather.main.humidity;

          // Creating an element to hold the humidity
          var pTwo = $("<p>").text("Humidity: " + humidity);

          // Displaying the humidity
          movieDiv.append(pTwo);

          // Storing the wind speed
          var windspeed = currentWeather.wind.speed;

          // Creating an element to hold the wind speed
          var pThree = $("<p>").text("Wind Speed: " + windspeed);

          // Appending the wind speed
          movieDiv.append(pThree);

        //   // Storing the UV index
        //   var UVindexplot = response.Plot;

        //   // Creating an element to hold the UV index
        //   var pFour = $("<p>").text("UV Index: " + UVindex);

        //   // Appending the UV index
        //   movieDiv.append(pFour);




          // Retrieving the URL for the image
          var imgURL = response.Poster;

          // Creating an element to hold the image
          var image = $("<img>").attr("src", imgURL);

          // Appending the image
          movieDiv.append(image);

          // Putting the entire movie above the previous movies
          $("#movies-view").prepend(movieDiv);
        });

      }

      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#buttons-view").empty();

        // Looping through the array of movies
        for (var i = 0; i < cities.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("movie-btn");
          // Adding a data-attribute
          a.attr("data-name", cities[i]);
          // Providing the initial button text
          a.text(cities[i]);
          // Adding the button to the buttons-view div
          $("#buttons-view").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-movie").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var movie = $("#movie-input").val().trim();

        // Adding movie from the textbox to our array
        cities.push(movie);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();
      });

      // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".movie-btn", displayMovieInfo);

      // Calling the renderButtons function to display the initial buttons
      renderButtons();
    
