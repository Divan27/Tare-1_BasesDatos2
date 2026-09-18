require("dotenv").config();

const express = require("express");
const cors = require("cors");

const categoriaRoutes = require("./routes/categoriaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    mensaje: "API REST - Tarea 1 Bases de Datos II",
  });
});

app.use("/api/categorias", categoriaRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
