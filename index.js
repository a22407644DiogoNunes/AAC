//node index.js

const express = require("express");
const app = express();

const ROWS = 5;
const COLS = 41;

let radar = Array.from({ length: ROWS }, () =>
  ".".repeat(COLS)
);

app.use(express.json());

// Página
app.get("/", (req, res) => {
  res.send(`
<!DOCTYPE html>
<html lang="pt">
<head>
<meta charset="UTF-8">
<title>Radar ESP8266</title>
<meta http-equiv="refresh" content="1">
<style>
body {
  background: #111;
  color: #0f0;
  font-family: monospace;
  padding: 20px;
}
pre {
  border: 2px solid #0f0;
  padding: 15px;
  font-size: 16px;
}
</style>
</head>
<body>

<h1>📡 Radar ESP8266 (2D)</h1>

<pre>
${[...radar].reverse().join("\n")}
</pre>

</body>
</html>
`);
});

// Recebe radar
app.post("/receive", (req, res) => {
  const { pattern } = req.body;
  if (!pattern) return res.sendStatus(400);

  const lines = pattern.split("\n");
  if (lines.length !== ROWS) return res.sendStatus(400);

  for (let i = 0; i < ROWS; i++) {
    radar[i] = lines[i].padEnd(COLS, ".").substring(0, COLS);
  }

  console.log("Radar atualizado");
  res.send("OK");
});

app.listen(5000, "0.0.0.0", () =>
  console.log("Radar online na porta 5000")
);