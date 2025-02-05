const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
console.log(process.env.DB_URL);

main()
  .then(()=> console.log("mongodb is successfully connected"))
  .catch(err => console.error(err));

async function main() {
    await mongoose.connect(process.env.DB_URL);
  
    app.get("/", (req, res) => {
      res.send("Capstone Project site is running....!")
    })
}



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})