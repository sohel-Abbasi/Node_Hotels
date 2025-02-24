const express = require("express");
const router = express.Router();

const bodyParser = require("body-parser");
router.use(bodyParser.json());

const Person = require("../models/Person");
// POST route to add a person
router.post("/", async (req, res) => {
  try {
    const data = req.body; // Assuming the request body contains the person data
    // create a new Person document using the Mongoose model
    const newPerson = new Person(data);

    // save the new person to the database

    const response = await newPerson.save();
    console.log("data saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method to get the person
router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    //Person.find() will return all collection details
    console.log("data fetched successfully!");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method with parameter
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    // create a validation to prevent unneccessory input parameter
    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(404).json({ erro: "Invalid work  " });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT method to update records
router.put("/:id", async (req, res) => {
  try {
    // extract id from URL parameter
    const personID = req.params.id;
    //req.body store data that can be passed by client
    const updatedPersonData = req.body;

    const response = await Person.findByIdAndUpdate(
      personID,
      updatedPersonData,
      {
        new: true, // Return the upload document
        runValidators: true,
        //  run mongoose validation
      }
    );

    if (!response) {
      return res.status(404).json({ error: "Person not found" });
    }
    console.log("data updated successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personID = req.params.id;

    const deletedPerson = await Person.findByIdAndDelete(personID);

    if (!personID) {
      return res.status(404).json({ error: "Person not found" });
    }

    console.log("data Deleted successfully");
    res.status(200).json(deletedPerson);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
