const { Funcion } = require("../../model/Ambito/Funcion_Metodo");
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones");

function DecFuncion(_instruccion, _ambito) {
    const nuevaFuncion = new Funcion(_instruccion.nombre, _instruccion.lista_parametros, _instruccion.instrucciones, _instruccion.retorno, _instruccion.linea, _instruccion.columna)
    if (_ambito.existeSimbolo(nuevaFuncion.id) != false) {
        return `Error: Ya existe una variable con el mismo identificador '${nuevaFuncion.id}'\nLínea: ${nuevaFuncion.linea} Columna: ${nuevaFuncion.columna}\n`
    }
    else if (_ambito.existeFuncion(nuevaFuncion.id) != false) {
        return `Error: La función '${nuevaFuncion.id}' ya existe.\nLínea: ${nuevaFuncion.linea} Columna: ${nuevaFuncion.columna}\n`
    }
    var hasReturn = false;
    // console.log(_instruccion.instrucciones);
    for (let i = 0; i < _instruccion.instrucciones.length; i++) {
        const instr = _instruccion.instrucciones[i];
        if (instr.tipo === TIPO_INSTRUCCION.RETURN) {
            hasReturn = true;
            break;
        }
    }
    if (!hasReturn)
        return `Error: La función '${nuevaFuncion.id}' no tiene una sentencia de retorno.\nLínea: ${nuevaFuncion.linea} Columna: ${nuevaFuncion.columna}\n`
    _ambito.addFuncion(nuevaFuncion.id, nuevaFuncion)
    return null
}

module.exports = DecFuncion