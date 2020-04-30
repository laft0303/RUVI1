const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql');
const bodyParser = require('body-parser');

const cors = require('cors');

// Se agrega la librería para habilitar cors
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
//app.use(bodyParser.json({ extended: true, limit: '10mb' }));
app.use(bodyParser.json());
//Parámetros de la conexión a la base de datos
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345",
    database: "ruvi",
    port: 3300,
    multipleStatements: true
});

//app.listen(3300, function() {
//   console.log('Example app listening on port 8000!');
//});
//Realizar la conexión a la base de datos
db.connect(function(error) {
    if (error)
        console.log(error);
    else
        console.log(`Base de datos conectada!`);
});

/***************************************************
 * Comienzo de servicios    *
 **************************************************/

app.get('/', function(req, res) {
    console.log('Página de Inicio ');
    res.send("Bienvenidos al servidor <strong> ruvi </strong>");
});

/*************************************************
 * Usuarios
 * ***********************************************/
app.get('/ruvi/login/:usuario/:contrasena', (req, res) => {
    const usuario = req.params.usuario;
    const contrasena = req.params.contrasena;
    const sql = `SELECT id_rol,usuario,contrasena FROM registro_usuario WHERE usuario='${usuario}'and contrasena='${contrasena}';`;
    const query = db.query(sql, (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                console.log(result);
                const [data] = result;
                res.json(data)
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    });
})



/********************
 *  
 MP_Usuario
 * 
 ********************/

// Manejo de rutas select usuario
app.get('/ruvi/vendedor', (req, res) => {
        console.log('Consultar datos del vendedor');
        var query = db.query('select * from vendedor', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    // Manejo de rutas select usuario id
app.get('/ruvi/vendedor/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM vendedor WHERE id_datos='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    //Agregar  usuario 
app.post('/ruvi/vendedor', (req, res) => {
    const dato = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        edad: req.body.edad,
        sexo: req.body.sexo,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        correo: req.body.correo,
        discapacidad: req.body.discapacidad,
        desplazado: req.body.desplazado,

    };

    const sql = `INSERT INTO vendedor SET nombres='${dato.nombres}',
                                              apellidos='${dato.apellidos}',
                                              edad='${dato.edad}',
                                              sexo='${dato.sexo}',
                                              direccion='${dato.direccion}',
                                              telefono='${dato.telefono}',
                                              correo='${dato.correo}',  
                                              discapacidad='${dato.discapacidad}',
                                              desplazado='${dato.desplazado}'`;
    db.query(sql, (error, result) => {
        if (error) {
            res.json({ error: error })
        } else {
            res.json(result)
        }
    });
})

//Actualizar usuario
app.put('/ruvi/vendedor:id', (req, res) => {
        const id = req.params.id;

        const dato = {
            nombres: req.body.nombres,
            apellidos: req.body.apellidos,
            edad: req.body.edad,
            sexo: req.body.sexo,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            correo: req.body.correo,
            discapacidad: req.body.discapacidad,
            desplazado: req.body.desplazado,

        };
        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE vendedor SET ${sets.join(', ')} WHERE id_datos='${id}';`;
        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    //Eliminar usuario
app.delete('/ruvi/vendedor/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM vendedor WHERE id_datos = '${id}';`;
    const query = db.query(sql, (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                res.json(result)
            }
        } catch (error) {
            res.json({ error: error.message })
        }

    });

})

/********************
 *  
 MP_guardar_registro
 * 
 ********************/

// Manejo de rutas select guardar registro
app.get('/ruvi/registros', (req, res) => {
        console.log('Consultar datos guardar los registros');
        var query = db.query('select * from registros', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    // Manejo de rutas select guardar registros id
app.get('/ruvi/registros/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM registros WHERE id_guardar_registro='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    //Agregar  guardar registros 
app.post('/ruvi/registros', (req, res) => {
    const dato = {
        id_registrodoc: req.body.id_registrodoc,
        id_datos: req.body.id_datos,
        id_niveledu: req.body.id_niveledu,
        id_nucleofam: req.body.id_nucleofam,
        id_saludper: req.body.id_saludper,
        id_viviendaper: req.body.id_viviendaper,
        id_tiempoinf: req.body.id_tiempoinf,
        id_sitioinf: req.body.id_sitioinf,
    };

    const sql = `INSERT INTO registros SET id_registrodoc='${dato.id_registrodoc}',
                                                  id_datos='${dato.id_datos}',
                                                  id_niveledu='${dato.id_niveledu}',
                                                  id_nucleofam='${dato.id_nucleofam}',
                                                  id_saludper='${dato.id_saludper}',
                                                  id_viviendaper='${dato. id_viviendaper}',
                                                  id_tiempoinf='${dato. id_tiempoinf}',
                                                  id_sitioinf='${dato. id_sitioinf}'`;

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ error: error })
        } else {
            res.json(result)
        }
    });
})

