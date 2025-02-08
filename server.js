const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = "data.json";

// Helper function to read JSON file
function readData() {
  if (!fs.existsSync(FILE_PATH)) {
    return [];
  }
  const rawData = fs.readFileSync(FILE_PATH);
  return JSON.parse(rawData);
}

// Helper function to write to JSON file
function writeData(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// API to save user input
app.post("/save", (req, res) => {
  const { name, partnersname, percentage } = req.body;

  // Read existing data
  let data = readData();

  // Add new entry
  data.push({ name, partnersname, percentage, timestamp: new Date() });

  // Write back to file
  writeData(data);

  res.json({ message: "Data saved successfully!", data });
});

// API to retrieve all entries
app.get("/entries", (req, res) => {
  const data = readData();
  res.json(data);
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
