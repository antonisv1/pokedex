import { Link } from "react-router-dom";
import React, {useEffect} from "react";

export default function LandingPage() {

    useEffect(()=> {
        document.body.style.backgroundImage = "./assets/bg.png";
    },[])
    
    return(
        <div className="landing-container ">

            <div className="landing-header">
                <Link className="" to="/1">
                    <img alt="Pokedex" src="./assets/pokedex-logo.png" />
                </Link>
            </div>

            <div className="landing-body ">
                <div className="landing-body-info shine-element">
                    Hello and welcome to my pokedex creation.
                    <br/><br/>
                    This web application uses React.js and the pokeapi to create a functional 
                    
                    pokedex that displays all the pokemon registered in pokeapi as well as 
                    
                    the ability to search for them using the searchbox as well as click on them 
                    
                    to find more information about them.
                    
                    This web application uses the browserRouter in order to navigate to different 
                    
                    pages and return to them when needed.

                    <br/><br/><br/>
                    Click the logo to start the pokedex!
                </div>
                
            </div>

            <div className="landing-footer">
                <img className="running-image" src="/assets/pikachu-running.gif" alt="Pikachu runs!" />
            </div>

        </div>
    )


}