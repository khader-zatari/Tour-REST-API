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
      type: "POST", // define the type of HTTP verb we want to use (POST for our form)
      url: "/guide", // the url where we want to POST
      contentType: "application/json",
      data: JSON.stringify({
        name: $("#name").val(),
        email: $("#email").val(),
        cellular: $("#cellular").val(),
      }),
      processData: false,
      // dataType: 'json', // what type of data do we expect back from the server
      encode: true,
      success: function (data, textStatus, jQxhr) {
        console.log(data);
        location.href = "/home";
      },
      error: function (jqXhr, textStatus, errorThrown) {
        console.log(errorThrown);
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
