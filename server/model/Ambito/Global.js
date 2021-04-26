const TIPO_INSTRUCCION = require("../../controller/Enum/TipoInstrucciones")
const Asignacion = require("../../controller/Instruccion/Asignacion")
const Declaracion = require("../../controller/Instruccion/Declaracion")
const Metodo = require("../../controller/Instruccion/Metodo")
const Funcion = require("../../controller/Instruccion/Funcion")
const Exec = require("../../controller/Instruccion/Exec")
const Operacion = require("../Operacion/Operacion")

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
            if (mensaje != null) {
                cadena += mensaje + '\n'
            }
        }
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.ASIGNACION) {
            var mensaje = Asignacion(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje + '\n'
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
    var x = instruccion.lista_valores === null ? 0 : instruccion.lista_valores.length; //cantidad de parámetros del exec
    for (let i = 0; i < x; i++) {
        const expresion = instruccion.lista_valores[i];
        // console.log(expresion, 1212121212121);
        const op = Operacion(expresion, _ambito);
        if (op.err) cadena += op.err;
        instruccion.lista_valores[i] = op;
    }
    var mensaje = Exec(instruccion, _ambito)
    if (mensaje != null) {
        if (mensaje.err) cadena += mensaje.err;
        else
            cadena += mensaje.cadena
    }
    // console.log("eijdeidjei", mensaje, 222222)
    // console.log(cadena, "SSSSSSSSSSSSSSSSSSSSSSS")
    return cadena
}

module.exports = Global