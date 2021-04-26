class Ambito {
    constructor(_anterior, _tipo) {
        this.anterior = _anterior
        this.tipo = _tipo
        this.tablaSimbolos = new Map();
        this.tablaFunciones = new Map();
    }

    addSimbolo(_s, _simbolo) {
        this.tablaSimbolos.set(_s.toLowerCase(), _simbolo)
    }

    addFuncion(_s, _funcion) {
        this.tablaFunciones.set(_s.toLowerCase(), _funcion)
    }

    getSimbolo(_s) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase())
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }

    getFuncion(_s) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaFunciones.get(_s.toLowerCase())
            if (encontrado != null) {
                return encontrado
            }
        }
        return null
    }

    existeSimbolo(_s) {
        var encontrado = this.tablaSimbolos.get(_s.toLowerCase())
        if (encontrado != null) {
            return true
        }
        return false
    }

    existeFuncion(_s) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaFunciones.get(_s.toLowerCase())
            if (encontrado != null) {
                return true
            }
        }
        return false
    }

    actualizar(_s, _simbolo) {
        for (let e = this; e != null; e = e.anterior) {
            var encontrado = e.tablaSimbolos.get(_s.toLowerCase());
            if (encontrado != null) {
                e.tablaSimbolos.set(_s, _simbolo)
                return true;
            }
        }
        return false
    }

    getGlobal() {
        for (let e = this; e != null; e = e.anterior) {
            if (e.anterior === null) {
                return e;
            }
        }
        return null
    }
}

module.exports = Ambito