import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {

    const [pokemonName,setPokemonName] = useState("");
    const navigate = useNavigate();

    function handlePokemonNameChange(event) {
        const newPokemonName = event.target.value.replace(/\d+/g, '').replace(/\s+/g, ''); // Remove all digits

        // Check if the new value is less than or equal to 30 characters
        if (newPokemonName.length <= 30) {
          setPokemonName(newPokemonName);
        }
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
