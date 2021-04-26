const TIPO_INSTRUCCION = require("../../controller/Enum/TipoInstrucciones");
const Asignacion = require("./Asignacion");
const Imprimir = require("./Print");
const Declaracion = require("./Declaracion");
const CicloWhile = require("./While");
const CicloFor = require("./For");
const CicloDoWhile = require("./DoWhile");
const { If, IfElse, ElseIf } = require('./If');
const Switch = require("./Switch");
const TIPO_VALOR = require("../Enum/TipoValores");
const TIPO_DATO = require("../Enum/Tipados");

function Bloque(_instrucciones, _ambito) {
    var cadena = { cadena: "", retorno: null }
    var brk = false;
    _instrucciones.forEach(instruccion => {
        if (!brk) {
            // console.log(instruccion,2222222);
            if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
                cadena.cadena += Imprimir(instruccion, _ambito) + '\n'
                // console.log(cadena, "MJM")
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
                var mensaje = Declaracion(instruccion, _ambito)
                if (mensaje != null) {
                    cadena.cadena += mensaje + '\n'
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                var mensaje = Asignacion(instruccion, _ambito)
                if (mensaje != null) {
                    cadena.cadena += mensaje + '\n'
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
                var mensaje = CicloWhile(instruccion, _ambito)
                if (mensaje != null) {
                    cadena.cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.FOR) {
                var mensaje = CicloFor(instruccion, _ambito)
                if (mensaje != null) {
                    cadena.cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.DOWHILE) {
                var mensaje = CicloDoWhile(instruccion, _ambito)
                if (mensaje != null) {
                    cadena.cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
                var mensaje = If(instruccion, _ambito)
                if (mensaje.cadena) {
                    // console.log(9999999,mensaje,9999999)
                    cadena.cadena += mensaje.cadena
                }
                if (mensaje.retorno) cadena.retorno += mensaje.retorno
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE) {
                var mensaje = IfElse(instruccion, _ambito)
                if (mensaje != null) {
                    cadena.cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.ELSE_IF) {
                var mensaje = ElseIf(instruccion, _ambito)
                if (mensaje != null) {
                    cadena.cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.SWITCH) {
                var mensaje = Switch(instruccion, _ambito)
                if (mensaje != null) {
                    cadena.cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA) {
                const Exec = require("./Exec")
                const Operacion = require("../../model/Operacion/Operacion");
                var global = _ambito.getGlobal();
                for (let i = 0; i < instruccion.lista_valores.length; i++) {
                    const expresion = instruccion.lista_valores[i];
                    // console.log(expresion, 1222222222333333)
                    const op = Operacion(expresion, _ambito);
                    if (op.err) return op.err
                    instruccion.lista_valores[i] = op;
                    // instruccion.lista_valores[i].valor = op.valor;
                }
                var mensaje = Exec(instruccion, global)
                if (mensaje != null) {
                    if (mensaje.err) cadena.cadena += mensaje.err;
                    else
                        cadena.cadena += mensaje.cadena
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.BREAK) {
                brk = true;
                // while (_ambito.tipo != "ciclo" && _ambito.tipo != "switch") { if break is not in ambito.tipo==ciclo return error //agregar en jison otra produccion solo para break y continue
                //     _ambito.eliminarAmbito();
                //     _ambito = _ambito.anterior;
                // }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.RETURN) {
                const Operacion = require("../../model/Operacion/Operacion");
                brk = true;
                var expresion;
                expresion = Operacion(instruccion.expresion, _ambito);
                // console.log(expresion,222222222222222)
                //expresion.valor = cadena + expresion.valor;
                cadena.retorno = expresion;
                console.log(cadena.retorno, "ESTO RETORNA")
            }
        }
    });
    // console.log(cadena, 8888889)
    return cadena
}

function getTipado(operacion) {
    switch (operacion.tipo) {
        case TIPO_DATO.ENTERO:
            return TIPO_VALOR.ENTERO
        case TIPO_DATO.DOBLE:
            return TIPO_VALOR.DOBLE
        case TIPO_DATO.CARACTER:
            return TIPO_VALOR.CARACTER
        case TIPO_DATO.CADENA:
            return TIPO_VALOR.CADENA
        case TIPO_DATO.BOOLEANO:
            return TIPO_VALOR.BOOLEANO
        case TIPO_DATO.VECTOR:
            return TIPO_VALOR.IDENTIFICADOR
        case TIPO_DATO.LISTA:
            return { lista: operacion.valor[0].tipo }
        default:
            // console.log(operacion,99999999999)
            return 'NINGUN TIPO';
    }
}

module.exports = Bloque