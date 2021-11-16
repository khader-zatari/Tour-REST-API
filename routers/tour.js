const { json } = require("express");
const fs = require("fs");
const Guide = require("../models/guide");
const Tour = require("../models/tour");

// variables
const dataPath = "./option1.json";

const readFile = (
  callback,
  returnJson = false,
  filePath = dataPath,
  encoding = "utf8"
) => {
  fs.readFile(filePath, encoding, (err, data) => {
    if (err) {
      console.log(err);
    }
    callback(returnJson ? JSON.parse(data) : data);
  });
};

const writeFile = (
  fileData,
  callback,
  filePath = dataPath,
  encoding = "utf8"
) => {
  fs.writeFile(filePath, fileData, encoding, (err) => {
    if (err) {
      console.log(err);
    }

    callback();
  });
};

const always = (res) => {
  // Website you wish to allow to connect

  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);
};

module.exports = {
  get_tours: function (req, res) {
    Tour.find()
      .then((ans) => {
        res.send(ans);
      })
      .catch((e) => res.status(500).send());
  },
  get_tour: function (req, res) {
    Tour.find({ countryName: req.params["id"] })
      .then((ans) => {
        res.send(ans);
      })
      .catch((e) => res.status(500).send());
  },
  create_tour: function (req, res) {
    if (!req.body.countryName) {
      res.send("please enter the country name");
    }
    Tour.find({ countryName: req.body.countryName })
      .then((ans) => {
        if (ans.length != 0) {
          res.send("we have that country");
        } else {
          if (
            req.body.countryName &&
            req.body.start_date &&
            req.body.duration &&
            req.body.price &&
            req.body.guide
          ) {
            ////////in this if validate the guide
            const tour = new Tour(req.body);
            tour
              .save()
              .then((tour) => res.status(201).send(tour))
              .catch((e) => res.status(400).send(e));
          }
        }
      })
      .catch((e) => res.status(500).send());

    // always(res);
    // readFile((data) => {
    //   if (data[req.body.id]) {
    //     res.send("the tour is already created");
    //   } else {
    //     if (
    //       req.body.id &&
    //       req.body.start_date &&
    //       req.body.duration &&
    //       req.body.price &&
    //       req.body.guide.name &&
    //       req.body.guide.email &&
    //       req.body.guide.cellular
    //     ) {
    //       if (true) {
    //         //check the date input and email and the name of the guide and every thing
    //         console.log(req.body);
    //         data[req.body.id] = req.body;
    //         writeFile(JSON.stringify(data, null, 2), () => {
    //           res.status(200).send("new tour added");
    //         });
    //       } else {
    //         res.send("the parameters is not valid");
    //       }
    //     } else {
    //       res.send("problem with the parameters");
    //     }
    //   }
    //   // add the new user
    // }, true);
  },
  update_tour: function (req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["start_date", "duration", "price", "guide"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
    let theID = null;
    Tour.find({ countryName: req.params["id"] })
      .then((ans) => {
        theID = ans[0]._id;
        Tour.findByIdAndUpdate(theID, req.body, {
          new: true,
          runValidators: true,
        })
          .then((tour) => {
            if (!tour) {
              return res.status(404).send();
            } else {
              res.send(tour);
            }
          })
          .catch((e) => res.status(400).send(e));
      })
      .catch((e) => res.status(500).send());
  },
  delete_tour: function (req, res) {
    Tour.find({ countryName: req.params["id"] })
      .then((ans) => {
        Tour.findByIdAndRemove(ans[0]._id)
          .exec()
          .then((tour) => {
            if (!tour) {
              return res.status(404).send();
            } else {
              res.send(tour);
            }
          })
          .catch((e) => res.status(400).send(e));
      })
      .catch((e) => res.status(500).send());

    // always(res);
    // readFile((data) => {
    //   const tourId = req.params["id"];
    //   if (data[tourId]) {
    //     delete data[tourId];

    //     writeFile(JSON.stringify(data, null, 2), () => {
    //       res.status(200).send(`users id:${tourId} removed`);
    //     });
    //   } else {
    //     res.send("the id is not valid");
    //   }
    // }, true);
  },
  create_path: function (req, res) {
    Tour.find({ countryName: req.params["id"] }).then((ans) => {
      // theID = ans[0]._id;
      // console.log(ans);
      ans[0].path.push({
        name: req.body.name,
        country: req.body.country,
      });
      ans[0].save();
      console.log(ans[0].path);

      res.status(201).send("tour");
    });

    // Tour.find({ countryName: req.params["id"] })
    //   .then((ans) => {
    //     if (req.body.name && req.body.country) {
    //       ////////in this if validate the guide
    //       Tour;
    //       const tour = new Tour(req.body);
    //       tour
    //         .save()
    //         .then((tour) => res.status(201).send(tour))
    //         .catch((e) => res.status(400).send(e));
    //     }
    //   })
    //   .catch((e) => res.status(500).send());

    // readFile((data) => {
    //   const tourId = req.params["id"];
    //   if (data[tourId]) {
    //     var helper = {};
    //     helper.name = req.body.name;
    //     helper.country = req.body.country;
    //     var flag = false;
    //     if (data[tourId].path === undefined || data[tourId].path.length == 0) {
    //       data[tourId].path = [];
    //     }
    //     data[tourId].path.forEach((element) => {
    //       if (
    //         element.name == helper.name &&
    //         element.country == helper.country
    //       ) {
    //         flag = true;
    //         res.send("path is existent ");
    //       }
    //     });
    //     if (!flag) {
    //       data[tourId].path.push(helper);

    //       writeFile(JSON.stringify(data, null, 2), () => {
    //         res.status(200).send(`users id:${tourId} site created`);
    //       });
    //     }
    //   } else {
    //     res.send("country id is not valid");
    //   }
    // }, true);
  },
  delete_path: function (req, res) {
    Tour.find({ countryName: req.params["id"] }).then((ans) => {
      let found = false;
      if (req.params["path"] == "ALL") {
        ans[0].path = [];
        ans[0].save();
      }
      ans[0].path.map((item) => {
        if (item.name == req.params["path"]) {
          var index = ans[0].path.indexOf(item);
          ans[0].path.splice(index, 1);
          found = true;
        }
        if (found) {
          ans[0].save();
          res.status(201).send("tour");
        }
      });
    });

    // readFile((data) => {
    //   const tourId = req.params["id"];
    //   if (data[tourId]) {
    //     //var site_name = req.parms["site_name"];
    //     var found = false;
    //     if (req.params["path"] == "ALL") {
    //       data[tourId].path = [];
    //     } else {
    //       data[tourId].path.forEach((element) => {
    //         if (element.name == req.params["path"]) {
    //           var index = data[tourId].path.indexOf(element);
    //           console.log(element);
    //           data[tourId].path.splice(index, 1);
    //           found = true;
    //         }
    //       });

    //       if (!found) {
    //         res.send("name is not valid");
    //       }
    //     }
    //     writeFile(JSON.stringify(data, null, 2), () => {
    //       res.status(200).send(`tour id:${tourId} site deleted`);
    //     });
    //   } else {
    //     res.send("country id is not valid");
    //   }
    // }, true);
  },
  createGuide: function (req, res) {
    const guide = new Guide(req.body);
    guide
      .save()
      .then((guide) => res.status(201).send(guide))
      .catch((e) => res.status(400).send(e));
  },
  getGuide: function (req, res) {
    Guide.find({ _id: req.params["id"] })
      .then((ans) => {
        res.send(ans);
      })
      .catch((e) => res.status(500).send());
  },
  getGuides: function (req, res) {
    Guide.find()
      .then((ans) => {
        res.send(ans);
      })
      .catch((e) => {
        res.status(500).send();
      });
  },
  deleteGuide: function (req, res) {
    //////not good yet
    Guide.find({ _id: req.params["id"] })
      .then((ans) => {
        Guide.findByIdAndRemove(ans[0]._id)
          .exec()
          .then((tour) => {
            if (!tour) {
              return res.status(404).send();
            } else {
              res.send(tour);
            }
          })
          .catch((e) => res.status(400).send(e));
      })
      .catch((e) => res.status(500).send());
  },
  editGuide: function (req, res) {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "cellular"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).send({ error: "Invalid updates!" });
    }
    let theID = null;
    Guide.find({ _id: req.params["id"] })
      .then((ans) => {
        theID = ans[0]._id;
        Guide.findByIdAndUpdate(theID, req.body, {
          new: true,
          runValidators: true,
        })
          .then((guide) => {
            if (!guide) {
              return res.status(404).send();
            } else {
              res.send(guide);
            }
          })
          .catch((e) => res.status(400).send(e));
      })
      .catch((e) => res.status(500).send());
  },
};
