const Ambito = require("../model/Ambito/Ambito");
const Global = require("../model/Ambito/Global");

module.exports = (parser, app) => {
    app.post('/compile', (req, res) => {
        try {
            var input = req.body.input;
            var ast = parser.parse(input);
            var parse = ast.parse;
            var errores = ast.errores;
            const global = new Ambito(null, "global");
            var cadena = Global(parse, global);
            var simbolos = global.getArraySimbols();
            for (let i = 0; i < cadena.errores.length; i++) {
                const err = cadena.errores[i];
                errores.push(err);
            }
            var output = {
                "ast": ast,
                "arreglo_simbolos": simbolos,
                "arreglo_errores": errores,
                "output": cadena.cadena
            }
            res.status(200).send(output);
        } catch (error) {
            console.log(error);
            res.status(500).send(String(error));
        }
    });
}