const TIPO_INSTRUCCION = require("../../controller/Enum/TipoInstrucciones")
const Asignacion = require("../../controller/Instruccion/Asignacion")
const Declaracion = require("../../controller/Instruccion/Declaracion")
const Metodo = require("../../controller/Instruccion/Metodo")
const Funcion = require("../../controller/Instruccion/Funcion")
const Exec = require("../../controller/Instruccion/Exec")

function Global(_instrucciones, _ambito) {
    var cadena = ""

    // Verificando 1 Exec
    var countExec = 0;
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC) {
            countExec++;
            if (countExec > 1)
                return `Error: No es posible ejecutar más de un EXEC.\nLínea: ${String(_instrucciones[i].linea)} Columna: ${String(_instrucciones[i].columna)}\n`
        }
    }
    if (countExec == 0)
        return "Error: No se ha encontrado ninguna sentencia EXEC.\n"

    // Declarar métodos y funciones
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.NUEVO_METODO) {
            var mensaje = Metodo(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje + '\n'
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.NUEVA_FUNCION) {
            var mensaje = Funcion(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje + '\n'
            }
        }
    }

    // Declarar y asignar variables
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.DECLARACION) {
            var mensaje = Declaracion(_instrucciones[i], _ambito)
            if (mensaje) {
                if (mensaje.cadena)
                    cadena += mensaje.cadena
                if (mensaje.err)
                    cadena += mensaje.err
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var mensaje = Asignacion(_instrucciones[i], _ambito)
            if (mensaje) {
                if (mensaje.cadena)
                    cadena += mensaje.cadena
                if (mensaje.err)
                    cadena += mensaje.err
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
        cadena += mensaje.cadena
    if (mensaje.err)
        cadena += mensaje.err
    return cadena
}

module.exports = Global