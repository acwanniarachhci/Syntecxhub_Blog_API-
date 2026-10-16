require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const postRoutes = require("./routes/postRoutes");

const app = express();
app.use(express.json());

app.use("/api/posts", postRoutes);

app.get("/", (req, res) => {
  res.send("Blog API is running");
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error("DB connection error:", err));