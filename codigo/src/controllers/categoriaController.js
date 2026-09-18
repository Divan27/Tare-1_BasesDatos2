const { sql, getConnection } = require("../config/database");

async function listarCategorias(req, res) {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .execute("dbo.sp_ListarCategorias");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al consultar las categorías",
      error: error.message,
    });
  }
}

async function categoriasConSubcategorias(req, res) {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .execute("dbo.sp_CategoriasConSubcategorias");

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al consultar categorías y subcategorías",
      error: error.message,
    });
  }
}

async function insertarCategoria(req, res) {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        mensaje: "El nombre es obligatorio",
      });
    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("Name", sql.NVarChar(50), name)
      .execute("dbo.sp_InsertarCategoria");

    res.status(201).json({
      mensaje: "Categoría insertada correctamente",
      ProductCategoryID: result.recordset[0].ProductCategoryID,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al insertar la categoría",
      error: error.message,
    });
  }
}

async function actualizarCategoria(req, res) {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        mensaje: "El nombre es obligatorio",
      });
    }

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ProductCategoryID", sql.Int, parseInt(id))
      .input("Name", sql.NVarChar(50), name)
      .execute("dbo.sp_ActualizarCategoria");

    const filas = result.recordset[0].FilasAfectadas;

    if (filas === 0) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada",
      });
    }

    res.status(200).json({
      mensaje: "Categoría actualizada correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al actualizar la categoría",
      error: error.message,
    });
  }
}

async function eliminarCategoria(req, res) {
  try {
    const { id } = req.params;

    const pool = await getConnection();

    const result = await pool
      .request()
      .input("ProductCategoryID", sql.Int, parseInt(id))
      .execute("dbo.sp_EliminarCategoria");

    const filas = result.recordset[0].FilasAfectadas;

    if (filas === 0) {
      return res.status(404).json({
        mensaje: "Categoría no encontrada",
      });
    }

    res.status(200).json({
      mensaje: "Categoría eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      mensaje: "Error al eliminar la categoría",
      error: error.message,
    });
  }
}

module.exports = {
  listarCategorias,
  categoriasConSubcategorias,
  insertarCategoria,
  actualizarCategoria,
  eliminarCategoria,
};
