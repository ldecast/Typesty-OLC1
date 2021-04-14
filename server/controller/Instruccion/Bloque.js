const TIPO_INSTRUCCION = require("../../controller/Enum/TipoInstrucciones");
const Asignacion = require("./Asignacion");
const Imprimir = require("./Print");
const Declaracion = require("./Declaracion");
// const CicloWhile = require("./While");

function Bloque(_instrucciones, _ambito) {
    var cadena = ""
    _instrucciones.forEach(instruccion => {
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
        // else if (instruccion.tipo === TIPO_INSTRUCCION.WHILE) {
        //     var mensaje = CicloWhile(instruccion, _ambito)
        //     if (mensaje != null) {
        //         cadena += mensaje + '\n'
        //     }
        // }
    });
    return cadena
}

module.exports = Bloque