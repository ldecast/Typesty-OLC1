const procesarCadena = require("../../model/Operacion/procesarCadena")

function imprimir(_instruccion, _ambito) {
    const cadena = procesarCadena(_instruccion.expresion, _ambito);
    // console.log(cadena,88888888888)
    return cadena;
}

module.exports = imprimir