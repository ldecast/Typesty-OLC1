const TIPO_DATO = require("../../controller/Enum/Tipados")
const Operacion = require("../Operacion/Operacion")

function casteo(_instruccion, _ambito) {
    var expresion = Operacion(_instruccion.expresion, _ambito)
    if (expresion.err) return expresion;
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

function to_Lower(_instruccion, _ambito) {
    var expresion = Operacion(_instruccion.expresion, _ambito);
    if (expresion.err) return expresion;
    if (expresion.tipo === TIPO_DATO.CADENA) {
        expresion.valor = expresion.valor.toLowerCase();
        return expresion;
    }
    return { err: "Error: La expresión de tipo " + expresion.tipo + " no es aceptada en 'toLower()'.\nLínea: " + expresion.linea + " Columna: " + expresion.columna + "\n" }
}

function to_Upper(_instruccion, _ambito) {
    var expresion = Operacion(_instruccion.expresion, _ambito);
    if (expresion.err) return expresion;
    if (expresion.tipo === TIPO_DATO.CADENA) {
        expresion.valor = expresion.valor.toUpperCase();
        return expresion;
    }
    return { err: "Error: La expresión de tipo " + expresion.tipo + " no es aceptada en 'toUpper()'.\nLínea: " + expresion.linea + " Columna: " + expresion.columna + "\n" }
}

function get_length(_instruccion, _ambito) {
    var expresion = Operacion(_instruccion.expresion, _ambito);
    if (expresion.err) return expresion;
    if (expresion.tipo === TIPO_DATO.VECTOR || expresion.tipo === TIPO_DATO.LISTA) {
        if (expresion.valor[0].valor === 'EMPTY')
            return { valor: 0, tipo: TIPO_DATO.ENTERO, linea: _instruccion.linea, columna: _instruccion.columna }
        else
            return { valor: expresion.valor.length, tipo: TIPO_DATO.ENTERO, linea: _instruccion.linea, columna: _instruccion.columna }
    }
    if (expresion.tipo === TIPO_DATO.CADENA) {
        var exp = { valor: expresion.valor.length, tipo: TIPO_DATO.ENTERO, linea: _instruccion.linea, columna: _instruccion.columna }
        return exp;
    }
    return { err: "Error: La expresión de tipo " + expresion.tipo + " no es aceptada en 'length()'.\nLínea: " + expresion.linea + " Columna: " + expresion.columna + "\n" }
}


module.exports = {
    Casteo: casteo,
    ToLower: to_Lower,
    ToUpper: to_Upper,
    Length: get_length
};