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
                    return `Error: el índice '${String(pos.valor)}' se encuentra fuera del tamaño del vector.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
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
        const id = _instruccion.id;
        const existe = _ambito.existeSimbolo(id);
        if (existe) {
            if (_instruccion.posicion != null) { // Modificación de una posición de la lista
                var pos = Operacion(_instruccion.posicion, _ambito);
                var valor = Operacion(_instruccion.valor, _ambito);
                if (valor.err) return valor.err;
                var simbolo = _ambito.getSimbolo(id);
                var tipoLista = simbolo.valor[0].tipo;
                if (tipoLista === valor.tipo) {
                    if (simbolo.valor[0].valor === 'EMPTY')
                        return `Error: la lista '${String(id)}' se encuentra vacía.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                    else if (pos.valor < 0 || pos.valor >= simbolo.valor.length)
                        return `Error: la posición '${String(pos.valor)}' se encuentra fuera del tamaño de la lista.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                    simbolo.valor[pos.valor] = valor;
                    _ambito.actualizar(id, simbolo)
                    return null
                }
                return "Error: No es posible asignar un valor de tipo " + valor.tipo + " dentro de la lista '" + id + "'\nque es de tipo " + tipoLista + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            }
            else { // Agregación de item a la lista
                var valor = Operacion(_instruccion.valor, _ambito);
                if (valor.err) return valor.err;
                var simbolo = _ambito.getSimbolo(id);
                var tipoLista = simbolo.valor[0].tipo;
                if (tipoLista === valor.tipo) {
                    if (simbolo.valor[0].valor === 'EMPTY')
                        simbolo.valor[0] = valor;
                    else
                        simbolo.valor.push(valor);
                    _ambito.actualizar(id, simbolo)
                    return null
                }
                return "Error: No es posible agregar un valor de tipo " + valor.tipo + " a la lista '" + id + "'\nque es de tipo " + tipoLista + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            }
        }
        return `Error: la lista '${String(id)}' no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
    }

    else {
        const id = _instruccion.id;
        const existe = _ambito.existeSimbolo(id);
        if (existe) {
            var valor = Operacion(_instruccion.expresion, _ambito)
            if (valor.err) return valor.err;
            if (valor.asignacionLista) {
                var simbolo = _ambito.getSimbolo(id)
                if (simbolo.tipo === TIPO_DATO.LISTA) {
                    if (simbolo.valor[0].tipo === TIPO_DATO.CARACTER) {
                        simbolo.valor = valor.valor
                        _ambito.actualizar(id, simbolo)
                        return null
                    }
                    return `Error: la lista '${String(id)}' no es de tipo CHAR.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                }
                return `Error: la variable '${String(id)}' no es una estructura de tipo lista.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
            }
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
        return `Error: la variable '${String(id)}' no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
    }

}

module.exports = Asignacion