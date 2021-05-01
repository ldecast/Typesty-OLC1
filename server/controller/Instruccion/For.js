const Ambito = require("../../model/Ambito/Ambito")
const TIPO_DATO = require("../Enum/Tipados")
const Operacion = require("../../model/Operacion/Operacion")
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones");
const Asignacion = require("./Asignacion");
const Declaracion = require("./Declaracion");

function cicloFor(_instruccion, _ambito) {
    var cadena = { cadena: "", retorno: null, err: null }

    if (_instruccion.variable.tipo === TIPO_INSTRUCCION.DECLARACION) {
        var m = Declaracion(_instruccion.variable, _ambito)
        if (m.retorno) {
            if (m.err) { cadena.err = m.err; return cadena; }
            if (m.cadena) cadena.cadena = m.cadena;
        }
    }
    else if (_instruccion.variable.tipo === TIPO_INSTRUCCION.ASIGNACION) {
        var m = Asignacion(_instruccion.variable, _ambito)
        if (m.retorno) {
            if (m.err) { cadena.err = m.err; return cadena; }
            if (m.cadena) cadena.cadena = m.cadena;
        }
    }
    var max = 0;
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if (operacion.retorno) {
        if (operacion.retorno.tipo === TIPO_DATO.BOOLEANO) {
            if (operacion.cadena) cadena.cadena = operacion.cadena;
            var condicion = operacion.retorno;
            while (condicion.valor && max < 1500) {
                var nuevoAmbito = new Ambito(_ambito, "ciclo")
                const Bloque = require('./Bloque')
                var bloque = Bloque(_instruccion.instrucciones, nuevoAmbito);
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
                if (bloque.hasBreak || bloque.hasReturn) break;
                if (bloque.hasContinue) {
                    var actualizacion = _instruccion.instrucciones[_instruccion.instrucciones.length - 1];
                    Bloque([actualizacion], nuevoAmbito);
                }
                operacion = Operacion(_instruccion.expresion, _ambito)
                if (operacion.err) { cadena.err = operacion.err; return cadena; }
                if (operacion.retorno) {
                    cadena.cadena += operacion.cadena;
                    condicion = operacion.retorno;
                }
                max++;
            }
            if (max === 1500) cadena.cadena += 'Maximum call stack size exceeded!\n'
            return cadena
        }
        cadena.err = "Error: La expresión no es de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
        return cadena;
    }
    else {
        if (operacion.tipo === TIPO_DATO.BOOLEANO) {
            while (operacion.valor && max < 1500) {
                var nuevoAmbito = new Ambito(_ambito, "ciclo")
                const Bloque = require('./Bloque')
                var bloque = Bloque(_instruccion.instrucciones, nuevoAmbito);
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
                if (bloque.hasBreak || bloque.hasReturn) break;
                if (bloque.hasContinue) {
                    var actualizacion = _instruccion.instrucciones[_instruccion.instrucciones.length - 1];
                    Bloque([actualizacion], nuevoAmbito);
                }
                operacion = Operacion(_instruccion.expresion, _ambito)
                if (operacion.err) { cadena.err = operacion.err; return cadena; }
                if (operacion.retorno) {
                    cadena.cadena += operacion.cadena;
                    operacion = operacion.retorno;
                }
                max++;
            }
            if (max === 1500) cadena.cadena += 'Maximum call stack size exceeded!\n'
            return cadena
        }
    }
    cadena.err = "Error: La expresión no es de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
    return cadena;
}

module.exports = cicloFor