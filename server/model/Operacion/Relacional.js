const TIPO_DATO = require("../../controller/Enum/Tipados");
const TIPO_OPERACION = require("../../controller/Enum/TipoOperaciones")
const TIPO_VALOR = require("../../controller/Enum/TipoValores");

function Relacional(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.ENTERO || _expresion.tipo === TIPO_VALOR.DOBLE || _expresion.tipo === TIPO_VALOR.BOOLEANO ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
        const ValorExpresion = require("./ValorExpresion");
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.SUMA || _expresion.tipo === TIPO_OPERACION.RESTA
        || _expresion.tipo === TIPO_OPERACION.MULTIPLICACION || _expresion.tipo === TIPO_OPERACION.DIVISION
        || _expresion.tipo === TIPO_OPERACION.POTENCIA || _expresion.tipo === TIPO_OPERACION.MODULO
        || _expresion.tipo === TIPO_OPERACION.NEGACION) {
        const Aritmetica = require("./Aritmetica");
        return Aritmetica(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.NOT) {
        const Logica = require("./Logica");
        return Logica(_expresion, _ambito)
    }
    else {
        switch (_expresion.tipo) {
            case TIPO_OPERACION.IGUALIGUAL:
                return igualigual(_expresion.opIzq, _expresion.opDer, _ambito);

            case TIPO_OPERACION.DIFERENTE:
                return diferente(_expresion.opIzq, _expresion.opDer, _ambito);

            case TIPO_OPERACION.MENOR:
                return menor(_expresion.opIzq, _expresion.opDer, _ambito);

            case TIPO_OPERACION.MENORIGUAL:
                return menorigual(_expresion.opIzq, _expresion.opDer, _ambito);

            case TIPO_OPERACION.MAYOR:
                return mayor(_expresion.opIzq, _expresion.opDer, _ambito);

            case TIPO_OPERACION.MAYORIGUAL:
                return mayorigual(_expresion.opIzq, _expresion.opDer, _ambito);

            default:
                break;
        }
    }
}

function igualigual(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo) {
        var resultado = false
        if (opIzq.valor == opDer.valor) {
            resultado = true
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
        valor: respuesta + `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}.\nLínea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}\n`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function diferente(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if (opIzq.tipo == opDer.tipo) {
        var resultado = false
        if (opIzq.valor != opDer.valor) {
            resultado = true
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "") //true+5+10+5
    return {
        valor: respuesta + `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}.\nLínea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}\n`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function menor(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DOBLE) && (opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DOBLE)) {
        var resultado = false;
        if (opIzq.valor < opDer.valor) {
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if ((opIzq.tipo === TIPO_DATO.CARACTER && (opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DOBLE))) {
        var resultado = false;
        if (opIzq.valor.charCodeAt(0) < opDer.valor) {
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if ((opDer.tipo === TIPO_DATO.CARACTER && (opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DOBLE))) {
        var resultado = false;
        if (opIzq.valor < opDer.valor.charCodeAt(0)) {
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
        valor: respuesta + `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}.\nLínea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}\n`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function menorigual(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DOBLE) && (opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DOBLE)) {
        var resultado = false;
        if (opIzq.valor <= opDer.valor) {
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if ((opIzq.tipo === TIPO_DATO.CARACTER && (opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DOBLE))) {
        var resultado = false;
        if (opIzq.valor.charCodeAt(0) <= opDer.valor) {
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if ((opDer.tipo === TIPO_DATO.CARACTER && (opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DOBLE))) {
        var resultado = false;
        if (opIzq.valor <= opDer.valor.charCodeAt(0)) {
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
        valor: respuesta + `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}.\nLínea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}\n`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function mayor(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DOBLE) && (opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DOBLE)) {
        var resultado = false;
        if (opIzq.valor > opDer.valor) {
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if ((opIzq.tipo === TIPO_DATO.CARACTER && (opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DOBLE))) {
        var resultado = false;
        if (opIzq.valor.charCodeAt(0) > opDer.valor) {
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if ((opDer.tipo === TIPO_DATO.CARACTER && (opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DOBLE))) {
        var resultado = false;
        if (opIzq.valor > opDer.valor.charCodeAt(0)) {
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
        valor: respuesta + `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}.\nLínea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}\n`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function mayorigual(_opIzq, _opDer, _ambito) {
    const opIzq = Relacional(_opIzq, _ambito)
    const opDer = Relacional(_opDer, _ambito)
    if ((opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DOBLE) && (opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DOBLE)) {
        var resultado = false;
        if (opIzq.valor >= opDer.valor) {
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if ((opIzq.tipo === TIPO_DATO.CARACTER && (opDer.tipo === TIPO_DATO.ENTERO || opDer.tipo === TIPO_DATO.DOBLE))) {
        var resultado = false;
        if (opIzq.valor.charCodeAt(0) >= opDer.valor) {
            resultado = true;
        }
        return {
            valor: resultado,
            tipo: TIPO_DATO.BOOLEANO,
            linea: _opIzq.linea,
            columna: _opIzq.columna
        }
    }
    else if ((opDer.tipo === TIPO_DATO.CARACTER && (opIzq.tipo === TIPO_DATO.ENTERO || opIzq.tipo === TIPO_DATO.DOBLE))) {
        var resultado = false;
        if (opIzq.valor >= opDer.valor.charCodeAt(0)) {
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
        valor: respuesta + `\nError semántico: no se puede comparar el valor de tipo ${opIzq.tipo} \ncon el valor de tipo ${opDer.tipo}.\nLínea: +${_opIzq.linea}+" Columna: "+${_opIzq.columna}\n`,
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Relacional