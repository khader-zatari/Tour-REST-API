$(document).ready(function () {
  document.getElementById("tofesButton").onclick = (e) => {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/addTour",

      success: function (result) {
        location.href = "/addTour";
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };
  document.getElementById("tofesButton1").onclick = (e) => {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/addTour",

      success: function (result) {
        location.href = "/addTour";
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };

  document.getElementById("guideIndex1").onclick = (e) => {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/addTour",

      success: function (result) {
        location.href = "/addGuidee";
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };
  document.getElementById("guideIndex2").onclick = (e) => {
    e.preventDefault();
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/addTour",

      success: function (result) {
        location.href = "/addGuidee";
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };
  document.getElementById("showAllGuides").onclick = () => {
    showAllGuides();
  };
  const sortTable = (n) => {
    var table,
      rows,
      switching,
      i,
      x,
      y,
      shouldSwitch,
      dir,
      switchcount = 0;
    table = document.getElementById("table");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc";
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < rows.length - 1; i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount++;
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  };
  const Table = () => {
    $.ajax({
      type: "GET",
      url: "/tours",
      dataType: "json", //added after
      encode: true,
      contentType: "application/json",
      success: function (result) {
        $("#div").append("<table id = " + '"' + "table" + '">');
        $("#table").append(
          "<tr id = " +
            '"' +
            "tr0" +
            '">' +
            "<td " +
            "id =" +
            "'sortId" +
            "'> id</td>" +
            "<td " +
            "id =" +
            "'sortStart_date" +
            "'> Start_date</td>" +
            "<td " +
            "id =" +
            "'sortDuration" +
            "'> Duration </td>" +
            "<td " +
            "id =" +
            "'sortPrice" +
            "'> Price </td>"
        );
        for (key in result) {
          $("#table").append(
            "<tr id = " +
              '"' +
              "tr1" +
              '"' +
              "><td>" +
              result[key].countryName +
              "</td>" +
              "><td>" +
              result[key].start_date +
              "</td>" +
              "><td>" +
              result[key].duration +
              "</td>" +
              "<td>" +
              result[key].price +
              "</td>" +
              "<td>" +
              "<button id =" +
              "'guide_" +
              result[key].countryName +
              "'" +
              "> guide </button> " +
              "</td>" +
              "</td>" +
              "<td>" +
              "<button id =" +
              "'path_" +
              result[key].countryName +
              "'" +
              "> path </button> " +
              "</td>" +
              "<td>" +
              "<button id =" +
              "'delete_" +
              result[key].countryName +
              "'" +
              "> delete </button> " +
              "</td>" +
              "<td>" +
              "<button id =" +
              "'edit_" +
              result[key].countryName +
              "'" +
              "> edit </button> " +
              "</td>" +
              "</td>" +
              "<td>" +
              "<button id =" +
              "'addPath_" +
              result[key].countryName +
              "'" +
              "> add Path </button> " +
              "</td>" +
              "</td>" +
              "</tr>"
          );
        }

        $("#sortId").click((a) => {
          a.preventDefault();
          sortTable(0);
        });
        $("#sortStart_date").click((a) => {
          a.preventDefault();
          sortTable(1);
        });
        $("#sortDuration").click((a) => {
          a.preventDefault();
          sortTable(2);
        });
        $("#sortPrice").click((a) => {
          a.preventDefault();
          sortTable(3);
        });
        deleteRow();
        editRow();
        addPath();
        showGuide();
        showPath();
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };
  const deleteRow = () => {
    $.ajax({
      type: "GET",
      url: "/tours",
      encode: true,
      contentType: "application/json",
      dataType: "json",
      // processData: false, //deleted
      success: function (result) {
        var helper = "";
        for (key in result) {
          helper = "delete_" + result[key].countryName;

          document.getElementById(helper).onclick = (e) => {
            e.preventDefault();
            var txt = e.target.id;

            txt = txt.slice(7);

            $.ajax({
              type: "DELETE",
              url: "/tours/" + txt,
              success: function (res) {
                location.href = "/home";
              },
              error: function (err) {
                console.log("err", err);
              },
            });
          };
        }
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };
  const editRow = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/tours",
      encode: true,
      contentType: "application/json", //added
      dataType: "json", //added
      success: function (result) {
        var helper = "";
        for (key in result) {
          helper = "edit_" + result[key].countryName;
          document.getElementById(helper).onclick = (e) => {
            e.preventDefault();
            var txt = e.target.id;
            txt = txt.slice(5);

            $.ajax({
              type: "GET",
              url: "", //http://localhost:3001/editTour
              success: function (res) {
                location.href = "/editTour";
                localStorage.setItem("storageName", txt);
              },
              error: function (err) {
                console.log("err", err);
              },
            });
          };
        }
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };
  const addPath = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/tours",
      dataType: "json",
      encode: true,
      contentType: "application/json",
      success: function (result) {
        var helper = "";
        for (key in result) {
          helper = "addPath_" + result[key].countryName;
          document.getElementById(helper).onclick = (e) => {
            e.preventDefault();
            var txt = e.target.id;
            txt = txt.slice(8);

            $.ajax({
              type: "GET",
              url: "",
              success: function (res) {
                location.href = "/addpath";
                localStorage.setItem("name", txt);
              },
              error: function (err) {
                console.log("err", err);
              },
            });
          };
        }
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };
  const showPath = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/tours",
      dataType: "json",
      encode: true,
      contentType: "application/json",
      success: function (result) {
        var helper = "";
        for (key in result) {
          helper = "path_" + result[key].countryName;
          document.getElementById(helper).onclick = (e) => {
            e.preventDefault();
            var txt = e.target.id;
            txt = txt.slice(5);
            var theTextIs = "";
            result.map((item) => {
              if (item.countryName == txt) {
                item.path.forEach((element) => {
                  theTextIs += element.name;
                  theTextIs += "   ";
                  theTextIs += element.country;
                  theTextIs +=
                    "<button id =" +
                    "'" +
                    "delete_path_" +
                    txt +
                    "_" +
                    element.name +
                    "'" +
                    ">button</button>";
                  theTextIs += "</br>";
                });

                document.getElementById("edit").innerHTML = theTextIs;
                var helper2 = "";
                item.path.forEach((el) => {
                  helper2 = "delete_path_" + txt + "_" + el.name;
                  document.getElementById(helper2).onclick = (x) => {
                    x.preventDefault();
                    var ClickId = x.target.id;
                    ClickId = ClickId.substring(12);
                    var i = ClickId.search("_");
                    var left = ClickId.substring(i, 0);
                    var right = ClickId.substring(i + 1);

                    $.ajax({
                      type: "DELETE",
                      url:
                        "http://localhost:3001/tours/" +
                        left +
                        "/path/" +
                        right,

                      success: function (res) {
                        console.log(left + right);
                        setTimeout(function () {
                          location.reload();
                        }, 0001);
                      },
                      error: function (err) {
                        console.log("err", err);
                      },
                    });
                  };
                });
              }
            });
          };
        }
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };
  const showGuide = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/tours",
      dataType: "json",
      encode: true,
      contentType: "application/json",
      success: function (result) {
        var helper = "";
        for (key in result) {
          console.log(result);
          helper = "guide_" + result[key].countryName;
          document.getElementById(helper).onclick = (e) => {
            e.preventDefault();
            var txt = e.target.id;
            txt = txt.slice(6);
            result.map((item) => {
              if (item.countryName == txt) {
                $.ajax({
                  type: "GET",
                  url: "http://localhost:3001/guide/" + item.guide,
                  dataType: "json",
                  encode: true,
                  contentType: "application/json",
                  success: function (ans) {
                    if (ans[0] != null) {
                      var theTextIs = "";
                      theTextIs += ans[0].name;
                      theTextIs += "</br>";
                      theTextIs += ans[0].email;
                      theTextIs += "</br>";
                      theTextIs += ans[0].cellular;
                      document.getElementById("edit").innerHTML = theTextIs;
                      return;
                    }
                  },
                  error: function (err) {
                    console.log("err", err);
                  },
                });
              }
            });
          };
        }
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };
  const showAllGuides = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:3001/guide",
      dataType: "json",
      encode: true,
      contentType: "application/json",
      success: function (result) {
        var theTextIs = "";
        result.forEach((element) => {
          theTextIs += element.name;
          theTextIs += "   ";
          theTextIs += element.email;
          theTextIs += "   ";
          theTextIs += element.cellular;
          theTextIs +=
            "<button id =" +
            "'" +
            "edit_Guide_" +
            element._id +
            "'" +
            ">edit</button>";
          theTextIs +=
            "<button id =" +
            "'" +
            "delete_Guide_" +
            element._id +
            "'" +
            ">delete</button>";
          theTextIs += "</br>";
        });
        document.getElementById("edit").innerHTML = theTextIs;
        result.forEach((el) => {
          helper2 = "delete_Guide_" + el._id;
          document.getElementById(helper2).onclick = (x) => {
            x.preventDefault();
            var ClickId = x.target.id;
            ClickId = ClickId.substring(13);

            $.ajax({
              type: "DELETE",
              url: "http://localhost:3001/guide/" + ClickId,

              success: function (res) {
                setTimeout(function () {
                  location.reload();
                }, 0001);
              },
              error: function (err) {
                console.log("err", err);
              },
            });
          };
        });
        result.forEach((el) => {
          helper2 = "edit_Guide_" + el._id;
          document.getElementById(helper2).onclick = (x) => {
            x.preventDefault();
            var ClickId = x.target.id;
            ClickId = ClickId.substring(11);

            $.ajax({
              type: "GET",
              url: "",
              success: function (res) {
                location.href = "/editGuidee";
                localStorage.setItem("name", ClickId);
              },
              error: function (err) {
                console.log("err", err);
              },
            });
          };
        });
      },
      error: function (err) {
        console.log("err", err);
      },
    });
  };
  Table();
});
