const Operacion = require("./Operacion")

function accesoVector(_instruccion, _ambito) {
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id);
    if (existe) {
        var pos = Operacion(_instruccion.posicion, _ambito);
        var simbolo = _ambito.getSimbolo(id);
        if (pos.valor < 0 || pos.valor >= simbolo.valor.length) {
            return { err: `Error: el índice '${String(pos.valor)}' se encuentra fuera del tamaño del vector.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` };
        }
        var valor = simbolo.valor[pos.valor];
        return valor;
    }
    return `Error: el vector '${String(id)}' no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
}

function accesoLista(_instruccion, _ambito) {
    const id = _instruccion.id;
    const existe = _ambito.existeSimbolo(id);
    if (existe) {
        var pos = Operacion(_instruccion.posicion, _ambito);
        var simbolo = _ambito.getSimbolo(id);
        if (pos.valor < 0 || pos.valor >= simbolo.valor.length) {
            return { err: `Error: el índice '${String(pos.valor)}' se encuentra fuera del tamaño de la lista.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` };
        }
        var valor = simbolo.valor[pos.valor];
        return valor;
    }
    return `Error: la lista '${String(id)}' no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`;
}

module.exports = {
    AccesoVector: accesoVector,
    AccesoLista: accesoLista
};