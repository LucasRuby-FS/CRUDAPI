require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const app = express();
const bearRouter = require("./routes/bears");
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 8000;

const DATABASE_URL = process.env.DATABASE_URL;

mongoose
  .connect(DATABASE_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once(`open`, () => console.log("database connection worked"));

app.use('/api/v1/bears', bearRouter);

app.use(express.static(path.join(__dirname, "../reactjs/build")));


app.get('*path', (req, res) => {
  res.sendFile(path.join(__dirname, "../reactjs/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
