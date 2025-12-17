//node index.js

const express = require("express");
const app = express();

const ROWS = 5;
const COLS = 41;

let radar = Array.from({ length: ROWS }, () => ".".repeat(COLS).split(""));

app.use(express.json());

app.get("/", (req, res) => {
  const display = radar.slice().reverse().map(row => row.join("")).join("\n");
  res.send(`
<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<title>Radar ESP8266</title>
<meta http-equiv="refresh" content="2">
<style>
body { background: #111; color: #0f0; font-family: monospace; padding: 20px; }
pre { border: 2px solid #0f0; padding: 20px; font-size: 18px; background:#000; }
</style>
</head>
<body>
<h1>📡 Radar ESP8266 (2D)</h1>
<pre>${display}</pre>
<p>Última atualização: ${new Date().toLocaleTimeString()}</p>
</body>
</html>
`);
});

app.post("/receive", (req, res) => {
  const { pattern } = req.body;
  if (!pattern || typeof pattern !== "string") {
    return res.status(400).send("Bad Request");
  }

  const lines = pattern.trim().split("\n");
  if (lines.length !== ROWS) {
    return res.status(400).send("Linhas inválidas");
  }

  for (let i = 0; i < ROWS; i++) {
    if (lines[i].length >= COLS) {
      radar[i] = lines[i].substring(0, COLS).split("");
    } else {
      radar[i] = lines[i].padEnd(COLS, ".").split("");
    }
  }

  console.log("Radar atualizado");
  res.send("OK");
});

app.listen(5000, "0.0.0.0", () => console.log("Servidor na porta 5000"));