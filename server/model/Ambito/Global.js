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
                cadena.cadena = `Error: No es posible ejecutar más de un EXEC.\nLínea: ${String(_instrucciones[i].linea)} Columna: ${String(_instrucciones[i].columna)}\n`;
                cadena.errores.push({
                    tipo: 'Semántico',
                    error: "No es posible ejecutar más de un EXEC.",
                    linea: _instrucciones[i].linea,
                    columna: _instrucciones[i].columna
                });
                return cadena;
            }

        }
    }
    if (countExec == 0) {
        cadena.cadena = `Error: No se ha encontrado ninguna sentencia EXEC.\n`;
        cadena.errores.push({
            tipo: 'Semántico',
            error: "No se ha encontrado ninguna sentencia EXEC.",
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
                var error = String(mensaje);
                cadena.cadena += error;
                cadena.errores.push({
                    tipo: 'Semántico',
                    error: error.substring(error.indexOf("Error") + 7, error.indexOf("Línea") - 1),
                    linea: error.substring(error.indexOf("Línea") + 7, error.indexOf("Columna") - 1),
                    columna: error.substring(error.indexOf("Columna") + 9),
                });
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.NUEVA_FUNCION) {
            var mensaje = Funcion(_instrucciones[i], _ambito)
            if (mensaje != null) {
                var error = String(mensaje);
                cadena.cadena += error;
                cadena.errores.push({
                    tipo: 'Semántico',
                    error: error.substring(error.indexOf("Error") + 7, error.indexOf("Línea") - 1),
                    linea: error.substring(error.indexOf("Línea") + 7, error.indexOf("Columna") - 1),
                    columna: error.substring(error.indexOf("Columna") + 9),
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
                    var error = String(mensaje.err);
                    cadena.cadena += error;
                    cadena.errores.push({
                        tipo: 'Semántico',
                        error: error.substring(error.indexOf("Error") + 7, error.indexOf("Línea") - 1),
                        linea: error.substring(error.indexOf("Línea") + 7, error.indexOf("Columna") - 1),
                        columna: error.substring(error.indexOf("Columna") + 9),
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
                    var error = String(mensaje.err);
                    cadena.cadena += error;
                    cadena.errores.push({
                        tipo: 'Semántico',
                        error: error.substring(error.indexOf("Error") + 7, error.indexOf("Línea") - 1),
                        linea: error.substring(error.indexOf("Línea") + 7, error.indexOf("Columna") - 1),
                        columna: error.substring(error.indexOf("Columna") + 9),
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
        var error = String(mensaje.err);
        cadena.cadena += error;
        cadena.errores.push({
            tipo: 'Semántico',
            error: error.substring(error.indexOf("Error") + 7, error.indexOf("Línea") - 1),
            linea: error.substring(error.indexOf("Línea") + 7, error.indexOf("Columna") - 1),
            columna: error.substring(error.indexOf("Columna") + 9),
        });
    }
    if (mensaje.errores) {
        for (let i = 0; i < mensaje.errores.length; i++) {
            const err = mensaje.errores[i];
            cadena.errores.push(err);
        }
    }

    return cadena
}

module.exports = Global