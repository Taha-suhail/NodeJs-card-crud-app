require("dotenv").config();
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const methodOverride = require("method-override");
const app = express();
const axios = require("axios");
const port = 3000 || process.env.PORT;
const connectDB = require("./db");
connectDB();
const cards = require("./carddb");
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.static("public"));
app.use(expressLayouts);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

//routes
app.get("/", async (req, res) => {
    try {
        const card = await cards.find().sort({createdAt:-1});
        res.render("index", { card });

    } catch (error) {
        console.log(error)
    }
})


app.get("/add-card", (req, res) => {
    res.render("addcard")
})

app.post("/add-card", async (req, res) => {
    const { author, description } = req.body;
    try {
        const response = await axios.get('https://picsum.photos/v2/list?page=1&limit=6&width=800&height=600');
        const images = response.data;

        // Select a random image from the list
        const randomImage = images[Math.floor(Math.random() * images.length)];
        const imgurl =   randomImage.download_url.replace(/\/\d+\/\d+\/\d+/, `/${randomImage.id}/300/300`);
        // console.log(imgurl);
        const newCard = new cards({
            imgurl,
            author,
            description,
        });
        await newCard.save();
        res.redirect("/");
    } catch (error) {
        console.log(error);
    }
})
app.get("/viewcard/:id",async(req,res)=>{
    const cardId = req.params.id;
    try {
        const userCard = await cards.findById({_id:cardId});
        res.render("viewcard",{card:userCard});
    } catch (error) {
        console.log(error);
    }
   
})
app.put("/viewcard/:id", async (req, res) => {
    try {
      await cards.findByIdAndUpdate(
        req.params.id,
        {
          author: req.body.author,
          description: req.body.description,
          createdAt: Date.now(),
        },
        { new: true } // This option returns the updated document
      );
      res.redirect("/");
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });

  app.delete("/viewcard/delete/:id", async (req, res) => {
    try {
      const result = await cards.deleteOne({ _id: req.params.id });
      
      if (result.deletedCount === 1) {
        // Successfully deleted one document
        res.redirect("/");
      } else {
        // No document found with the given ID
        res.status(404).send("Not Found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  });
  
app.listen(port, () => {
    console.log(`the port is running at ${port}`);
})