import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function SearchBar() {

    const [pokemonName, setPokemonName] = useState("");
    const navigate = useNavigate();
    const { p } = useParams();

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
        const page = Number.parseInt(`${p ?? ''}`, 10);
        const safePage = Number.isFinite(page) && page > 0 ? page : 1;
        navigate(`/${safePage}/${pokemonName}`);
        setPokemonName("");
    }

    return (
        <div className="flex items-stretch w-full max-w-[320px] rounded-lg border-3 border-t-neutral-300 border-l-neutral-300 border-r-neutral-500 border-b-neutral-600 bg-gradient-to-b from-sky-100 to-sky-200 shadow-[0_4px_8px_rgba(0,0,0,0.2),0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.7)] overflow-hidden">
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
                className="flex-1 min-w-0 bg-transparent border-0 outline-none px-3 py-2 text-[clamp(0.6rem,1.4vw,0.75rem)] text-slate-700 placeholder:text-slate-500"
                aria-label="Search for a Pokémon"
            />
            <button
                onClick={searchPokemon}
                className="shrink-0 border-l-2 border-l-neutral-400 bg-gradient-to-b from-white via-neutral-50 to-neutral-200 w-10 flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.05)] transition-all active:bg-gradient-to-b active:from-neutral-100 active:to-neutral-200 active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.15)] hover:from-neutral-50 hover:to-neutral-100"
                title="Search for Pokémon"
                aria-label="Search button"
            >
                <FaMagnifyingGlass className="w-4 h-4 text-slate-600" />
            </button>
        </div>
    )
}
