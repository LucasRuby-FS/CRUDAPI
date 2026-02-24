const express = require("express");
const router = express.Router();

const Bear = require("../models/bear");

//RESTFUL Endpoints
//GET, POST, PATCH, DELETE

const getBear = async (req, res, next) => {
  let bears;
  try {
    bears = await Bear.findById(req.params.id);
    if (bears === null) {
      return res.status(404).json({ message: "Bear not found" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.bears = bears;
  next();
};

//GET ALL
router.get("/", async (req, res) => {
  try {
    const bears = await Bear.find();
    res.json(bears);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

///GET ONE
router.get("/:id", getBear, async (req, res) => {
  res.json(res.bears);
});

//POST CREATE
router.post("/", async (req, res) => {
  console.log("post body recieved:", req.body);
  const bears = new Bear({
    name: req.body.name,
    breed: req.body.breed,
    gender: req.body.gender,
  });
  try {
    const newBear = await bears.save();
    res.status(201).json(newBear);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//PATCH UPDATE
router.patch("/:id", getBear, async (req, res) => {
  if (req.body.name != null) {
    res.bears.name = req.body.name;
  }
  if (req.body.breed != null) {
    res.bears.breed = req.body.breed;
  }
  if (req.body.gender != null) {
    res.bears.gender = req.body.gender;
  }
  try {
    const updatedBear = await res.bears.save();
    res.json(updatedBear);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//DELETE
router.delete("/:id", getBear, async (req, res) => {
  try {
    await Bear.deleteOne({ _id: res.bears._id });
    res.json({ message: "Removed Bear" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;
