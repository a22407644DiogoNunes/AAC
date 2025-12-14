const express = require("express");
const app = express();

// Guarda o último padrão enviado pelo ESP
let ultimoPadrao = "Aguardando dados do ESP8266...";

// Middleware para JSON
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
body { font-family: Arial; padding: 20px; background:#111; color:#0f0; }
.box {
    border: 2px solid #0f0;
    padding: 15px;
    font-size: 22px;
    background:#000;
    letter-spacing: 2px;
}
</style>
</head>
<body>
<h1>📡 Radar ESP8266</h1>
<p>Padrão recebido:</p>
<div class="box">${ultimoPadrao}</div>
</body>
</html>
`);
});

// Endpoint POST
app.post("/receive", (req, res) => {
    if (!req.body || !req.body.pattern) {
        return res.status(400).send("JSON inválido");
    }

    ultimoPadrao = req.body.pattern;
    console.log("Recebido:", ultimoPadrao);
    res.send("OK");
});

// Servidor (IMPORTANTE: 0.0.0.0)
app.listen(5000, "0.0.0.0", () => {
    console.log("Servidor ativo na porta 5000");
});