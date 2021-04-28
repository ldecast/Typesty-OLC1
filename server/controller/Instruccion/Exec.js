const Ambito = require("../../model/Ambito/Ambito");
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
            if (funcionEjecutar.retorno != retorno.retorno.tipo) {
                return { err: `Error: El retorno de la función '${funcionEjecutar.id}' no concuerda con el retorno de la expresión.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
            }
        }
        // console.log(retorno, 888888888888)
        // if (retorno.retorno) {
        //     if (funcionEjecutar.retorno != retorno.retorno.tipo) {
        //         console.log(retorno, 6799999999999999)
        //         return { err: `Error: El retorno de la función '${funcionEjecutar.id}' no concuerda con el retorno de la expresión.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
        //     }
        // }
        return retorno;
    }
    return { err: `Error: El método o la función ${_instruccion.nombre} no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
}

module.exports = Exec
