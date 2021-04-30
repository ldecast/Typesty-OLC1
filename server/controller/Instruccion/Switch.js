const Ambito = require("../../model/Ambito/Ambito")
const TIPO_DATO = require("../Enum/Tipados")
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones")
const Operacion = require("../../model/Operacion/Operacion")

function sentenciaSwitch(_instruccion, _ambito) {
    var cadena = { cadena: "", retorno: null, err: null }
    var evaluar = Operacion(_instruccion.expresionEvaluar, _ambito);
    if (evaluar.err) { cadena.err = evaluar.err; return cadena; }
    var match = false;
    if (evaluar.retorno) {
        if (_instruccion.casosComparar != null) {
            _instruccion.casosComparar.forEach(caso => {
                var comparar = Operacion(caso.expresion, _ambito);
                if (comparar.err) { cadena.err = comparar.err; return cadena; }
                var comparacion;
                if (comparar.retorno) comparacion = comparar.retorno;
                else comparacion = comparar;
                if (evaluar.retorno.valor == comparacion.valor) {
                    var nuevoAmbito = new Ambito(_ambito, "switch")
                    const Bloque = require('./Bloque')
                    var bloque = Bloque(caso.instrucciones, nuevoAmbito);
                    cadena.cadena += bloque.cadena;
                    if (bloque.retorno) cadena.retorno = bloque.retorno;
                    match = true;
                }
            });
        }
        if (match === false) {
            if (_instruccion.casoDefault != null) {
                var nuevoAmbito = new Ambito(_ambito, "switch")
                const Bloque = require('./Bloque')
                var bloque = Bloque(_instruccion.casoDefault.instrucciones, nuevoAmbito);
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
            }
        }
        return cadena;
    }
    else {
        if (_instruccion.casosComparar != null) {
            _instruccion.casosComparar.forEach(caso => {
                var comparar = Operacion(caso.expresion, _ambito);
                if (comparar.err) { cadena.err = comparar.err; return cadena; }
                var comparacion;
                if (comparar.retorno) comparacion = comparar.retorno;
                else comparacion = comparar;
                if (evaluar.valor == comparacion.valor) {
                    var nuevoAmbito = new Ambito(_ambito, "switch")
                    const Bloque = require('./Bloque')
                    var bloque = Bloque(caso.instrucciones, nuevoAmbito);
                    cadena.cadena += bloque.cadena;
                    if (bloque.retorno) cadena.retorno = bloque.retorno;
                    match = true;
                }
            });
        }
        if (match === false) {
            if (_instruccion.casoDefault != null) {
                var nuevoAmbito = new Ambito(_ambito, "switch")
                const Bloque = require('./Bloque')
                var bloque = Bloque(_instruccion.casoDefault.instrucciones, nuevoAmbito);
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
            }
        }
        return cadena;
    }
}

module.exports = sentenciaSwitch