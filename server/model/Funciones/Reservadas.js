const Ambito = require("../Ambito/Ambito")
const TIPO_DATO = require("../../controller/Enum/Tipados")
const Operacion = require("../Operacion/Operacion")

function casteo(_instruccion, _ambito) {
    var expresion = Operacion(_instruccion.expresion, _ambito)
    switch (_instruccion.nuevoTipo) {
        case TIPO_DATO.DOBLE:
            if (expresion.tipo === TIPO_DATO.ENTERO || expresion.tipo === TIPO_DATO.DOBLE) {
                expresion.valor = parseFloat(expresion.valor)
                expresion.tipo = TIPO_DATO.DOBLE;
                return expresion;
            }
            else if (expresion.tipo === TIPO_DATO.CARACTER) {
                expresion.valor = parseFloat(expresion.valor.charCodeAt(0));
                expresion.tipo = TIPO_DATO.DOBLE;
                return expresion;
            }
            else
                return { err: "Error: no se puede castear " + expresion.tipo + " a " + _instruccion.nuevoTipo + "\nLínea: " + expresion.linea + " Columna: " + expresion.columna + "\n" }
        case TIPO_DATO.ENTERO:
            if (expresion.tipo === TIPO_DATO.DOBLE || expresion.tipo === TIPO_DATO.ENTERO) {
                expresion.valor = parseInt(expresion.valor);
                expresion.tipo = TIPO_DATO.ENTERO;
                return expresion;
            }
            else if (expresion.tipo === TIPO_DATO.CARACTER) {
                expresion.valor = parseInt(expresion.valor.charCodeAt(0));
                expresion.tipo = TIPO_DATO.ENTERO;
                return expresion;
            }
            else
                return { err: "Error: no se puede castear " + expresion.tipo + " a " + _instruccion.nuevoTipo + "\nLínea: " + expresion.linea + " Columna: " + expresion.columna + "\n" }
        case TIPO_DATO.CADENA:
            if (expresion.tipo === TIPO_DATO.ENTERO || expresion.tipo === TIPO_DATO.DOBLE || expresion.tipo === TIPO_DATO.CADENA) {
                expresion.valor = String(expresion.valor);
                expresion.tipo = TIPO_DATO.CADENA;
                return expresion;
            }
            else {
                return { err: "Error: no se puede castear " + expresion.tipo + " a " + _instruccion.nuevoTipo + "\nLínea: " + expresion.linea + " Columna: " + expresion.columna + "\n" }
            }
        case TIPO_DATO.CARACTER:
            if (expresion.tipo === TIPO_DATO.ENTERO) {
                expresion.valor = String.fromCharCode(expresion.valor);
                expresion.tipo = TIPO_DATO.CARACTER;
                return expresion;
            }
            else
                return { err: "Error: no se puede castear " + expresion.tipo + " a " + _instruccion.nuevoTipo + "\nLínea: " + expresion.linea + " Columna: " + expresion.columna + "\n" }
        default:
            return { err: "Error: no se puede castear " + expresion.tipo + " a " + _instruccion.nuevoTipo + "\nLínea: " + expresion.linea + " Columna: " + expresion.columna + "\n" }
    }
}

module.exports = {
    Casteo: casteo
};