import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

    const [pokemonName,setPokemonName] = useState("");
    const navigate = useNavigate();

    function handlePokemonNameChange(event) {
        setPokemonName(event.target.value);
    }

    function searchPokemon() {
        setPokemonName("");
        navigate(pokemonName);
    }

    return (<div className="searchbar-container">
                <input type="text" placeholder="Search pokemon" value={pokemonName} onChange={handlePokemonNameChange} 
                onKeyDown={(e)=>
                    {
                        if (e.key === "Enter") {
                            
                            searchPokemon();
                            
                        }
                    }
                }/>
                <button className="search-button" onClick={searchPokemon}>
                    <img alt="Search" src="./assets/magnifying-glass.png" />
                </button>

    </div>)
}