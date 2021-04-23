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
    var cadena = ""
    var retorno;
    var brk = false;
    _instrucciones.forEach(instruccion => {
        if (!brk) {
            if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
                cadena += Imprimir(instruccion, _ambito) + '\n'
                console.log(cadena)
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
                var mensaje = Declaracion(instruccion, _ambito)
                if (mensaje != null) {
                    cadena += mensaje + '\n'
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                var mensaje = Asignacion(instruccion, _ambito)
                if (mensaje != null) {
                    cadena += mensaje + '\n'
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
                var mensaje = CicloWhile(instruccion, _ambito)
                if (mensaje != null) {
                    cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.FOR) {
                var mensaje = CicloFor(instruccion, _ambito)
                if (mensaje != null) {
                    cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.DOWHILE) {
                var mensaje = CicloDoWhile(instruccion, _ambito)
                if (mensaje != null) {
                    cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.IF) {
                var mensaje = If(instruccion, _ambito)
                if (mensaje != null) {
                    cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE) {
                var mensaje = IfElse(instruccion, _ambito)
                if (mensaje != null) {
                    cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.ELSE_IF) {
                var mensaje = ElseIf(instruccion, _ambito)
                if (mensaje != null) {
                    cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.SWITCH) {
                var mensaje = Switch(instruccion, _ambito)
                if (mensaje != null) {
                    cadena += mensaje
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA) {
                const Exec = require("./Exec")
                const Operacion = require("../../model/Operacion/Operacion");
                var global = _ambito.getGlobal();
                for (let i = 0; i < instruccion.lista_valores.length; i++) {
                    const expresion = instruccion.lista_valores[i];
                    var op = Operacion(expresion, _ambito);
                    if (op.err) return op.err;
                    instruccion.lista_valores[i].tipo = getTipado(op.tipo);
                    instruccion.lista_valores[i].valor = op.valor;
                }
                var mensaje = Exec(instruccion, global)
                if (mensaje != null) {
                    cadena += mensaje
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
                // console.log(expresion,"chale")
                //expresion.valor = cadena + expresion.valor;
                cadena = expresion;
            }
        }
    });
    // console.log(cadena)
    return cadena   // habra que retornar un objeto { mensaje: cadena, retorno: expresion }
}

function getTipado(tipo_valor) {
    switch (tipo_valor) {
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
        default:
            return null;
    }
}

module.exports = Bloque