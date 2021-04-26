const Ambito = require("../../model/Ambito/Ambito");
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones");
const Bloque = require("./Bloque")

function Exec(_instruccion, _ambito) {
    var funcionEjecutar = _ambito.getFuncion(_instruccion.nombre);
    if (funcionEjecutar != null) {
        var nuevoAmbito = new Ambito(_ambito)
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
                    valor: _instruccion.lista_valores[i], // Podria hacerle un Operacion(expresion, ambito con las variables ya agregadas)
                    tipo_dato: funcionEjecutar.lista_parametros[i].tipo_dato,
                    linea: funcionEjecutar.linea,
                    columna: funcionEjecutar.columna,
                    isParam: true
                }
                // console.log(asignacion.id, asignacion, 8333333333434)
                const Declaracion = require("./Declaracion");
                ex = Declaracion(asignacion, nuevoAmbito);
                if (ex) return { err: ex };
            }
        }
        var retorno = Bloque(funcionEjecutar.instrucciones, nuevoAmbito);
        console.log(retorno,3333333333333)
        if (retorno.retorno) {
            if (funcionEjecutar.retorno != retorno.retorno.tipo)
                return { err: `Error: El retorno de la función '${funcionEjecutar.id}' no concuerda con el retorno de la expresión.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
        }
        // console.log(retorno, 'WWWWWWWWWWWWW')
        return retorno;
    }
    return { err: `Error: El método o la función ${_instruccion.nombre} no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n` }
}

module.exports = Exec
