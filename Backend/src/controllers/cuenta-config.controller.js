const pool = require("../config/db.js");
const bcrypt = require("bcrypt");
const {
    obtenerIdValido,
    emailValido,
    passwordValida,
    normalizarTexto,
    normalizarEmail,
    normalizarTelefono,
} = require("../utils/validators.js");


async function obtenerPerfil(req, res){
    try {

    const id_usuario = obtenerIdValido(req.userId);

    if (!id_usuario) {
        return res.status(401).json({
            ok: false,
            error: "Usuario no autenticado",
        });
    }

    const [perfilRows] = await pool.query(
        `SELECT 
        nombre,
        email,
        rol
        FROM usuarios
        WHERE id_usuario = ?`,
        [id_usuario]
    );

    if (perfilRows.length === 0) {
        return res.status(404).json({
            ok: false,
            error: "Perfil no encontrado",
        });
    }

    return res.json({
        ok: true,
        perfil: perfilRows[0],
    });

    } catch (error) {
        console.error("CUENTA-CONFIG ERROR >>>", error);
        return res.status(500).json({
            ok: false,
            error: "Error interno del servidor",
        });
    }
}

async function actualizarPerfil(req, res){
  try {
    const id_usuario = obtenerIdValido(req.userId);

    if (!id_usuario) {
      return res.status(401).json({
        ok: false,
        error: "Usuario no autenticado",
      });
    }

    const { nombre, email} = req.body;

    const nombreLimpio = normalizarTexto(nombre);
    const emailLimpio = normalizarEmail(email);


    if (!nombreLimpio || nombreLimpio.length < 2) {
      return res.status(400).json({
        ok: false,
        error: "Nombre inválido",
      });
    }

    if (!emailValido(emailLimpio)) {
      return res.status(400).json({
        ok: false,
        error: "Email inválido",
      });
    }

    await pool.query(
      `UPDATE usuarios
       SET nombre = ?, email = ?
       WHERE id_usuario = ?`,
      [nombreLimpio, emailLimpio, id_usuario],
    );

    return res.json({
      ok: true,
      message: "Perfil actualizado correctamente",
    });
    
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        ok: false,
        error: "El correo ya está en uso",
      });
    }

    console.error("CUENTA-CONFIG ERROR >>>", error);

    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor",
    });
  }
}

async function cambiarPassword(req, res){
  try{

  const id_usuario = obtenerIdValido(req.userId);
  const { passwordActual, passwordNueva } = req.body;

  if (!id_usuario) {
    return res.status(401).json({
      ok: false,
      error: "Usuario no autenticado",
    });
  }

  if (!passwordValida(passwordActual) || !passwordValida(passwordNueva)){
    return res.status(400).json({
      ok: false,
      error: "Password invalida"
    })
  }
  
  if (passwordActual === passwordNueva) {
  return res.status(400).json({
      ok: false,
      error: "La nueva contraseña debe ser diferente a la actual",
    });
  }

  const [rows] = await pool.query(`
    SELECT password
    FROM usuarios
    WHERE id_usuario = ?`,
    [id_usuario]);
  
  if (rows.length === 0) {
    return res.status(404).json({
      ok: false,
      error: "Usuario no encontrado",
    });
  }

  const passwordHash = rows[0].password;
  
  const coincide = await bcrypt.compare(passwordActual, passwordHash);

  if (!coincide){
    return res.status(400).json({
      ok: false,
      error: "Password incorrecta"
    });
  }

  const nuevaHash = await bcrypt.hash(passwordNueva, 10);

  await pool.query(`
    UPDATE usuarios
    SET password = ?
    WHERE id_usuario = ? 
    `, [nuevaHash, id_usuario])

  return res.status(200).json({
    ok: true,
    message: "Password actualizada correctamente"
  })

  } catch (error){
    console.error("CUENTA-CONFIG ERROR >>>", error);

    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor",
    });
  }
}

async function obtenerDireccion(req, res){
  try {
    const id_usuario = obtenerIdValido(req.userId);

    if (!id_usuario) {
      return res.status(401).json({
        ok: false,
        error: "Usuario no autenticado",
      });
    }

    const [direccionRows] = await pool.query(
      `
      SELECT 
        nombre_recibe,
        telefono,
        provincia,
        municipio,
        sector,
        direccion_detallada,
        referencia
      FROM direcciones_envio
      WHERE usuario_id = ?
      LIMIT 1
      `,
      [id_usuario]
    );

    return res.status(200).json({
      ok: true,
      direccion: direccionRows[0] || null,
    });
  } catch (error) {
    console.error("CUENTA-CONFIG ERROR >>>", error);

    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor",
    });
  }
}

async function agregarDireccion(req, res){
  try {
    const id_usuario = obtenerIdValido(req.userId)
    const { nombreReceptor, telefonoReceptor, provincia, municipio, sector, direccion, referencia} = req.body
    const telefonoNormalizado = normalizarTelefono(telefonoReceptor)

    if (!id_usuario){
      return res.status(401).json({
        ok: false,
        error: "Usuario no autenticado"
      });
    }

    if (!nombreReceptor || !telefonoNormalizado || !provincia || !municipio || !sector || !direccion){
    return res.status(400).json({
        ok: false,
        error: "Faltan datos obligatorios de la dirección",
      });
    }

    const [resultado] = await pool.query(`
      INSERT INTO direcciones_envio (
      usuario_id,
      nombre_recibe,
      telefono,
      provincia,
      municipio,
      sector,
      direccion_detallada,
      referencia
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        nombre_recibe = VALUES(nombre_recibe),
        telefono = VALUES(telefono),
        provincia = VALUES(provincia),
        municipio = VALUES(municipio),
        sector = VALUES(sector),
        direccion_detallada = VALUES(direccion_detallada),
        referencia = VALUES(referencia)
      ` [nombreReceptor, telefonoNormalizado, provincia, municipio, sector, direccion, referencia, id_usuario])
    
    if (resultado.affectedRows === 0){
      return res.status(404).json({
        ok: false,
        error: "No existe una dirección para actualizar",
      });
    }

    return res.status(200).json({
      ok: true,
      message: "Direccion agregada correctamente"
    })
  } catch(error) {
    console.error("CUENTA-CONFIG ERROR >>>", error);
    return res.status(500).json({
      ok: false,
      error: "Error interno del servidor"
    })
  }
}

module.exports = {
  obtenerPerfil,
  actualizarPerfil,
  cambiarPassword,
  obtenerDireccion,
  agregarDireccion
};