//Actualizar guardar registro
app.put('/ruvi/registros:id', (req, res) => {
        const id = req.params.id;

        const dato = {
            id_registrodoc: req.body.id_registrodoc,
            id_datos: req.body.id_datos,
            id_niveledu: req.body.id_niveledu,
            id_nucleofam: req.body.id_nucleofam,
            id_saludper: req.body.id_saludper,
            id_viviendaper: req.body.id_viviendaper,
            id_tiempoinf: req.body.id_tiempoinf,
            id_sitioinf: req.body.id_sitioinf,
        };
        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE registros SET ${sets.join(', ')} WHERE id_guardar_registro='${id}';`;
        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    //Eliminar guardar registro
app.delete('/ruvi/registros/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM registros WHERE id_guardar_registro = '${id}';`;
    const query = db.query(sql, (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                res.json(result)
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    });
});


/**********
 * 
 MP_roles
 *
 **********/

// Manejo de rutas select roles
app.get('/ruvi/rol', (req, res) => {
        console.log('Consultar datos de los roles');
        var query = db.query('select * from rol', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    // Manejo de rutas select roles id
app.get('/ruvi/rol/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM rol WHERE id_rol='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    // Agregar roles
app.post('/ruvi/rol', (req, res) => {
        const dato = req.body

        const sql = `INSERT INTO rol (descripcion)
  values ('${dato.descripcion}')`;

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    //Actualizar roles
app.put('/ruvi/rol', (req, res) => {

        const dato = req.body

        const sql = `UPDATE rol SET id_rol= '${dato.descripcion}'
          WHERE id_rol= '${dato.descripcion}';`;

        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    //Eliminar roles
app.delete('/ruvi/rol/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM rol WHERE id_rol = '${id}';`;
    const query = db.query(sql, (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                res.json(result)
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    });
});



/*****
 * 
 MP_registro_documento 
 * 
 ****/

// manejo de rutas select registro de documentos
app.get('/ruvi/documento', (req, res) => {
    console.log('Consultar datos de  los documentos');
    var query = db.query('select * from documento', (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                console.log(result);
                res.json(result)
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    });
})

//manejo de rutas select registro de documentos id
app.get('/ruvi/documento/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM documento WHERE id_registrodoc='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    //Agregar datos 
app.post('/ruvi/documento', (req, res) => {
    const dato = {
        tipo_documento: req.body.tipo_documento,
        numero_documento: req.body.numero_documento,
        registro_rivi: req.body.registro_rivi,
    };

    const sql = `INSERT INTO documento SET tipo_documento='${dato.tipo_documento}',
                                                  numero_documento='${dato.numero_documento}',
                                                  registro_rivi='${dato.registro_rivi}'`;

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ error: error })
        } else {
            res.json(result)
        }
    });
})

//Actualizar registros de documentos
app.put('/ruvi/documento:id', (req, res) => {
    const id = req.params.id;

    const dato = {
        tipo_documento: req.body.tipo_documento,
        numero_documento: req.body.numero_documento,
        registro_rivi: req.body.registro_rivi,

    };
    let sets = [];
    for (i in dato) {
        if (dato[i] || dato[i] == 0) {
            sets.push(`${i}='${dato[i]}'`);
        }
    }

    const sql = `UPDATE documento SET ${sets.join(', ')} WHERE id_registrodoc='${id}';`;
    console.log(sql);

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ error: error })
        } else {
            res.json(result)
        }
    });
})

//Eliminar registros de documentos
app.delete('/ruvi/documento/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM documento WHERE id_registrodoc = '${id}';`;
    const query = db.query(sql, (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                res.json(result)
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    });
});

/*****
 * 
 MP_registro-usuarios   
 * 
 ****/
// Manejo de rutas select registro usuarios
app.get('/ruvi/registro-usuario', (req, res) => {
        console.log('Consultar datos de  los usuarios');
        var query = db.query('select * from registro_usuario', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    // Manejo de rutas select registro usuarios id
app.get('/ruvi/registro-usuario/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM registro_usuario WHERE id_regisusu='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    //Agregar registro de usuarios 
app.post('/ruvi/registro-usuario', (req, res) => {
    const dato = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        sexo: req.body.sexo,
        telefono: req.body.telefono,
        correo: req.body.correo,
        usuario: req.body.usuario,
        contrasena: req.body.contrasena,
        id_rol: 1,

    };

    const sql = `INSERT INTO registro_usuario SET nombre='${dato.nombre}',
                                                  apellido='${dato.apellido}',
                                                  edad='${dato.edad}',
                                                  sexo='${dato.sexo}',
                                                  telefono='${dato.telefono}',
                                                  correo='${dato.correo}',
                                                  usuario='${dato.usuario}',
                                                  contrasena='${dato.contrasena}',
                                                  id_rol='${dato.id_rol}'`;

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ error: error })
        } else {
            res.json(result)
        }
    });
})

