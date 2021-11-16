const express = require("express"),
tourRoutes = require("./tour");

var router = express.Router();

router.get("/tours", tourRoutes.get_tours); //read
router.get("/tours/:id", tourRoutes.get_tour); //read
router.post("/tours", tourRoutes.create_tour); //create
router.put("/tours/:id", tourRoutes.update_tour); //update
router.delete("/tours/:id", tourRoutes.delete_tour); //delete
router.post("/tours/:id/path", tourRoutes.create_path); //create
router.delete("/tours/:id/path/:path", tourRoutes.delete_path); //delete
router.get("/guide", tourRoutes.getGuides); 
router.get("/guide/:id", tourRoutes.getGuide); 
router.post("/guide", tourRoutes.createGuide); 
router.delete("/guide/:id", tourRoutes.deleteGuide); 
router.put("/guide/:id" , tourRoutes.editGuide); 


module.exports = router;
