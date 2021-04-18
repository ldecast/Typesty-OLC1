const TIPO_INSTRUCCION = require("../../controller/Enum/TipoInstrucciones");
const Asignacion = require("./Asignacion");
const Imprimir = require("./Print");
const Declaracion = require("./Declaracion");
const CicloWhile = require("./While");
const CicloFor = require("./For");
const CicloDoWhile = require("./DoWhile");
const { If, IfElse, ElseIf } = require('./If');
const Switch = require("./Switch");

function Bloque(_instrucciones, _ambito) {
    var cadena = ""
    var brk = false;
    _instrucciones.forEach(instruccion => {
        if (!brk) {
            if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
                cadena += Imprimir(instruccion, _ambito) + '\n'
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



            else if (instruccion.tipo === TIPO_INSTRUCCION.BREAK) {
                brk = true;
                // while (_ambito.tipo != "ciclo" && _ambito.tipo != "switch") { if break is not in ambito.tipo==ciclo return error //agregar en jison otra produccion solo para break y continue
                //     _ambito.eliminarAmbito();
                //     _ambito = _ambito.anterior;
                // }
            }
        }
    });
    return cadena
}

module.exports = Bloque