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
    var cadena = { cadena: "", retorno: null, hasBreak: false, hasContinue: false, hasReturn: false }
    var brk = false;
    _instrucciones.forEach(instruccion => {
        if (!brk) {
            if (instruccion.tipo === TIPO_INSTRUCCION.PRINT) {
                var mensaje = Imprimir(instruccion, _ambito)
                if (mensaje) {
                    if (mensaje.print_val)
                        cadena.cadena += mensaje.print_val + '\n'
                    else if (mensaje.valor != null)
                        cadena.cadena += mensaje.valor + '\n'
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
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
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.ASIGNACION) {
                var mensaje = Asignacion(instruccion, _ambito)
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
                var mensaje = CicloWhile(instruccion, _ambito)
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
                    // if (mensaje.retorno)
                    //     cadena.retorno = mensaje.retorno
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.FOR) {
                var mensaje = CicloFor(instruccion, _ambito)
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
                    // if (mensaje.retorno)
                    //     cadena.retorno = mensaje.retorno
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.DOWHILE) {
                var mensaje = CicloDoWhile(instruccion, _ambito)
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
                    // if (mensaje.retorno)
                    // cadena.retorno = mensaje.retorno
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
                if (mensaje) {
                    if (mensaje.cadena)
                        cadena.cadena += mensaje.cadena
                    if (mensaje.err)
                        cadena.cadena += mensaje.err
                    if (mensaje.retorno)
                        cadena.retorno = mensaje.retorno
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.LLAMADA) {
                const Exec = require("./Exec")
                const Operacion = require("../../model/Operacion/Operacion");
                var mensaje = Exec(instruccion, _ambito)
                if (mensaje.cadena)
                    cadena.cadena += mensaje.cadena
                if (mensaje.err)
                    cadena.cadena += mensaje.err
                // if (mensaje.retorno)
                //     cadena.cadena += mensaje.retorno.cadena
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.BREAK) {
                if (!_ambito.isInsideLoop() && !_ambito.isInsideSwitch()) {
                    cadena.cadena = `Error: se ha encontrado una sentencia BREAK fuera de un ciclo o switch.\nLínea: ${instruccion.linea} Columna: ${instruccion.columna}\n`;
                    cadena.retorno = null;
                    brk = true;
                }
                else {
                    console.log(instruccion)
                    brk = true;
                    cadena.hasBreak = true;
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.CONTINUE) {
                if (!_ambito.isInsideLoop()) {
                    cadena.cadena = `Error: se ha encontrado una sentencia CONTINUE fuera de un ciclo.\nLínea: ${instruccion.linea} Columna: ${instruccion.columna}\n`;
                    cadena.retorno = null;
                    brk = true;
                }
                else {
                    brk = true;
                    cadena.hasContinue = true;
                }
            }
            else if (instruccion.tipo === TIPO_INSTRUCCION.RETURN) {
                const Operacion = require("../../model/Operacion/Operacion");
                brk = true;
                cadena.hasReturn = true;
                if (instruccion.expresion) {
                    var expresion = Operacion(instruccion.expresion, _ambito);
                    if (expresion.err) cadena.cadena += expresion.err;
                    if (expresion.cadena) cadena.cadena += expresion.cadena;
                    cadena.retorno = expresion;
                    // console.log(cadena.retorno, "ESTO RETORNA")
                }
                else
                    cadena.retorno = "RETORNO VACIO";
            }
            else {
                console.log("EEEEEEEEEERRRORRRRRRRR")
            }
        }
    });
    // console.log(cadena, 8888889)
    return cadena
}

module.exports = Bloque