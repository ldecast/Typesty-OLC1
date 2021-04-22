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

    // Declarar variables, métodos y funciones
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
        else if (_instrucciones[i].tipo === TIPO_INSTRUCCION.NUEVO_METODO) {
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

    // Ejecutar EXEC
    for (let i = 0; i < _instrucciones.length; i++) {
        if (_instrucciones[i].tipo === TIPO_INSTRUCCION.EXEC) {
            var mensaje = Exec(_instrucciones[i], _ambito)
            if (mensaje != null) {
                cadena += mensaje
            }
            break
        }
    }
    // for (let j = 0; j < _instrucciones.length; j++) {
    //     if (_instrucciones[j].tipo === TIPO_INSTRUCCION.EXEC) {

    //         for (let i = 0; i < _instrucciones[j].lista_valores.length; i++) {
    //             const expresion = _instrucciones[j].lista_valores[i];
    //             console.log(expresion.valor)
    //             if (expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
    //                 console.log(_ambito.getSimbolo(expresion.valor))
    //                 _instrucciones[j].lista_valores[i].tipo = _ambito.getSimbolo(expresion.valor).tipo;
    //                 _instrucciones[j].lista_valores[i].valor = _ambito.getSimbolo(expresion.valor).valor;
    //             }
    //         }
    //         const Exec = require("../../controller/Instruccion/Exec")
    //         var global = _ambito.getGlobal();
    //         var mensaje = Exec(_instrucciones[j], global)
    //         if (mensaje != null) {
    //             cadena += mensaje
    //         }
    //         break
    //     }
    // }
    return cadena
}

module.exports = Global