const { Metodo } = require("../../model/Ambito/Funcion_Metodo");
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones");

function DecMetodo(_instruccion, _ambito) {
    const nuevoMetodo = new Metodo(_instruccion.nombre, _instruccion.lista_parametros, _instruccion.instrucciones, _instruccion.linea, _instruccion.columna)
    if (_ambito.existeSimbolo(nuevoMetodo.id) != false) {
        return `Error: Ya existe una variable con el mismo identificador '${nuevoMetodo.id}'\nLínea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}\n`
    }
    else if (_ambito.existeFuncion(nuevoMetodo.id) != false) {
        return `Error: El método '${nuevoMetodo.id}' ya existe.\nLínea: ${nuevoMetodo.linea} Columna: ${nuevoMetodo.columna}\n`
    }
    for (let i = 0; i < _instruccion.instrucciones.length; i++) {
        const instr = _instruccion.instrucciones[i];
        if (instr.tipo === TIPO_INSTRUCCION.RETURN) {
            if (instr.expresion != null)
                return `Error: El método '${nuevoMetodo.id}' tiene un retorno no esperado.\nLínea: ${instr.linea} Columna: ${instr.columna}\n`
        }
    }
    _ambito.addFuncion(nuevoMetodo.id, nuevoMetodo)
    return null
}

module.exports = DecMetodo