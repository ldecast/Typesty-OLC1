const Simbolo = require("../../model/Ambito/Simbolo");
const TIPO_DATO = require("../Enum/Tipados");
const Operacion = require("../../model/Operacion/Operacion");

function Declaracion(_instruccion, _ambito) {

    if (_instruccion.tipo_dato === TIPO_DATO.ENTERO) {
        var valor = 0
        if (_instruccion.valor != null) {
            var op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo;
            if (tipo === TIPO_DATO.ENTERO) {
                valor = op.valor;
            }
            else {
                return "Error: No es posible declarar un valor de tipo " + tipo + " a la variable \n'" + _instruccion.id + "' que es de tipo " + TIPO_DATO.ENTERO + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            }
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.ENTERO, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.DOBLE) {
        var valor = 0.0
        if (_instruccion.valor != null) {
            var op = Operacion(_instruccion.valor, _ambito)
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
        var valor = false // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if (_instruccion.valor != null) {
            op = Operacion(_instruccion.valor, _ambito)
            tipo = op.tipo
            //verificamos que el valor a asignar sea del mismo tipo
            if (tipo === TIPO_DATO.BOOLEANO) {
                valor = (op.valor.toString() == 'true');
            }
            else {
                return "Error: No es posible asignar un valor de tipo " + tipo + " a la variable \n'" + _instruccion.id + "' que es de tipo " + TIPO_DATO.BOOLEANO + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            }
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.BOOLEANO, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
        //console.log(_ambito)
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.CARACTER) {
        var valor = '\u0000'
        if (_instruccion.valor != null) {
            op = Operacion(_instruccion.valor, _ambito)
            valor = op.valor.charAt(0);
        }
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CARACTER, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.CADENA) {
        var valor = "" // en caso sea sin asignación inicializamos la variable
        //si es una declaracion con asignacion
        if (_instruccion.valor != null) {
            op = Operacion(_instruccion.valor, _ambito)
            valor = String(op.valor) //casteamos a cadena
        }
        //verificamos si ya existe
        const nuevoSimbolo = new Simbolo(_instruccion.id, valor, TIPO_DATO.CADENA, _instruccion.linea, _instruccion.columna)
        if (_ambito.existeSimbolo(nuevoSimbolo.id) != false) {
            return "Error: La variable '" + nuevoSimbolo.id + "' ya existe.\nLínea: " + nuevoSimbolo.linea + " Columna: " + nuevoSimbolo.columna + "\n";
        }
        _ambito.addSimbolo(nuevoSimbolo.id, nuevoSimbolo)
        return null
        //console.log(_ambito)
    }

}

module.exports = Declaracion