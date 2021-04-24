const procesarCadena = require("../../model/Operacion/procesarCadena")

function imprimir(_instruccion, _ambito) {
    const cadena = procesarCadena(_instruccion.expresion, _ambito);
    console.log(cadena,"DDDDDDDDDDD")
    if (cadena.err)
        return cadena.err;
    if (cadena.print_val)
        return cadena.print_val;
    return cadena.valor;
}

module.exports = imprimir