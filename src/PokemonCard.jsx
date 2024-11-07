import { Link } from "react-router-dom";

export default function PokemonCard(props) {
   return( 
    <Link className="link" to={`${props.name}`} >
        <div className="pokemon-card" >
            <img src={props.src} alt={props.name} />{props.name}
        </div>
    </Link> 

);
}