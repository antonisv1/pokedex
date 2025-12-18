import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar() {

    const [pokemonName, setPokemonName] = useState("");
    const navigate = useNavigate();

    function handlePokemonNameChange(event) {
        const newPokemonName = event.target.value
            .toLowerCase()
            .replace(/\d+/g, '')
            .replace(/\s+/g, '');

        if (newPokemonName.length <= 30) {
            setPokemonName(newPokemonName);
        }
    }

    function searchPokemon() {
        if (pokemonName.trim() === "") return;
        navigate(pokemonName);
        setPokemonName("");
    }

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
            border: "3px solid #333",
            borderRadius: "0.75rem",
            padding: "clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.75rem, 2vw, 1rem)",
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.2)",
            fontFamily: '"Press Start 2P", "Pixelade", monospace',
            transition: "all 0.2s",
            width: "100%",
            maxWidth: "min(400px, 90vw)"
        }}>
            <input
                type="text"
                placeholder="Search Pokémon"
                value={pokemonName}
                onChange={handlePokemonNameChange}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        searchPokemon();
                    }
                }}
                style={{
                    background: "transparent",
                    border: "none",
                    flex: 1,
                    padding: "clamp(0.25rem, 1vw, 0.5rem)",
                    fontSize: "clamp(0.6rem, 2vw, 0.75rem)",
                    fontFamily: '"Press Start 2P", "Pixelade", monospace',
                    color: "#333",
                    outline: "none",
                    minWidth: 0
                }}
                aria-label="Search for a Pokémon"
            />
            <button
                onClick={searchPokemon}
                style={{
                    background: "linear-gradient(135deg, #0099ff 0%, #0066cc 100%)",
                    border: "2px solid #003366",
                    color: "white",
                    padding: "clamp(0.4rem, 1.5vw, 0.6rem) clamp(0.5rem, 2vw, 0.75rem)",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)",
                    fontSize: "clamp(0.9rem, 2.5vw, 1.2rem)",
                    flexShrink: 0
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.1)";
                    e.target.style.boxShadow = "0 4px 10px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)";
                }}
                title="Search for Pokémon"
                aria-label="Search button"
            >
                <FaMagnifyingGlass />
            </button>
        </div>
    )
}
