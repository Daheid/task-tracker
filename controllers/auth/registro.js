import pool from "../../databases/config.js"

const registro = async (req, res, next) => {
  if (req.body === undefined || req.body.nombre.length == 0) {
    return res.status(400).json({ mensaje: "No se recibieron datos." })
  }
  try {
    let nombre = req.body.nombre

    if (nombre === undefined)
      return res
        .status(404)
        .json({ mensaje: "No se encontro el parametro 'nombre'" })

    await pool.connect()

    await duplicado(nombre, res)

    await registrar(nombre, res)
  } catch (err) {
    console.log(err)
  }
}

const duplicado = async (nombre, res) => {
  const query = "SELECT * FROM usuario WHERE nombre_usuario = $1"
  const values = [nombre]
  const consulta = await pool.query(query, values)
  if (consulta.rows.length > 0) {
    return res.status(401).json({ mensaje: "El usuario ya existe." })
  }
}

const registrar = async (nombre, res) => {
  const query = "INSERT INTO usuario (nombre_usuario) VALUES ($1) RETURNING *"
  const values = [nombre]
  const consulta = await pool.query(query, values)
  if (consulta.rows.length > 0)
    return res.status(200).json({ mensaje: "usuario creado con exito" })
}

export default registro
