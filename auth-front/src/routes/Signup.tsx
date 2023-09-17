import Defaultlayout from "../Layout/Defaultlayout";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth/AuthProvider";
import { API_URL } from "./Auth/constants";
import { AuthResponseError } from "../types/types";


export default function Signup(){
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail]= useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const auth = useAuth();
    const goTo = useNavigate();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault();

      try {
        const response = await fetch(`${API_URL}/signup`,{
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            name,
            username,
            password,
            email,
          }),
        });

        if(response.ok) {
          console.log("El usuario se creo correctamente");
          setErrorResponse("");
          goTo("/");

        }else{
          console.log("Algo esta mal");
          const json = await response.json() as AuthResponseError;
          setErrorResponse(json.body.error);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    }
    
    if(auth.isAuthenticated){
        return <Navigate to="/vuelafacil"/>;
    }

    return (
        <Defaultlayout>
            
            <link
               href="//maxcdn.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css"
               rel="stylesheet"
               id="bootstrap-css"
               />
               {/*---- Include the above in your HEAD tag --------*/}
               <div className="wrapper fadeInDown">
              <div id="formContent">
               {/* Tabs Titles */}
               {/* Icon */}
              <div className="fadeIn first">
              <img
               src="https://logomaker.designfreelogoonline.com/media/productdesigner/logo/resized/000678_airplane-04.png"
               id="icon"
               alt="User Icon"
                />
               <h1>Vuela Facil</h1>
               </div>
               {/* Login Form */}
              <form onSubmit={handleSubmit}>
                <input
                type="text" value={name} onChange={(e) => setName(e.target.value)}
                id="name"
                className="fadeIn second"
                name="name"
                placeholder="Ingrese su nombre"
                />
               <input
                type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                id="username"
                className="fadeIn third"
                name="username"
                placeholder="Ingrese su usuario"
                />
               < input
                type="text" value={password} onChange={(e) => setPassword(e.target.value)}
                id="password"
                className="fadeIn third"
                name="login"
                placeholder="Clave"
                 />
                <input
                type="text" value={email} onChange={(e) => setEmail(e.target.value)}
                id="email"
                className="fadeIn third"
                name="email"
                placeholder="Correo Electronico"
                 />
                <input type="submit" className="fadeIn fourth" defaultValue="Log In" />
            </form>
             {/* Remind Passowrd */}
            <div id="formFooter">
            <a className="underlineHover" href="#">
             Ingresa a sitio
             {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
        </a>
      </div>
    </div>
  </div>
        </Defaultlayout>
        
  );
}