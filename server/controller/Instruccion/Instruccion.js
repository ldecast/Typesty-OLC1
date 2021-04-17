const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones");

function nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna) {
    return {
        opIzq: _opIzq,
        opDer: _opDer,
        tipo: _tipo,
        linea: _linea,
        columna: _columna
    }
}

const Instruccion = {
    nuevoImprimir: function (_expresion, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.PRINT,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoValor: function (_valor, _tipo, _linea, _columna) {
        return {
            tipo: _tipo,
            valor: _valor,
            linea: _linea,
            columna: _columna
        }
    },

    nuevaOperacionBinaria: function (_opIzq, _opDer, _tipo, _linea, _columna) {
        return nuevaOperacion(_opIzq, _opDer, _tipo, _linea, _columna)
    },

    nuevaDeclaracion: function (_id, _valor, _tipo, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.DECLARACION,
            id: _id,
            valor: _valor,
            tipo_dato: _tipo,
            linea: _linea,
            columna: _columna
        }
    },

    nuevaAsignacion: function (_id, _expresion, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },

    nuevaAgregacion: function (_id, _expresion, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.AGREGACION,
            id: _id,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoWhile: function (_expresion, _instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.WHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoFor: function (_variable, _expresion, _instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.FOR,
            variable: _variable,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoDoWhile: function (_expresion, _instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.DOWHILE,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoIf: function (_expresion, _instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.IF,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoIfElse: function (_expresion, _instruccionesIF, _instruccionesELSE, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.IF_ELSE,
            expresion: _expresion,
            instruccionesIF: _instruccionesIF,
            instruccionesELSE: _instruccionesELSE,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoElseIf: function (_expresion, _instruccionesIF, _instruccionesELSEIF, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.ELSE_IF,
            expresion: _expresion,
            instruccionesIF: _instruccionesIF,
            instruccionesELSEIF: _instruccionesELSEIF,
            linea: _linea,
            columna: _columna
        }
    }
}

module.exports = Instruccion