const Ambito = require("../../model/Ambito/Ambito");
const TIPO_DATO = require("../Enum/Tipados");
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones");
const Bloque = require("./Bloque")

function Exec(_instruccion, _ambito) {
    var funcionEjecutar = _ambito.getFuncion(_instruccion.nombre);
    if (funcionEjecutar != null) {
        var nuevoAmbito = new Ambito(_ambito, 'exec')
        var cadena = "";
        if (funcionEjecutar.lista_parametros != null || _instruccion.lista_valores != null) {
            var x = funcionEjecutar.lista_parametros === null ? 0 : funcionEjecutar.lista_parametros.length; //cantidad de parámetros de la función
            var y = _instruccion.lista_valores === null ? 0 : _instruccion.lista_valores.length; //cantidad de valores en la llamada
            if (x != y) {
                return { err: `Error: La cantidad de parámetros en la llamada debe corresponder a con la declaración del método o función.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
            }
            for (let i = 0; i < x; i++) {
                var asignacion = { // Creando la instrucción para declarar un parámetro
                    tipo: TIPO_INSTRUCCION.DECLARACION,
                    id: funcionEjecutar.lista_parametros[i].id,
                    valor: _instruccion.lista_valores[i],
                    tipo_dato: funcionEjecutar.lista_parametros[i].tipo_dato,
                    linea: funcionEjecutar.linea,
                    columna: funcionEjecutar.columna,
                    isParam: true
                }
                const Declaracion = require("./Declaracion");
                ex = Declaracion(asignacion, nuevoAmbito);
                if (ex.cadena)
                    cadena += ex.cadena;
                if (ex.err) { return ex; }
            }
        }
        var retorno = Bloque(funcionEjecutar.instrucciones, nuevoAmbito);
        retorno.cadena += cadena;
        if (retorno.retorno != null) {
            if (retorno.retorno.retorno) {
                retorno.cadena = retorno.retorno.cadena;
                retorno.retorno = retorno.retorno.retorno;
            }
            if (funcionEjecutar.retorno && retorno.retorno === "RETORNO VACIO") {
                return { err: `Error: La función '${funcionEjecutar.id}' debe retornar un valor de tipo ${funcionEjecutar.retorno} y no VOID.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
            }
            if (funcionEjecutar.retorno) {
                if (funcionEjecutar.retorno.vector) {
                    if (retorno.retorno.tipo != TIPO_DATO.VECTOR)
                        return { err: `Error: La función '${funcionEjecutar.id}' debe retornar un VECTOR y no ${retorno.retorno.tipo}.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
                    if (retorno.retorno.valor[0].tipo != funcionEjecutar.retorno.vector)
                        return { err: `Error: La función '${funcionEjecutar.id}' debe retornar un vector de tipo ${funcionEjecutar.retorno.vector} y no ${retorno.retorno.valor[0].tipo}.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
                }
                else if (funcionEjecutar.retorno.lista) {
                    if (retorno.retorno.tipo != TIPO_DATO.LISTA)
                        return { err: `Error: La función '${funcionEjecutar.id}' debe retornar una LISTA y no ${retorno.retorno.tipo}.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
                    if (retorno.retorno.valor[0].tipo != funcionEjecutar.retorno.lista)
                        return { err: `Error: La función '${funcionEjecutar.id}' debe retornar una lista de tipo ${funcionEjecutar.retorno.lista} y no ${retorno.retorno.valor[0].tipo}.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
                }
                // console.log(funcionEjecutar.retorno, 888888888)
                else if (funcionEjecutar.retorno != retorno.retorno.tipo)
                    return { err: `Error: La función '${funcionEjecutar.id}' debe retornar un valor de tipo ${funcionEjecutar.retorno} y no ${retorno.retorno.tipo}.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
            }
        }
        return retorno;
    }
    return { err: `Error: El método o la función ${_instruccion.nombre} no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
}

module.exports = Exec
