const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const FILE_PATH = "data.json";

// ✅ Read JSON data
function readData() {
  if (!fs.existsSync(FILE_PATH)) return [];
  return JSON.parse(fs.readFileSync(FILE_PATH));
}

// ✅ Write to JSON file
function writeData(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// ✅ API to save data
app.post("/save", (req, res) => {
  const { name, partnersname, percentage } = req.body;
  let data = readData();
  data.push({ name, partnersname, percentage, timestamp: new Date() });
  writeData(data);
  res.json({ message: "Data saved successfully!", data });
});

// ✅ API to fetch all entries
app.get("/entries", (req, res) => {
  res.json(readData());
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
