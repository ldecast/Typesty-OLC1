const Operacion = require("../../model/Operacion/Operacion");
const TIPO_DATO = require("../Enum/Tipados");

function Asignacion(_instruccion, _ambito) {

    var cadena = { cadena: "", retorno: null, err: null }

    if (_instruccion.tipo_dato === TIPO_DATO.VECTOR) {
        const id = _instruccion.id;
        const simbolo = _ambito.getSimbolo(id);
        if (simbolo) {
            var pos = Operacion(_instruccion.posicion, _ambito);
            if (pos.err) { cadena.err = pos.err; return cadena; }
            if (pos.tipo != TIPO_DATO.ENTERO) { cadena.err = `Error: el índice '${String(pos.valor)}' no es de tipo numérico.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`; return cadena; }
            var valor = Operacion(_instruccion.valor, _ambito);
            if (valor.err) { cadena.err = valor.err; return cadena; }
            var tipoVector = simbolo.valor[0].tipo;
            if (tipoVector === valor.tipo) {
                if (pos.valor < 0 || pos.valor >= simbolo.valor.length) {
                    cadena.err = `Error: el índice '${String(pos.valor)}' se encuentra fuera del tamaño del vector.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                    return cadena;
                }
                simbolo.valor[pos.valor] = valor;
                _ambito.actualizar(id, simbolo)
                return cadena;
            }
            cadena.err = "Error: No es posible asignar un valor de tipo " + valor.tipo + " dentro del vector '" + id + "'\nque es de tipo " + tipoVector + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            return cadena;
        }
        cadena.err = `Error: el vector '${String(id)}' no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
        return cadena;
    }

    else if (_instruccion.tipo_dato === TIPO_DATO.LISTA) {
        const id = _instruccion.id;
        const simbolo = _ambito.getSimbolo(id);
        if (simbolo) {
            if (_instruccion.posicion != null) { // Modificación de una posición de la lista
                var pos = Operacion(_instruccion.posicion, _ambito);
                if (pos.err) { cadena.err = pos.err; return cadena; }
                if (pos.tipo != TIPO_DATO.ENTERO) {
                    cadena.err = `Error: el índice '${String(pos.valor)}' no es de tipo numérico.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                    return cadena;
                }
                var valor = Operacion(_instruccion.valor, _ambito);
                if (valor.err) { cadena.err = valor.err; return cadena; }
                var tipoLista = simbolo.valor[0].tipo;
                if (tipoLista === valor.tipo) {
                    if (simbolo.valor[0].valor === 'EMPTY') {
                        cadena.err = `Error: la lista '${String(id)}' se encuentra vacía.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                        return cadena;
                    }
                    else if (pos.valor < 0 || pos.valor >= simbolo.valor.length) {
                        cadena.err = `Error: la posición '${String(pos.valor)}' se encuentra fuera del tamaño de la lista.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                        return cadena;
                    }
                    simbolo.valor[pos.valor] = valor;
                    _ambito.actualizar(id, simbolo)
                    return cadena;
                }
                cadena.err = "Error: No es posible asignar un valor de tipo " + valor.tipo + " dentro de la lista '" + id + "'\nque es de tipo " + tipoLista + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
                return cadena;
            }
            else { // Agregación de item a la lista
                var valor = Operacion(_instruccion.valor, _ambito);
                if (valor.err) { cadena.err = valor.err; return cadena; }
                var tipoLista = simbolo.valor[0].tipo;
                // console.log(_ambito.getSimbolo('lista2'), 62222222222, simbolo);
                if (tipoLista === valor.tipo) {
                    if (simbolo.valor[0].valor === 'EMPTY') {
                        simbolo.valor[0] = valor;
                        // console.log(_ambito.getSimbolo('lista2'), 62222222222, simbolo);
                    }
                    else {
                        simbolo.valor.push(valor);
                        // console.log(_ambito.getSimbolo('lista2'), 62222222222, simbolo);
                    }
                    _ambito.actualizar(id, simbolo)
                    // console.log(_ambito.getSimbolo('lista2'), 62222222222, id);
                    return cadena
                }
                cadena.err = "Error: No es posible agregar un valor de tipo " + valor.tipo + " a la lista '" + id + "'\nque es de tipo " + tipoLista + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
                return cadena;
            }
        }
        cadena.err = `Error: la lista '${String(id)}' no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
        return cadena;
    }

    else {
        const id = _instruccion.id;
        const simbolo = _ambito.getSimbolo(id)
        if (simbolo) {
            var valor = Operacion(_instruccion.expresion, _ambito)
            if (valor.err) { cadena.err = valor.err; return cadena; }
            if (valor.retorno) cadena.cadena = valor.cadena;
            if (simbolo.tipo === TIPO_DATO.VECTOR) {
                if (valor.tipo != TIPO_DATO.VECTOR) {
                    cadena.err = `Error: No es posible asignar un valor de tipo ${valor.tipo} al vector '${id}'.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                    return cadena;
                }
                var tipoVector = simbolo.valor[0].tipo;
                if (tipoVector === valor.valor[0].tipo) {
                    simbolo.valor = valor.valor;
                    _ambito.actualizar(id, simbolo)
                    return cadena;
                }
                else {
                    cadena.err = `Error: No es posible asignar un vector de tipo ${valor.valor[0].tipo} al vector '${id}' que es de tipo ${tipoVector}.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                    return cadena;
                }
            }

            if (simbolo.tipo === TIPO_DATO.LISTA) {
                if (valor.tipo != TIPO_DATO.LISTA) {
                    cadena.err = `Error: No es posible asignar un valor de tipo ${valor.tipo} a la lista '${id}'.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                    return cadena;
                }
                var tipoLista = simbolo.valor[0].tipo;
                if (tipoLista === valor.valor[0].tipo) {
                    simbolo.valor = valor.valor;
                    _ambito.actualizar(id, simbolo)
                    return cadena;
                }
                else {
                    cadena.err = `Error: No es posible asignar una lista de tipo ${valor.valor[0].tipo} a la lista '${id}' que es de tipo ${tipoLista}.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
                    return cadena;
                }
            }

            var tipos = {
                tipoSimbolo: simbolo.tipo,
                tipoNuevoValor: valor.retorno ? valor.retorno.tipo : valor.tipo
            }
            if (tipos.tipoSimbolo === tipos.tipoNuevoValor) {
                if (valor.retorno) simbolo.valor = valor.retorno.valor;
                else simbolo.valor = valor.valor;
                _ambito.actualizar(id, simbolo)
                return cadena;
            }
            cadena.err = "Error: No es posible asignar un valor de tipo " + tipos.tipoNuevoValor + " a la variable '" + id + "' que es de tipo " + tipos.tipoSimbolo + ".\nLínea: " + _instruccion.linea + " Columna: " + _instruccion.columna + "\n";
            return cadena;
        }
        cadena.err = `Error: la variable '${String(id)}' no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
        return cadena;
    }

}

module.exports = Asignacion