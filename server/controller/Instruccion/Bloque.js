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
        // console.log(instruccion,9827733737)
        if (!brk) {
            if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
                var mensaje = Imprimir(instruccion, _ambito)
                if (mensaje) {
                    if (mensaje.print_val)
                        cadena.cadena += mensaje.print_val + '\n'
                    else if (mensaje.valor != null)
                        cadena.cadena += mensaje.valor + '\n'
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena // + '\n'
                    // if (mensaje.err)
                    //     cadena.cadena += mensaje.err + '\n'
                    if (mensaje.retorno)
                        cadena.cadena += mensaje.retorno.valor + '\n'
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.DECLARACION) {
                var mensaje = Declaracion(instruccion, _ambito)
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
                    // if (mensaje.retorno)
                    //     cadena.retorno += mensaje.retorno
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                var mensaje = Asignacion(instruccion, _ambito)
                // console.log(mensaje, 4444444444444)
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
                    if (mensaje.retorno)
                        cadena.retorno = mensaje.retorno
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
                var mensaje = CicloWhile(instruccion, _ambito)
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
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
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
                    if (mensaje.retorno)
                        cadena.retorno = mensaje.retorno
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.IF_ELSE) {
                var mensaje = IfElse(instruccion, _ambito)
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
                    if (mensaje.retorno)
                        cadena.retorno = mensaje.retorno
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.ELSE_IF) {
                var mensaje = ElseIf(instruccion, _ambito)
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
                    if (mensaje.retorno)
                        cadena.retorno = mensaje.retorno
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
                var mensaje = Exec(instruccion, _ambito)
                // console.log(mensaje,111233333)
                if (mensaje.cadena)
                    cadena.cadena += mensaje.cadena
                if (mensaje.err)
                    cadena.cadena += mensaje.err
                // if (mensaje.retorno)
                //     cadena.cadena += mensaje.retorno.cadena
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
                // console.log(expresion,11111111);
                if (expresion.err) cadena.cadena += expresion.err;
                if (expresion.cadena) cadena.cadena += expresion.cadena;
                cadena.retorno = expresion;
                // console.log(cadena.retorno, "ESTO RETORNA")
            }
            else{
                console.log("EEEEEEEEEERRRORRRRRRRR")
            }
        }
    });
    // console.log(cadena, 8888889)
    return cadena
}

module.exports = Bloque