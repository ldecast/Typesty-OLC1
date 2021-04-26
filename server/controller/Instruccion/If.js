const Ambito = require("../../model/Ambito/Ambito")
const TIPO_DATO = require("../Enum/Tipados")
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones")
const Operacion = require("../../model/Operacion/Operacion")

function sentenciaIf(_instruccion, _ambito) {
    var cadena = { cadena: "", retorno: null }
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if (operacion.tipo === TIPO_DATO.BOOLEANO) {
        if (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito, "control")
            const Bloque = require('./Bloque')
            var bloque = Bloque(_instruccion.instrucciones, nuevoAmbito)
            if (bloque.cadena) cadena.cadena += bloque.cadena;
            if (bloque.retorno) cadena.retorno += bloque.retorno;
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        return cadena
    }
    return "Error: La expresión no es de tipo booleano en la condición o la variable no existe.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
}

function sentenciaIfElse(_instruccion, _ambito) {
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if (operacion.tipo === TIPO_DATO.BOOLEANO) {
        if (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito, "control")
            const Bloque = require('./Bloque')
            mensaje += Bloque(_instruccion.instruccionesIF, nuevoAmbito)
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        else {
            var nuevoAmbito = new Ambito(_ambito, "control")
            const Bloque = require('./Bloque')
            mensaje += Bloque(_instruccion.instruccionesELSE, nuevoAmbito)
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        return mensaje
    }
    return "Error: La expresión no es de tipo booleano en la condición o la variable no existe.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
}

function sentenciaElseIf(_instruccion, _ambito) {
    var mensaje = ""
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if (operacion.tipo === TIPO_DATO.BOOLEANO) {
        if (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito, "control")
            const Bloque = require('./Bloque')
            mensaje += Bloque(_instruccion.instruccionesIF, nuevoAmbito)
            operacion = Operacion(_instruccion.expresion, _ambito)
        }
        else if (_instruccion.instruccionesELSEIF) {
            var nuevoAmbito = new Ambito(_ambito, "control")
            mensaje += sentenciaElseIf(_instruccion.instruccionesELSEIF, nuevoAmbito);
        }
        else if (_instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE) {
            var nuevoAmbito = new Ambito(_ambito, "control")
            mensaje += sentenciaIfElse(_instruccion, nuevoAmbito);
        }
        return mensaje
    }
    return "Error: La expresión no es de tipo booleano en la condición o la variable no existe.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
}

function operadorTernario(_instruccion, _ambito) {
    var operacion = Operacion(_instruccion.condicion, _ambito)
    if (operacion.tipo === TIPO_DATO.BOOLEANO) {
        var expresion = (operacion.valor ? _instruccion.expresionA : _instruccion.expresionB)
        return Operacion(expresion, _ambito);
    }
    return "Error: La expresión no es de tipo booleano en la condición o la variable no existe.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
}

module.exports = {
    If: sentenciaIf,
    IfElse: sentenciaIfElse,
    ElseIf: sentenciaElseIf,
    Ternario: operadorTernario
};