const express = require('express');
const router = express.Router();
const MenuItem = require("../models/Menu");

const bodyParser = require("body-parser");
router.use(bodyParser.json());

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const menuItems = new MenuItem(data);
    const response = await menuItems.save();

    console.log("Data is saved Successfully");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET method for menuitems

router.get("/", async (req, res) => {
  try {
    const data = await MenuItem.find();
    console.log("Data is fetched Successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get('/:tasteType', async(req,res)=>{
    try {
      const tasteType = req.params.tasteType;
      // validation
      if (tasteType== 'Spicy' || tasteType == 'Sweet' || tasteType=='Sour'){
   
      const response = await MenuItem.find({taste: tasteType});
      console.log("data is fetched");
      res.status(200).json(response);
      

      }else {
        res.status(404).json({error: 'Invalid taste type'})
      }

    } catch (error) {
       console.log(error);
       res.status(500).json({error: "Internal server error"});
       
    }
})

// PUT method to update data
router.put('/:id',async(req,res)=>{
    try {
      const menuItemsID = req.params.id;
      const menuItemsUpdatedData = req.body;
      const response = await MenuItem.findByIdAndUpdate(menuItemsID,menuItemsUpdatedData,{
         new:true,
         runValidators: true
      })

      if (!response){
        res.status(404).json({error: 'Inavalid id type'})
      }
      console.log('Data updated in menu successfully');
      res.status(200).json(response);

    } catch (error) {
      console.log(error);
      res.status(500).json({error: "Internal server error"});
    }
})

// DELETE method to delete data

router.delete('/:id',async(req,res)=>{
   try {
    const menuItemsID = req.params.id;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(menuItemsID);
  

    if (!menuItemsID){
      res.status(404).json({error: 'Inavalid id type'})
    }
    console.log("data deleted successfully");
    
      res.status(200).json(deletedMenuItem);

   } catch (error) {
    console.log(error);
      res.status(500).json({error: "Internal server error"});
   }
})
// hello ji
module.exports = router;