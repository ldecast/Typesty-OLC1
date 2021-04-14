const Ambito = require("../model/Ambito/Ambito");
const Bloque = require("../controller/Instruccion/Bloque");


module.exports = (parser, app) => {
    app.post('/compile', (req, res) => {
        // try {
            var input = req.body.input;
            var ast = parser.parse(input);
            if (typeof ast === 'string') {
                res.status(500).send({ "message": ast });
            }
            else {
                const global = new Ambito(null);
                var cadena = Bloque(ast, global);
                var output = {
                    "ast": ast,
                    "output": cadena
                }
                res.status(200).send(output);
            }
        // } catch (error) {
        //     res.status(500).send(error);
        // }
    });
}