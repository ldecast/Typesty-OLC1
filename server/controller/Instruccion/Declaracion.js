const Simbolo = require("../../model/Ambito/Simbolo");
const TIPO_DATO = require("../Enum/Tipados");
const Operacion = require("../../model/Operacion/Operacion");

function defaultValue(tipo_dato) {
    switch (tipo_dato) {
        case TIPO_DATO.BOOLEANO:
            return true;
        case TIPO_DATO.CADENA:
            return "";
        case TIPO_DATO.CARACTER:
            return '\u0000';
        case TIPO_DATO.DOBLE:
            return 0.0;
        case TIPO_DATO.ENTERO:
            return 0;
        default:
            return null;
    }
}

function Declaracion(_instruccion, _ambito) {

    if (_instruccion.tipo_dato === TIPO_DATO.ENTERO) {
        // console.log(_instruccion,"aaaaaaaaaaaaaaa")
        var cadena = "";
        var valor = defaultValue(TIPO_DATO.ENTERO);
        if (_instruccion.valor != null) {
            var op = Operacion(_instruccion.valor, _ambito)
            if (op.err) return op.err;
            if (op.retorno) {
                if (op.cadena) cadena = op.cadena;
                if (op.retorno.tipo === TIPO_DATO.ENTERO)
                    valor = op.retorno.valor;
                else
                    return "Error: No es posible declarar un valor de tipo " + tipo + " a la variable \n'" + _instruccion.id + "' que es de tipo " + TIPO_DATO.ENTERO + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            }
            else {
                tipo = op.tipo;
                if (tipo === TIPO_DATO.ENTERO)
                    valor = op.valor;
                else
                    return "Error: No es posible declarar un valor de tipo " + tipo + " a la variable \n'" + _instruccion.id + "' que es de tipo " + TIPO_DATO.ENTERO + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.ENTERO, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        // console.log("todo ok", nuevoSimbolo)
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        console.log(2222, cadena)
        if (cadena.length > 0) return cadena;
        return null;
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.DOBLE) {
        var valor = defaultValue(TIPO_DATO.DOBLE);
        if (_instruccion.valor != null) {
            var op = Operacion(_instruccion.valor, _ambito)
            if (op.err) return op.err;
            tipo = op.tipo;
            if (tipo === TIPO_DATO.DOBLE) {
                valor = op.valor;
            }
            else {
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n'" + _instruccion.id + "' que es de tipo " + TIPO_DATO.DOBLE + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.DOBLE, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.BOOLEANO) {
        var valor = defaultValue(TIPO_DATO.BOOLEANO);
        if (_instruccion.valor != null) {
            op = Operacion(_instruccion.valor, _ambito)
            if (op.err) return op.err;
            tipo = op.tipo
            if (tipo === TIPO_DATO.BOOLEANO) {
                valor = (op.valor.toString() == 'true');
            }
            else {
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n'" + _instruccion.id + "' que es de tipo " + TIPO_DATO.BOOLEANO + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.BOOLEANO, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.CARACTER) {
        var valor = defaultValue(TIPO_DATO.CARACTER);
        if (_instruccion.valor != null) {
            op = Operacion(_instruccion.valor, _ambito)
            if (op.err) return op.err;
            tipo = op.tipo
            if (tipo === TIPO_DATO.CARACTER) {
                valor = String(op.valor);
            }
            else
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n'" + _instruccion.id + "' que es de tipo " + TIPO_DATO.CARACTER + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CARACTER, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.CADENA) {
        var valor = defaultValue(TIPO_DATO.CADENA);
        if (_instruccion.valor != null) {
            op = Operacion(_instruccion.valor, _ambito)
            if (op.err) return op.err;
            tipo = op.tipo
            if (tipo === TIPO_DATO.CADENA) {
                valor = String(op.valor)
            }
            else
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n'" + _instruccion.id + "' que es de tipo " + TIPO_DATO.CADENA + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.VECTOR) {
        var valores = [];
        if (_instruccion.valores != null) { //Si tiene una lista de valores
            for (let i = 0; i < _instruccion.valores.length; i++) {
                var exp = Operacion(_instruccion.valores[i], _ambito);
                if (exp.err) return exp.err;
                if (exp.tipo === _instruccion.tipo_dato1)
                    valores.push(exp);
                else
                    return "Error: La expresión '" + exp.valor + "' de tipo " + exp.tipo + " no corresponde al tipo " + _instruccion.tipo_dato1 + " de la declaración del vector.\nLínea: " + exp.linea + " Columna: " + exp.columna + "\n";
            }
        }
        else { //Tiene un tamaño [expresion]
            if (_instruccion.tipo_dato1 === _instruccion.tipo_dato2) {
                var tamano = Operacion(_instruccion.tamaño, _ambito)
                if (tamano.err) return tamano.err;
                if (tamano.tipo === TIPO_DATO.ENTERO || tamano.tipo === TIPO_DATO.DOBLE) {
                    if (tamano.valor < 1) return "Error: La expresión de valor " + tamano.valor + " no es un tamaño válido para declarar el vector.\nLínea: " + tamano.linea + " Columna: " + tamano.columna + "\n";
                    for (let i = 0; i < tamano.valor; i++) {
                        var exp = {
                            tipo: _instruccion.tipo_dato1,
                            valor: defaultValue(_instruccion.tipo_dato1),
                            linea: _instruccion.linea,
                            columna: _instruccion.columna
                        }
                        valores.push(exp);
                    }
                }
                else
                    return "Error: La expresión de tipo " + tamano.tipo + " no es de tipo numérica para declarar el tamaño del vector.\nLínea: " + tamano.linea + " Columna: " + tamano.columna + "\n";
            }
            else
                return "Error: El tipo " + _instruccion.tipo_dato1 + " no coincide con el tipo " + _instruccion.tipo_dato2 + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valores, TIPO_DATO.VECTOR, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.LISTA) {
        var valores = [];
        if (_instruccion.expresion != null) {
            if (_instruccion.tipo_dato1 === TIPO_DATO.CARACTER)
                op = Operacion(_instruccion.expresion, _ambito);
            else
                return `Error: la lista '${String(_instruccion.id)}' no es de tipo CHAR.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
            if (op.err) return valores.err;
            valores = op.valor;
        }
        else {
            if (_instruccion.tipo_dato1 === _instruccion.tipo_dato2) {
                var exp = {
                    tipo: _instruccion.tipo_dato1,
                    valor: 'EMPTY',
                    linea: _instruccion.linea,
                    columna: _instruccion.columna
                }
                valores.push(exp);
            }
            else
                return "Error: El tipo " + _instruccion.tipo_dato1 + " no coincide con el tipo " + _instruccion.tipo_dato2 + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valores, TIPO_DATO.LISTA, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

}

module.exports = Declaracion