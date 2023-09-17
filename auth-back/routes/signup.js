const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express") .Router();
const User = require("../schema/user");


router.post("/", async (req, res) => {
    const { username, name, password, email } = req.body;

    if( !!!username || !!!name || !!!password || !!!email ) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Campo Rerquerido",
            })
        );
    }
//Crear usuario en la base de datos


try {
    const user = new User();
    const exist = await user.usernameExist(username);
    
    if(exist) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Este usuario ya existe",
            })
        );
    }
    
    const newUser = new User({username, name, password, email });
    
    newUser.save();
        res
        .status(200)
        .json(jsonResponse(200, { message: "Usuario creado con exito "}));

 res.send();
         
    
} catch (error) {
    res.status(500).json(
        jsonResponse(500, {
            error: "Error al crear el usuario",
        })
    );
  }

});

module.exports = router;