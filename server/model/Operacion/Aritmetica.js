const TIPO_DATO = require("../../controller/Enum/Tipados");
const TIPO_OPERACION = require("../../controller/Enum/TipoOperaciones")
const TIPO_VALOR = require("../../controller/Enum/TipoValores")
const TipoResultado = require("./TipoResultado")

function Aritmetica(_expresion, _ambito) {
    if (_expresion.tipo === TIPO_VALOR.ENTERO || _expresion.tipo === TIPO_VALOR.DOBLE || _expresion.tipo === TIPO_VALOR.BOOLEANO ||
        _expresion.tipo === TIPO_VALOR.CARACTER || _expresion.tipo === TIPO_VALOR.CADENA || _expresion.tipo === TIPO_VALOR.IDENTIFICADOR) {
        const ValorExpresion = require("./ValorExpresion")
        return ValorExpresion(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.IGUALIGUAL || _expresion.tipo === TIPO_OPERACION.DIFERENTE ||
        _expresion.tipo === TIPO_OPERACION.MENOR || _expresion.tipo === TIPO_OPERACION.MENORIGUAL ||
        _expresion.tipo === TIPO_OPERACION.MAYOR || _expresion.tipo === TIPO_OPERACION.MAYORIGUAL) {
        const Relacional = require("./Relacional");
        return Relacional(_expresion, _ambito)
    }
    else if (_expresion.tipo === TIPO_OPERACION.OR || _expresion.tipo === TIPO_OPERACION.AND || _expresion.tipo === TIPO_OPERACION.NOT) {
        const Logica = require("./Logica");
        return Logica(_expresion, _ambito)
    }
    else {
        switch (_expresion.tipo) {
            case TIPO_OPERACION.SUMA:
                return suma(_expresion.opIzq, _expresion.opDer, _ambito)

            case TIPO_OPERACION.RESTA:
                return resta(_expresion.opIzq, _expresion.opDer, _ambito)

            case TIPO_OPERACION.MULTIPLICACION:
                return multiplicacion(_expresion.opIzq, _expresion.opDer, _ambito)

            case TIPO_OPERACION.DIVISION:
                return division(_expresion.opIzq, _expresion.opDer, _ambito)

            case TIPO_OPERACION.POTENCIA:
                return potencia(_expresion.opIzq, _expresion.opDer, _ambito)

            case TIPO_OPERACION.MODULO:
                return modulo(_expresion.opIzq, _expresion.opDer, _ambito)

            case TIPO_OPERACION.NEGACION:
                return negacion(_expresion.opIzq, _ambito)

            default:
                break;
        }
    }
}

function suma(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, TIPO_OPERACION.SUMA)
    var op1, op2, resultado;
    if (tipoRes != null) {
        switch (tipoRes) {
            case TIPO_DATO.ENTERO:
                op1 = 0;
                op2 = 0;
                if (opIzq.tipo == TIPO_DATO.CARACTER)
                    op1 = opIzq.valor.charCodeAt(0);
                else
                    op1 = Number(opIzq.valor);

                if (opDer.tipo == TIPO_DATO.CARACTER)
                    op2 = opDer.valor.charCodeAt(0);
                else
                    op2 = Number(opDer.valor);
                resultado = op1 + op2;
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            case TIPO_DATO.DOBLE:
                op1 = 0.0;
                op2 = 0.0;
                if (opIzq.tipo == TIPO_DATO.CARACTER)
                    op1 = opIzq.valor.charCodeAt(0);
                else
                    op1 = Number(opIzq.valor);

                if (opDer.tipo == TIPO_DATO.CARACTER)
                    op2 = opDer.valor.charCodeAt(0);
                else
                    op2 = Number(opDer.valor);
                resultado = op1 + op2;
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            case TIPO_DATO.CADENA:
                resultado = opIzq.valor.toString() + opDer.valor.toString();
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            default:
                break;
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la operación suma.\nLínea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function resta(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, TIPO_OPERACION.RESTA)
    var op1, op2, resultado;
    if (tipoRes != null) {
        switch (tipoRes) {
            case TIPO_DATO.ENTERO:
                op1 = 0;
                op2 = 0;
                if (opIzq.tipo == TIPO_DATO.CARACTER)
                    op1 = opIzq.valor.charCodeAt(0);
                else
                    op1 = Number(opIzq.valor);

                if (opDer.tipo == TIPO_DATO.CARACTER)
                    op2 = opDer.valor.charCodeAt(0);
                else
                    op2 = Number(opDer.valor);
                resultado = op1 - op2;
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            case TIPO_DATO.DOBLE:
                op1 = 0.0;
                op2 = 0.0;
                if (opIzq.tipo == TIPO_DATO.CARACTER)
                    op1 = opIzq.valor.charCodeAt(0);
                else
                    op1 = Number(opIzq.valor);

                if (opDer.tipo == TIPO_DATO.CARACTER)
                    op2 = opDer.valor.charCodeAt(0);
                else
                    op2 = Number(opDer.valor);
                resultado = op1 - op2;
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            default:
                break;
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la operación resta.\nLínea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function multiplicacion(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, TIPO_OPERACION.MULTIPLICACION)
    var op1, op2, resultado;
    if (tipoRes != null) {
        switch (tipoRes) {
            case TIPO_DATO.ENTERO:
                op1 = 0;
                op2 = 0;
                if (opIzq.tipo == TIPO_DATO.CARACTER)
                    op1 = opIzq.valor.charCodeAt(0);
                else
                    op1 = Number(opIzq.valor);

                if (opDer.tipo == TIPO_DATO.CARACTER)
                    op2 = opDer.valor.charCodeAt(0);
                else
                    op2 = Number(opDer.valor);
                resultado = op1 * op2;
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            case TIPO_DATO.DOBLE:
                op1 = 0.0;
                op2 = 0.0;
                if (opIzq.tipo == TIPO_DATO.CARACTER)
                    op1 = opIzq.valor.charCodeAt(0);
                else
                    op1 = Number(opIzq.valor);

                if (opDer.tipo == TIPO_DATO.CARACTER)
                    op2 = opDer.valor.charCodeAt(0);
                else
                    op2 = Number(opDer.valor);
                resultado = op1 * op2;
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            default:
                break;
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la operación multiplicación.\nLínea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function division(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, TIPO_OPERACION.DIVISION)
    var op1, op2, resultado;
    if (tipoRes != null) {
        switch (tipoRes) {

            case TIPO_DATO.DOBLE:
                op1 = 0.0;
                op2 = 0.0;
                if (opIzq.tipo == TIPO_DATO.CARACTER)
                    op1 = opIzq.valor.charCodeAt(0);
                else
                    op1 = Number(opIzq.valor);

                if (opDer.tipo == TIPO_DATO.CARACTER)
                    op2 = opDer.valor.charCodeAt(0);
                else
                    op2 = Number(opDer.valor);
                if (op2 == 0) {
                    return {
                        valor: '\nError: no es permitida la división entre 0.\nLínea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
                        tipo: null,
                        linea: _opIzq.linea,
                        columna: _opIzq.columna
                    }
                }
                resultado = op1 / op2;
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            default:
                break;
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la operación división.\nLínea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function potencia(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, TIPO_OPERACION.POTENCIA)
    var op1, op2, resultado;
    if (tipoRes != null) {
        switch (tipoRes) {
            case TIPO_DATO.ENTERO:
                op1 = 0;
                op2 = 0;
                if (opIzq.tipo == TIPO_DATO.CARACTER)
                    op1 = opIzq.valor.charCodeAt(0);
                else
                    op1 = Number(opIzq.valor);

                if (opDer.tipo == TIPO_DATO.CARACTER)
                    op2 = opDer.valor.charCodeAt(0);
                else
                    op2 = Number(opDer.valor);
                resultado = op1 ** op2;
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            case TIPO_DATO.DOBLE:
                op1 = 0.0;
                op2 = 0.0;
                if (opIzq.tipo == TIPO_DATO.CARACTER)
                    op1 = opIzq.valor.charCodeAt(0);
                else
                    op1 = Number(opIzq.valor);

                if (opDer.tipo == TIPO_DATO.CARACTER)
                    op2 = opDer.valor.charCodeAt(0);
                else
                    op2 = Number(opDer.valor);
                resultado = op1 ** op2;
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            default:
                break;
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la operación potencia.\nLínea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function modulo(_opIzq, _opDer, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const opDer = Aritmetica(_opDer, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, opDer.tipo, TIPO_OPERACION.MODULO)
    var op1, op2, resultado;
    if (tipoRes != null) {
        switch (tipoRes) {

            case TIPO_DATO.DOBLE:
                op1 = 0.0;
                op2 = 0.0;
                if (opIzq.tipo == TIPO_DATO.CARACTER)
                    op1 = opIzq.valor.charCodeAt(0);
                else
                    op1 = Number(opIzq.valor);

                if (opDer.tipo == TIPO_DATO.CARACTER)
                    op2 = opDer.valor.charCodeAt(0);
                else
                    op2 = Number(opDer.valor);
                resultado = op1 % op2;
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            default:
                break;
        }
    }
    var respuesta = (opIzq.tipo === null ? opIzq.valor : "") + (opDer.tipo === null ? opDer.valor : "")
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la operación módulo.\nLínea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

function negacion(_opIzq, _ambito) {
    const opIzq = Aritmetica(_opIzq, _ambito)
    const tipoRes = TipoResultado(opIzq.tipo, null, TIPO_OPERACION.NEGACION)
    var resultado;
    if (tipoRes != null) {
        switch (tipoRes) {
            case TIPO_DATO.ENTERO:
                resultado = 0 - Number(opIzq.valor)
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            case TIPO_DATO.DOBLE:
                resultado = 0.0 - Number(opIzq.valor)
                return {
                    valor: resultado,
                    tipo: tipoRes,
                    linea: _opIzq.linea,
                    columna: _opIzq.columna
                }

            default:
                break;
        }
    }
    var respuesta = opIzq.tipo === null ? opIzq.valor : "";
    return {
        valor: respuesta + '\nError semántico: no se puede realizar la operación negación unaria.\nLínea: ' + _opIzq.linea + " Columna: " + _opIzq.columna + "\n",
        tipo: null,
        linea: _opIzq.linea,
        columna: _opIzq.columna
    }
}

module.exports = Aritmetica