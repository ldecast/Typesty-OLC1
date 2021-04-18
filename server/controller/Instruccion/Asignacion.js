const Operacion = require("../../model/Operacion/Operacion");
const TIPO_DATO = require("../Enum/Tipados");

function Asignacion(_instruccion, _ambito) {
    if (_instruccion.tipo_dato === TIPO_DATO.VECTOR) {
        const id = _instruccion.id;
        const existe = _ambito.existeSimbolo(id);
        if (existe) {
            var pos = Operacion(_instruccion.posicion, _ambito);
            var valor = Operacion(_instruccion.valor, _ambito);
            if (valor.err) return valor.err;
            var simbolo = _ambito.getSimbolo(id);
            var tipoVector = simbolo.valor[0].tipo;
            if (tipoVector === valor.tipo) {
                if (pos.valor < 0 || pos.valor >= simbolo.valor.length) {
                    return `Error: el índice del vector '${String(pos.valor)}' se encuentra fuera del tamaño del vector.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                }
                simbolo.valor[pos.valor] = valor;
                _ambito.actualizar(id, simbolo)
                return null
            }
            return "Error: No es posible asignar un valor de tipo " + valor.tipo + " dentro del vector '" + id + "'\nque es de tipo " + tipoVector + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
        }
        return `Error: el vector '${String(id)}' no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.LISTA) {

    }

    else {
        const id = _instruccion.id;
        const existe = _ambito.existeSimbolo(id);
        if (existe) {
            var valor = Operacion(_instruccion.expresion, _ambito)
            if (valor.err) return valor.err;
            var simbolo = _ambito.getSimbolo(id)
            var tipos = {
                tipoSimbolo: simbolo.tipo,
                tipoNuevoValor: valor.tipo
            }
            if (tipos.tipoSimbolo === tipos.tipoNuevoValor) {
                simbolo.valor = valor.valor
                _ambito.actualizar(id, simbolo)
                return null
            }
            return "Error: No es posible asignar un valor de tipo " + tipos.tipoNuevoValor + " a la variable '" + id + "' que es de tipo " + tipos.tipoSimbolo + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
        }
        return `Error: la variable '${String(id)}' no existe. Línea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
    }

}

module.exports = Asignacion