const Router = require("express").Router();

Router.get("/", async (req, res) => {
 res.send('working')
});


module.exports = Router;