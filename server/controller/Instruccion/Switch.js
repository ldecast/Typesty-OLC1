const Ambito = require("../../model/Ambito/Ambito")
const TIPO_DATO = require("../Enum/Tipados")
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones")
const Operacion = require("../../model/Operacion/Operacion")

function sentenciaSwitch(_instruccion, _ambito) {
    var mensaje = ""
    var evaluar = Operacion(_instruccion.expresionEvaluar, _ambito);
    var match = false;

    if (_instruccion.casosComparar != null) {
        _instruccion.casosComparar.forEach(caso => {
            var comparar = Operacion(caso.expresion, _ambito);
            if (evaluar.valor == comparar.valor) {
                var nuevoAmbito = new Ambito(_ambito)
                const Bloque = require('./Bloque')
                mensaje += Bloque(caso.instrucciones, nuevoAmbito)
                match = true;
            }
        });
    }

    if (match === false) {
        if (_instruccion.casoDefault != null) {
            var nuevoAmbito = new Ambito(_ambito)
            const Bloque = require('./Bloque')
            mensaje += Bloque(_instruccion.casoDefault.instrucciones, nuevoAmbito)
        }
    }
    return mensaje
}

module.exports = sentenciaSwitch