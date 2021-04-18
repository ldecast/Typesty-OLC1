const TIPO_DATO = require("../Enum/Tipados");
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
    },

    nuevoCaso: function (_expresion, _instrucciones, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.CASO,
            expresion: _expresion,
            instrucciones: _instrucciones,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoSwitch: function (_expresionEvaluar, _casosComparar, _casoDefault, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.SWITCH,
            expresionEvaluar: _expresionEvaluar,
            casosComparar: _casosComparar,  //arreglo de objetos de tipo nuevoCaso
            casoDefault: _casoDefault,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoTernario: function (_condicion, _expresionA, _expresionB, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.TERNARIO,
            condicion: _condicion,
            expresionA: _expresionA,
            expresionB: _expresionB,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoCasteo: function (_tipo, _expresion, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.CASTEO,
            nuevoTipo: _tipo,
            expresion: _expresion,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoVector: function (_tipo1, _tipo2, _id, _tamaño, _valores, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.DECLARACION,
            tipo_dato: TIPO_DATO.VECTOR,
            id: _id,
            tamaño: _tamaño, //tamaño del vector en caso no venga una lista de valores
            valores: _valores, //arreglo de valores que deben de coincidir con el tipo del vector
            tipo_dato1: _tipo1, //tipo del vector
            tipo_dato2: _tipo2, //tipo del vector deben coincidir o es error semantico
            linea: _linea,
            columna: _columna
        }
    },

    modificacionVector: function (_id, _posicion, _valor, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.ASIGNACION,
            tipo_dato: TIPO_DATO.VECTOR,
            id: _id,
            posicion: _posicion,
            valor: _valor,
            linea: _linea,
            columna: _columna
        }
    },

    accesoVector: function (_id, _posicion, _linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.ACCESO,
            tipo_dato: TIPO_DATO.VECTOR,
            id: _id,
            posicion: _posicion,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoContinue: function (_linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.CONTINUE,
            linea: _linea,
            columna: _columna
        }
    },

    nuevoBreak: function (_linea, _columna) {
        return {
            tipo: TIPO_INSTRUCCION.BREAK,
            linea: _linea,
            columna: _columna
        }
    }
}

module.exports = Instruccion