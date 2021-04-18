const TIPO_DATO = require("../../controller/Enum/Tipados");
const TIPO_OPERACION = require("../../controller/Enum/TipoOperaciones")
const TIPO_VALOR = require("../../controller/Enum/TipoValores");
const TIPO_INSTRUCCION = require("../../controller/Enum/TipoInstrucciones")

function Logica(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.ENTERO || _expresion.tipo === TIPO_VALOR.DOBLE || _expresion.tipo === TIPO_VALOR.BOOLEANO ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
        const ValorExpresion = require("./ValorExpresion")
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
        const Relacional = require("./Relacional")
        return Relacional(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA
        || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION || _expresion.tipo === TIPO_OPERACION.DIVISION
        || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO
        || _expresion.tipo === TIPO_OPERACION.NEGACION) {
        const Aritmetica = require("./Aritmetica");
        return Aritmetica(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_INSTRUCCION.ACCESO) {
        switch (_expresion.tipo_dato) {
            case TIPO_DATO.VECTOR:
                const { AccesoVector } = require("./Acceso");
                return AccesoVector(_expresion, _ambito);
            case TIPO_DATO.LISTA:
                const { AccesoLista } = require("./Acceso");
                return AccesoLista(_expresion, _ambito);
        }
    }
    else if (_expresion.tipo === TIPO_OPERACION.OR) {
        return or(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.AND) {
        return and(_expresion.opIzq, _expresion.opDer, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.NOT) {
        return not(_expresion.opIzq, null, _ambito)
    }
}

function or(_opIzq, _opDer, _ambito) {
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)
    if (opIzq.tipo === TIPO_DATO.BOOLEANO || opDer.tipo === TIPO_DATO.BOOLEANO) {
        var resultado = false;
        var op1, op2;
        if (opIzq.tipo === TIPO_DATO.BOOLEANO)
            op1 = opIzq.valor;
        else
            op1 = false;

        if (opDer.tipo === TIPO_DATO.BOOLEANO)
            op2 = opDer.valor;
        else
            op2 = false;

        if (op1 || op2) {
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    return {
        valor: respuesta + "\nError semántico: no se puede comparar el valor de tipo " + opIzq.tipo + "\ncon el valor de tipo " + opDer.tipo + ".\nLínea: " + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function and(_opIzq, _opDer, _ambito) {
    const opIzq = Logica(_opIzq, _ambito)
    const opDer = Logica(_opDer, _ambito)
    if (opIzq.tipo === TIPO_DATO.BOOLEANO || opDer.tipo === TIPO_DATO.BOOLEANO) {
        var resultado = false;
        var op1, op2;
        if (opIzq.tipo === TIPO_DATO.BOOLEANO)
            op1 = opIzq.valor;
        else
            op1 = false;

        if (opDer.tipo === TIPO_DATO.BOOLEANO)
            op2 = opDer.valor;
        else
            op2 = false;

        if (op1 && op2) {
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    return {
        valor: respuesta + "\nError semántico: no se puede comparar el valor de tipo " + opIzq.tipo + "\ncon el valor de tipo " + opDer.tipo + ".\nLínea: " + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function not(_opIzq, _opDer, _ambito) {
    const opIzq = Logica(_opIzq, _ambito)
    var resultado = false;
    if (opIzq.tipo === TIPO_DATO.BOOLEANO) {
        resultado = !opIzq.valor;
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "")
    return {
        valor: respuesta + "\nError semántico: no se puede negar el valor de tipo " + opIzq.tipo + "\nporque no es booleano.\nLínea: " + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Logica