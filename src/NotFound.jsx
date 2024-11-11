import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="not-found-container ">

            <div className="landing-header">
                <Link className="" to="/1">
                    <img alt="Pokedex" src="/assets/pokedex-logo.png" />
                </Link>
            </div>

            <div className="landing-body ">
                <div className="landing-body-info shine-element">
                    <h1>404 Not Found!</h1>
                    <p>Oops something went wrong! The page you are looking for doesn't exist.</p>
                    <p>Here is a dancing pikachu🎶</p>
                </div>
                
            </div>

            <div className="not-found-footer">
                <img className="" src="/assets/pikachu-dancing.gif" alt="Pikachu dances!" />
            </div>

        </div>
    )
}