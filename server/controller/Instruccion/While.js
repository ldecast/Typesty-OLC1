const Ambito = require("../../model/Ambito/Ambito")
const TIPO_DATO = require("../Enum/Tipados")
const Operacion = require("../../model/Operacion/Operacion")

function cicloWhile(_instruccion, _ambito) {
    var cadena = { cadena: "", retorno: null, err: null }
    var operacion = Operacion(_instruccion.expresion, _ambito)
    if (operacion.err) { cadena.err = operacion.err; return cadena; }
    var max = 0;
    if (operacion.retorno) {
        if (operacion.retorno.tipo === TIPO_DATO.BOOLEANO) {
            if (operacion.cadena) cadena.cadena = operacion.cadena;
            var condicion = operacion.retorno;
            while (condicion.valor && max < 1500) {
                var nuevoAmbito = new Ambito(_ambito, "ciclo")
                const Bloque = require('./Bloque')
                var bloque = Bloque(_instruccion.instrucciones, nuevoAmbito)
                cadena.cadena += bloque.cadena;
                if (bloque.retorno) cadena.retorno = bloque.retorno;
                condicion = Operacion(_instruccion.expresion, _ambito)
                if (condicion.err) { cadena.err = condicion.err; return cadena; }
                if (condicion.retorno) condicion = condicion.retorno;
                if (condicion.cadena) cadena.cadena += condicion.cadena;
                max++;
            }
            if (max === 1500) cadena.cadena += 'Maximum call stack size exceeded!\n'
            return cadena
        }
        cadena.err = "Error: La expresión a evaluar de tipo " + operacion.retorno.tipo + " no es de tipo booleano en la condición.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
        return cadena;
    }
    else if (operacion.tipo === TIPO_DATO.BOOLEANO) {
        while (operacion.valor && max < 1500) {
            var nuevoAmbito = new Ambito(_ambito, "ciclo")
            const Bloque = require('./Bloque')
            var bloque = Bloque(_instruccion.instrucciones, nuevoAmbito)
            cadena.cadena += bloque.cadena;
            if (bloque.retorno) cadena.retorno = bloque.retorno;
            operacion = Operacion(_instruccion.expresion, _ambito)
            if (operacion.err) { cadena.err = operacion.err; return cadena; }
            if (operacion.retorno) operacion = operacion.retorno;
            if (operacion.cadena) cadena.cadena += operacion.cadena;
            max++;
        }
        if (max === 1500) cadena.cadena += 'Maximum call stack size exceeded!\n'
        return cadena
    }
    cadena.err = "Error: La expresión no es de tipo booleano en la condición o la variable no existe.\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n"
    return cadena;
}

module.exports = cicloWhile