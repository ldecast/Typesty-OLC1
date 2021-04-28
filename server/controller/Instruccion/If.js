const Ambito = require("../../model/Ambito/Ambito")
const TIPO_DATO = require("../Enum/Tipados")
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones")
const Operacion = require("../../model/Operacion/Operacion")

function sentenciaIf(_instruccion, _ambito) {
    var cadena = { cadena: "", retorno: null, err: null }
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if (operacion.err) { cadena.err = operacion.err; return cadena; }
    if (operacion.retorno) {
        if (operacion.cadena) cadena.cadena = operacion.cadena;
        if (operacion.retorno.tipo === TIPO_DATO.BOOLEANO) {
            var condicion = operacion.retorno;
            if (condicion.valor) {
                var nuevoAmbito = new Ambito(_ambito, "control")
                const Bloque = require('./Bloque')
                var bloque = Bloque(_instruccion.instrucciones, nuevoAmbito)
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
            }
            return cadena
        }
        cadena.err = "Error: La expresión a evaluar de tipo " + operacion.retorno.tipo + " no es de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
        return cadena;
    }
    if (operacion.tipo === TIPO_DATO.BOOLEANO) {
        if (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito, "control")
            const Bloque = require('./Bloque')
            var bloque = Bloque(_instruccion.instrucciones, nuevoAmbito)
            cadena.cadena += bloque.cadena;
            if (bloque.retorno) cadena.retorno = bloque.retorno;
        }
        return cadena;
    }
    else
        cadena.err = "Error: La expresión no es de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
    return cadena
}

function sentenciaIfElse(_instruccion, _ambito) {
    var cadena = { cadena: "", retorno: null, err: null }
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if (operacion.err) { cadena.err = operacion.err; return cadena; }
    if (operacion.retorno) {
        if (operacion.cadena) cadena.cadena = operacion.cadena;
        if (operacion.retorno.tipo === TIPO_DATO.BOOLEANO) {
            var condicion = operacion.retorno;
            if (condicion.valor) {
                var nuevoAmbito = new Ambito(_ambito, "control")
                const Bloque = require('./Bloque')
                var bloque = Bloque(_instruccion.instruccionesIF, nuevoAmbito)
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
            }
            else {
                var nuevoAmbito = new Ambito(_ambito, "control")
                const Bloque = require('./Bloque')
                var bloque = Bloque(_instruccion.instruccionesELSE, nuevoAmbito)
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
            }
            return cadena
        }
        cadena.err = "Error: La expresión a evaluar de tipo " + operacion.retorno.tipo + " no es de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
        return cadena;
    }
    if (operacion.tipo === TIPO_DATO.BOOLEANO) {
        if (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito, "control")
            const Bloque = require('./Bloque')
            var bloque = Bloque(_instruccion.instruccionesIF, nuevoAmbito)
            cadena.cadena += bloque.cadena;
            if (bloque.retorno) cadena.retorno = bloque.retorno;
        }
        else {
            var nuevoAmbito = new Ambito(_ambito, "control")
            const Bloque = require('./Bloque')
            var bloque = Bloque(_instruccion.instruccionesELSE, nuevoAmbito)
            cadena.cadena += bloque.cadena;
            if (bloque.retorno) cadena.retorno = bloque.retorno;
        }
        return cadena;
    }
    else
        cadena.err = "Error: La expresión no es de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
    return cadena
}

function sentenciaElseIf(_instruccion, _ambito) {
    var cadena = { cadena: "", retorno: null, err: null }
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if (operacion.err) { cadena.err = operacion.err; return cadena; }
    if (operacion.retorno) {
        if (operacion.cadena) cadena.cadena = operacion.cadena;
        if (operacion.retorno.tipo === TIPO_DATO.BOOLEANO) {
            var condicion = operacion.retorno;
            if (condicion.valor) {
                var nuevoAmbito = new Ambito(_ambito, "control")
                const Bloque = require('./Bloque')
                var bloque = Bloque(_instruccion.instruccionesIF, nuevoAmbito)
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
            }
            else if (_instruccion.instruccionesELSEIF) {
                var nuevoAmbito = new Ambito(_ambito, "control")
                var bloque = sentenciaElseIf(_instruccion.instruccionesELSEIF, nuevoAmbito);
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
            }
            else if (_instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE) {
                var nuevoAmbito = new Ambito(_ambito, "control")
                var bloque = sentenciaIfElse(_instruccion, nuevoAmbito);
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
            }
            return cadena
        }
        cadena.err = "Error: La expresión a evaluar de tipo " + operacion.retorno.tipo + " no es de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
        return cadena;
    }
    if (operacion.tipo === TIPO_DATO.BOOLEANO) {
        if (operacion.valor) {
            var nuevoAmbito = new Ambito(_ambito, "control")
            const Bloque = require('./Bloque')
            var bloque = Bloque(_instruccion.instruccionesIF, nuevoAmbito)
            cadena.cadena += bloque.cadena;
            if (bloque.retorno) cadena.retorno = bloque.retorno;
        }
        else if (_instruccion.instruccionesELSEIF) {
            var nuevoAmbito = new Ambito(_ambito, "control")
            var bloque = sentenciaElseIf(_instruccion.instruccionesELSEIF, nuevoAmbito);
            cadena.cadena += bloque.cadena;
            if (bloque.retorno) cadena.retorno = bloque.retorno;
        }
        else if (_instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE) {
            var nuevoAmbito = new Ambito(_ambito, "control")
            var bloque = sentenciaIfElse(_instruccion, nuevoAmbito);
            cadena.cadena += bloque.cadena;
            if (bloque.retorno) cadena.retorno = bloque.retorno;
        }
        return cadena
    }
    cadena.err = "Error: La expresión a evaluar de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
    return cadena;
}

function operadorTernario(_instruccion, _ambito) {
    var cadena = { cadena: "", retorno: null, err: null }
    var operacion = Operacion(_instruccion.condicion, _ambito)
    if (operacion.err) { cadena.err = operacion.err; return cadena; }
    if (operacion.retorno) {
        if (operacion.cadena) cadena.cadena = operacion.cadena;
        var condicion = operacion.retorno;
        if (operacion.retorno.tipo === TIPO_DATO.BOOLEANO) {
            var expresion = (condicion.valor ? _instruccion.expresionA : _instruccion.expresionB)
            return Operacion(expresion, _ambito);
        }
        cadena.err = "Error: La expresión a evaluar de tipo " + operacion.retorno.tipo + " no es de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
        return cadena;
    }
    if (operacion.tipo === TIPO_DATO.BOOLEANO) {
        var expresion = (operacion.valor ? _instruccion.expresionA : _instruccion.expresionB)
        return Operacion(expresion, _ambito);
    }
    return "Error: La expresión no es de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
}

module.exports = {
    If: sentenciaIf,
    IfElse: sentenciaIfElse,
    ElseIf: sentenciaElseIf,
    Ternario: operadorTernario
};