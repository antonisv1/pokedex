import { Link } from "react-router-dom";
import React, {useEffect} from "react";

export default function LandingPage() {

    useEffect(()=> {
        document.body.style.backgroundImage = "./assets/bg.png";
    },[])
    
    return(
        <div className="landing-container">
            <Link className="" to="/1">
                <img alt="Pokedex" src="./assets/pokedex-logo.png" />
                </Link>
        </div>
    )


}