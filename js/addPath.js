$(document).ready(function () {
  var result1 = localStorage.getItem("name");

  $("#tour_form").submit(function (event) {
    event.preventDefault();
    console.log(result1);

    $.ajax({
      type: "POST", // define the type of HTTP verb we want to use (POST for our form)
      url: "/tours/" + result1 + "/path", // the url where we want to POST
      contentType: "application/json",
      data: JSON.stringify({
        name: $("#name").val(),
        country: $("#country").val(),
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
        console.log("fuckyoubitch")
        console.log(errorThrown);

      },
    });

    //   // stop the form from submitting the normal way and refreshing the page
    //
  });
});
