$(document).ready(function () {
  var obj = { guide: {} };
  var result1 = localStorage.getItem("storageName");
  var theId = 0;

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
      $.ajax({
        type: "GET",
        url: "http://localhost:3001/guide",
        encode: true,
        success: function (r1) {
          var e = document.getElementById("guideOption");
          var s = e.options[e.selectedIndex].text;
          //  console.log("first" + $("#guide_name").val());

          r1.forEach((element, key) => {
            if (element.name == s) {
              theId = element._id;
            }
          });

          $.ajax({
            type: "GET",
            url: "http://localhost:3001/tours/" + result1,
            encode: true,
            success: function (result) {
              $("#tour_form").submit(function (event) {
                event.preventDefault();
                console.log("in submit" + result[0]);

                if ($("#starting_date").val() == "")
                  obj.start_date = result[0].start_date;
                else obj.start_date = $("#starting_date").val();
                if ($("#Duration").val() == "")
                  obj.duration = result[0].duration;
                else obj.duration = $("#Duration").val();
                if ($("#price").val() == "") obj.price = result[0].price;
                else obj.price = $("#price").val();
                obj.guide = theId;

                // process the form
                $.ajax({
                  type: "PUT", // define the type of HTTP verb we want to use (POST for our form)
                  url: "/tours/" + result1, // the url where we want to POST
                  contentType: "application/json",
                  data: JSON.stringify({
                    start_date: obj.start_date,
                    duration: obj.duration,
                    price: obj.price,
                    guide: obj.guide,
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
        },
        error: function (err) {
          console.log("err", err);
        },
      });
    },
    error: function (err) {
      console.log("err", err);
    },
  });
});
