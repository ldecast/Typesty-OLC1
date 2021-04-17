const Ambito = require("../../model/Ambito/Ambito")
const TIPO_DATO = require("../Enum/Tipados")
const Operacion = require("../../model/Operacion/Operacion")
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");

function cicloFor(_instruccion, _ambito) {
    var mensaje = ""

    if (_instruccion.variable.tipo === TIPO_INSTRUCCION.DECLARACION) {
        var m = Declaracion(_instruccion.variable, _ambito)
        if (m != null) {
            mensaje += m + '\n'
        }
    }
    else if (_instruccion.variable.tipo === TIPO_INSTRUCCION.ASIGNACION) {
        var m = Asignacion(_instruccion.variable, _ambito)
        if (m != null) {
            mensaje += m + '\n'
        }
    }

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

module.exports = cicloFor