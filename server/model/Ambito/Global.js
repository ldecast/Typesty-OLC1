const TIPO_INSTRUCCION = require("../../controller/Enum/TipoInstrucciones")
const Asignacion = require("../../controller/Instruccion/Asignacion")
const Declaracion = require("../../controller/Instruccion/Declaracion")
const Metodo = require("../../controller/Instruccion/Metodo")
const Funcion = require("../../controller/Instruccion/Funcion")
const Exec = require("../../controller/Instruccion/Exec")

function Global(_instrucciones, _ambito) {
    var cadena = { cadena: "", errores: [] };

    // Verificando 1 Exec
    var countExec = 0;
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC) {
            countExec++;
            if (countExec > 1) {
                cadena.errores.push({
                    tipo: 'Semántico',
                    error: "Error: No es posible ejecutar más de un EXEC.",
                    linea: _instrucciones[i].linea,
                    columna: _instrucciones[i].columna
                });
                return cadena;
            }

        }
    }
    if (countExec == 0) {
        cadena.errores.push({
            tipo: 'Semántico',
            error: "Error: No se ha encontrado ninguna sentencia EXEC.",
            linea: "-",
            columna: "-"
        });
        return cadena;
    }


    // Declarar métodos y funciones
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.NUEVO_METODO) {
            var mensaje = Metodo(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena.cadena += mensaje + '\n'
                cadena.errores.push({
                    tipo: 'Semántico',
                    error: mensaje,
                    linea: "-",
                    columna: "-"
                });
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.NUEVA_FUNCION) {
            var mensaje = Funcion(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena.cadena += mensaje + '\n'
                cadena.errores.push({
                    tipo: 'Semántico',
                    error: mensaje,
                    linea: "-",
                    columna: "-"
                });
            }
        }
    }

    // Declarar y asignar variables
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION) {
            var mensaje = Declaracion(_instrucciones[i], _ambito)
            if (mensaje) {
                if (mensaje.cadena)
                    cadena.cadena += mensaje.cadena
                if (mensaje.err) {
                    cadena.cadena += mensaje.err
                    cadena.errores.push({
                        tipo: 'Semántico',
                        error: mensaje.err,
                        linea: "-",
                        columna: "-"
                    });
                }
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var mensaje = Asignacion(_instrucciones[i], _ambito)
            if (mensaje) {
                if (mensaje.cadena)
                    cadena.cadena += mensaje.cadena
                if (mensaje.err) {
                    cadena.cadena += mensaje.err
                    cadena.errores.push({
                        tipo: 'Semántico',
                        error: mensaje.err,
                        linea: "-",
                        columna: "-"
                    });
                }
            }
        }
    }

    // Ejecutar EXEC
    var instruccion;
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC) {
            instruccion = _instrucciones[i];
            break;
        }
    }
    var mensaje = Exec(instruccion, _ambito)
    if (mensaje.cadena)
        cadena.cadena += mensaje.cadena
    if (mensaje.err) {
        cadena.cadena += mensaje.err
        cadena.errores.push({
            tipo: 'Semántico',
            error: mensaje.err,
            linea: "-",
            columna: "-"
        });
    }
    if (mensaje.errores) {
        for (let i = 0; i < mensaje.errores.length; i++) {
            const err = mensaje.errores[i];
            cadena.errores.push(err);
        }
    }

    // console.log(cadena.errores, 677777)
    return cadena
}

module.exports = Global