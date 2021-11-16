$(document).ready(function () {
  var obj = {};
  var result1 = localStorage.getItem("name");
  $.ajax({
    type: "GET",
    url: "http://localhost:3001/guide/" + result1,
    encode: true,
    success: function (result) {
      $("#tour_form").submit(function (event) {
        event.preventDefault();
        console.log("in submit" + result[0]);

        if ($("#name").val() == "") obj.name = result[0].name;
        else obj.name = $("#name").val();
        if ($("#email").val() == "") obj.email = result[0].email;
        else obj.email = $("#email").val();
        if ($("#cellular").val() == "") obj.price = result[0].cellular;
        else obj.cellular = $("#cellular").val();

        // process the form
        $.ajax({
          type: "PUT", // define the type of HTTP verb we want to use (POST for our form)
          url: "/guide/" + result1, // the url where we want to POST
          contentType: "application/json",
          data: JSON.stringify({
            name: obj.name,
            email: obj.email,
            cellular: obj.cellular,
          }),
          processData: false,
          // dataType: "json", // what type of data do we expect back from the server
          encode: true,
          success: function (data, textStatus, jQxhr) {
            console.log("why");
            console.log(data);
            // setTimeout(function () {
            //   location.reload();
            // }, 0001);
            location.href = "/home";
          },
          error: function (jqXhr, textStatus, errorThrown) {
            console.log(errorThrown);
          },
        });

        //   // stop the form from submitting the normal way and refreshing the page
        //

        event.preventDefault();
      });
    },
    error: function (err) {
      console.log("err", err);
    },
  });
});
