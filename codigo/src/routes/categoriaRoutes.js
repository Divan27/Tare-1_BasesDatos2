const express = require("express");

const {
  listarCategorias,
  categoriasConSubcategorias,
  insertarCategoria,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categoriaController");

const router = express.Router();

router.get("/", listarCategorias);

router.get("/detalle", categoriasConSubcategorias);

router.post("/", insertarCategoria);

router.put("/:id", actualizarCategoria);

router.delete("/:id", eliminarCategoria);

module.exports = router;
