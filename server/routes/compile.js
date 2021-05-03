const Ambito = require("../model/Ambito/Ambito");
const Global = require("../model/Ambito/Global");


module.exports = (parser, app) => {
    app.post('/compile', (req, res) => {
        // try {
        var input = req.body.input;
        var ast = parser.parse(input);
        const global = new Ambito(null, "global");
        var cadena = Global(ast, global);
        var simbolos = global.getArraySimbols();
        var output = {
            "ast": ast,
            "arreglo_simbolos": simbolos,
            "output": cadena
        }
        res.status(200).send(output);
        // } catch (error) {
        // res.status(500).send(error);
        // }
    });
}