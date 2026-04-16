const express = require("express");
const si = require("systeminformation");
const { exec } = require("child_process");

const app = express();
app.use(express.json());

app.get("/api/info", async (req, res) => {
  const cpu = await si.cpu();
  const mem = await si.mem();
  const os = await si.osInfo();
  const time = new Date();

  res.json({
    time: time.toLocaleString(),
    os: os.distro + " " + os.release,
    cpu: cpu.manufacturer + " " + cpu.brand,
    ram: (mem.used / 1024 / 1024).toFixed(0) + "MB",
    totalRam: (mem.total / 1024 / 1024).toFixed(0) + "MB"
  });
});

// CONTROL BUTTON
app.post("/start", (req, res) => {
  exec("node bot.js &");
  res.send("Started");
});

app.post("/stop", (req, res) => {
  exec("pkill node");
  res.send("Stopped");
});

app.post("/restart", (req, res) => {
  exec("pkill node && node bot.js &");
  res.send("Restarted");
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server jalan di http://localhost:3000");
});
