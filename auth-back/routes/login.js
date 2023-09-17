const { jsonResponse } = require("../lib/jsonResponse");
const router = require("express").Router();
const User = require ("../schema/user");
const getUserInfo = require ("../lib/getUserInfo");


router.post("/", async (req, res) => {
    const { username, password } = req.body;

    if( !!!username || !!!password  ) {
        return res.status(400).json(
            jsonResponse(400, {
                error: "Campo Rerquerido",
            })
        );
    }

    const user = await User.findOne({ username });

    if(user){
      const correctPassword = await comparePassword(password, user.password);
      
      if (correctPassword) {
//Autenticar usuario

const accessToken = user.createAccessToken();
const refreshToken = await user.createRefreshToken();

    res
    .status(200)
    .json(jsonResponse(200, { user: getUserInfo(user), accessToken, refreshToken, }));
      }else{
        res.status(400).json(
            jsonResponse(400, {
                error: "usuario o password son incorrectos",
            })
        );
      }
    }else{
        res.status(400).json(
            jsonResponse(400, {
                error: "usuario no encontrado",
            })
        );
    }

   
});

module.exports = router;