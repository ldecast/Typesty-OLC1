module.exports = (parser, app) => {
    app.post('/compile', (req, res) => {
        try {
            var input = req.body.input;
            var ast = parser.parse(input);
            if (typeof ast === 'string') {
                res.status(500).send({ "message": ast });
            }
            else {
                var output = {
                    "ast": ast,
                    "output": ast //temporal
                }
                res.status(200).send(output);
            }
        } catch (error) {
            res.status(500).send(error);
        }
    });
}