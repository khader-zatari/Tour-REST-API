$(document).ready(function () {
  $("form[name='tour_form']").validate({
    // Specify validation rules
    rules: {
      id: {
        minlength: 5,
      },
      id_field: {
        required: true,
        digits: true,
        minlength: 6,
      },
    },
    // Specify validation error messages
    messages: {
      name: "Your name must be at least 5 characters long",
      id_field: {
        digits: "Please enter only digits",
        minlength: "Your name must be at least 6 characters long",
      },
      email: "email structure is some@domain ",
    },
  });

  // process the form
  $("#tour_form").submit(function (event) {
    event.preventDefault();
    console.log("in submit");
    // process the form
    var theId = 0;
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/guide",
      encode: true,
      success: function (r1) {
        var e = document.getElementById("guideOption");
        var s = e.options[e.selectedIndex].text;
        console.log("first" + $("#guide_name").val());

        r1.forEach((element, key) => {
          if (element.name == s) {
            theId = element._id;
          }
        });
        $.ajax({
          type: "POST", // define the type of HTTP verb we want to use (POST for our form)
          url: "/tours", // the url where we want to POST
          contentType: "application/json",
          data: JSON.stringify({
            countryName: $("#id").val(),
            start_date: $("#starting_date").val(),
            duration: $("#Duration").val(),
            price: $("#price").val(),
            // guide: $("#guide_name").val(),
            guide: theId,
          }),
          processData: false,
          // dataType: 'json', // what type of data do we expect back from the server
          encode: true,
          success: function (data, textStatus, jQxhr) {
            console.log(data);
            console.log("we are here ");
            location.href = "/home";
          },
          error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
          },
        });
      },
      error: function (err) {
        console.log("err", err);
      },
    });

    // stop the form from submitting the normal way and refreshing the page
  });

  $.ajax({
    type: "GET",
    url: "http://localhost:3001/guide",
    encode: true,
    success: function (result) {
      var s = document.getElementById("guideOption");
      // var s = $("#guideOption");
      result.forEach((element, key) => {
        s[key] = new Option(element.name, key);
      });
    },
    error: function (err) {
      console.log("err", err);
    },
  });
});
