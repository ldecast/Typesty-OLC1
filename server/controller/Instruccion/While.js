const Ambito = require("../../model/Ambito/Ambito")
const TIPO_DATO = require("../Enum/Tipados")
const Operacion = require("../../model/Operacion/Operacion")

function cicloWhile(_instruccion, _ambito) {
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if (operacion.tipo === TIPO_DATO.BOOLEANO) {
        while (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            mensaje += Bloque(_instruccion.instrucciones, nuevoAmbito)
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        return mensaje
    }
    return "Error: La expresión no es de tipo booleano en la condición o la variable no existe.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
}

module.exports = cicloWhile