const express = require("express");
const app = express();
//node index.js

// Configuração do visor
const ROWS = 5;
const COLS = 41;

// Inicializa radar vazio
let radar = Array(ROWS).fill(".".repeat(COLS));

app.use(express.json());

// Página principal
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
    font-family: monospace;
    padding: 20px;
    background: #111;
    color: #0f0;
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

// Endpoint POST (recebe AS 5 LINHAS)
app.post("/receive", (req, res) => {
    const { pattern } = req.body;

    if (!pattern || typeof pattern !== "string") {
        return res.status(400).send("Dados inválidos");
    }

    const lines = pattern.split("\n");

    if (lines.length !== ROWS) {
        return res.status(400).send("Número de linhas inválido");
    }

    for (let i = 0; i < ROWS; i++) {
        radar[i] = lines[i]
            .padEnd(COLS, ".")
            .substring(0, COLS);
    }

    console.log("Radar atualizado (5 varreduras)");
    res.send("OK");
});

// Servidor
app.listen(5000, "0.0.0.0", () => {
    console.log("Servidor radar ativo na porta 5000");
});