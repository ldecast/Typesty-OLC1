const Ambito = require("../../model/Ambito/Ambito");
const TIPO_INSTRUCCION = require("../Enum/TipoInstrucciones");
const Bloque = require("./Bloque")

function Exec(_instruccion, _ambito) {
    var funcionEjecutar = _ambito.getFuncion(_instruccion.nombre);
    var mensaje = "";
    if (funcionEjecutar != null) {
        var nuevoAmbito = new Ambito(_ambito)
        if (funcionEjecutar.lista_parametros != null || _instruccion.lista_valores != null) {
            var x = funcionEjecutar.lista_parametros.length; //cantidad de parámetros de la función
            var y = _instruccion.lista_valores != null ? _instruccion.lista_valores.length : 0; //cantidad de valores en la llamada
            if (x != y) {
                return `Error: La cantidad de parámetros en la llamada debe corresponder a con la declaración del método o función.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`
            }
            for (let i = 0; i < funcionEjecutar.lista_parametros.length; i++) {
                // console.log(funcionEjecutar.lista_parametros[i].tipo_dato)
                var asignacion = {
                    tipo: TIPO_INSTRUCCION.DECLARACION,
                    id: funcionEjecutar.lista_parametros[i].id,
                    valor: _instruccion.lista_valores[i],
                    //tipo_dato: getTipado(funcionEjecutar.lista_parametros[i].tipo_dato),
                    tipo_dato: funcionEjecutar.lista_parametros[i].tipo_dato,
                    linea: _instruccion.linea,
                    columna: _instruccion.columna
                }
                // console.log(asignacion, "ya")
                const Declaracion = require("./Declaracion");
                ex = Declaracion(asignacion, nuevoAmbito);
                if (ex) mensaje += ex + "\n";
            }
        }
        return mensaje + Bloque(funcionEjecutar.instrucciones, nuevoAmbito)
    }
    return `Error: El método o la función ${_instruccion.nombre} no existe.\nLínea: ${_instruccion.linea} Columna: ${_instruccion.columna}\n`
}

module.exports = Exec