//Actualizar registro de usuarios
app.put('/ruvi/registro-usuario:id', (req, res) => {
        const id = req.params.id;

        const dato = {
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            edad: req.body.edad,
            sexo: req.body.sexo,
            telefono: req.body.telefono,
            correo: req.body.correo,
            usuario: req.body.usuario,
            contraseña: req.body.contraseña,
            id_rol: req.body.id_rol,

        };
        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE registro_usuario SET ${sets.join(', ')} WHERE id_registrousu='${id}';`;
        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    //Eliminar registro de usuarios
app.delete('/ruvi/registro-usuario/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM registro_usuario WHERE id_registrousu = '${id}';`;
    const query = db.query(sql, (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                res.json(result)
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    });
});

/*****
 * 
 MP_salud 
 * 
 ****/

// Manejo de rutas select salud
app.get('/ruvi/eps', (req, res) => {
        console.log('Consultar datos de la salud');
        var query = db.query('select * from eps', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    // Manejo de rutas select salud id
app.get('/ruvi/eps/:id', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM eps WHERE id_saludper='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    //Agregar salud 
app.post('/ruvi/eps', (req, res) => {
    const dato = {
        nombre_eps: req.body.nombre_eps,
        regimen_afiliacion: req.body.regimen_afiliacion,
    };

    const sql = `INSERT INTO eps SET nombre_eps='${dato.nombre_eps}',
                                       regimen_afiliacion='${dato.regimen_afiliacion}'`;

    db.query(sql, (error, result) => {
        if (error) {
            res.json({ error: error })
        } else {
            res.json(result)
        }
    });
})

//Actualizar salud
app.put('/ruvi/eps:id', (req, res) => {
        const id = req.params.id;

        const dato = {
            nombre_eps: req.body.nombre_eps,
            regimen_afiliacion: req.body.regimen_afiliacion,
        };
        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE eps SET ${sets.join(', ')} WHERE id_saludper='${id}';`;
        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    //Eliminar salud
app.delete('/ruvi/eps/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM eps WHERE id_saludper = '${id}';`;
    const query = db.query(sql, (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                res.json(result)
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    });
});

/*****
 * 
 MP_sitio-labor 
 * 
 ****/

// Manejo de rutas select sitio labor
app.get('/ruvi/sitio', (req, res) => {
        console.log('Consultar datos del sitio donde labora');
        var query = db.query('select *  from sitio', (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    res.json(result)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    // Manejo de rutas select sitio de labor id
app.get('/ruvi/sitio/:id-sitioinf', (req, res) => {
        const id = req.params.id;
        const sql = `SELECT * FROM sitio WHERE id_sitioinf='${id}';`;
        const query = db.query(sql, (error, result) => {
            try {
                if (error) {
                    throw error;
                } else {
                    console.log(result);
                    const [data] = result;
                    res.json(data)
                }
            } catch (error) {
                res.json({ error: error.message })
            }
        });
    })
    //Agregar sitio de labor 
app.post('/ruvi/sitio', (req, res) => {
    const dato = {
        direccion: req.body.direccion,
        producto: req.body.producto,
        tiempoInformal: req.body.tiempoInformal,

    };

    const sql = `INSERT INTO sitio SET direccion='${dato.direccion}',
                                                  producto='${dato.producto}',
                                                  tiempoInformal='${dato.tiempoInformal}'`;
    db.query(sql, (error, result) => {
        if (error) {
            res.json({ error: error })
        } else {
            res.json(result)
        }
    });
})

//Actualizar sitio de labor
app.put('/ruvi/sitio/:id', (req, res) => {
        const id = req.params.id;

        const dato = {
            direccion: req.body.direccion,
            producto: req.body.producto,
            tiempoInformal: req.body.tiempoInformal,

        };
        let sets = [];
        for (i in dato) {
            if (dato[i] || dato[i] == 0) {
                sets.push(`${i}='${dato[i]}'`);
            }
        }

        const sql = `UPDATE sitio SET ${sets.join(', ')} WHERE id_sitioinf='${id}';`;
        console.log(sql);

        db.query(sql, (error, result) => {
            if (error) {
                res.json({ error: error })
            } else {
                res.json(result)
            }
        });
    })
    //Eliminar sitio de labor
app.delete('/ruvi/sitio/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM sitio WHERE id_sitioinf = '${id}';`;
    const query = db.query(sql, (error, result) => {
        try {
            if (error) {
                throw error;
            } else {
                res.json(result)
            }
        } catch (error) {
            res.json({ error: error.message })
        }
    });
});




app.listen(PORT, function() {
    console.log(`Server running at port ${PORT}`);
});