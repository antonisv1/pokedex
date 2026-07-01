import {useState,useEffect,useRef,useContext,useCallback} from 'react';
import PokemonCard from './PokemonCard';
import { PageContext } from './PageContext';

export default function PokemonList() {

    const [pokemonList,setPokemonList] = useState([]);
    const {page} = useContext(PageContext);
    const fetchPage = useRef(null);
    const [pokemonImages,setPokemonImages] = useState({});

    const fetchPokemon = useCallback((pageNumber) => {
        console.log(pageNumber);
        let offset=(pageNumber-1)*8;
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=8`);
                const data = await response.json();
                console.log(data);
                if (!(data.results[0])) {
                    const tp = Math.round(data.count/8);
                    fetchPokemon(tp);
                }
                setPokemonList(data.results);
            } catch (error) {
               console.log(error.message);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!isNaN(page) && page > 0) {
            if(fetchPage.current!==page) {
                fetchPokemon(page);
                fetchPage.current = page;
            }
        }
    }, [page, fetchPokemon]);
    
    useEffect(() => {
        const fetchImageUrls = async () => {
          const imageUrls = {};
          for (const pokemon of pokemonList) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            const data = await response.json();
            imageUrls[pokemon.name] = data.sprites.front_default;
          }
          setPokemonImages(imageUrls);
        };
    
        fetchImageUrls();
      }, [pokemonList]);
    
    return (
        <div className="w-full flex flex-col items-stretch justify-start font-retro">
            {/* Pokemon Grid */}
            <div className="w-full pokemon-grid grid grid-cols-4 gap-3 p-2">
                {pokemonList.map((pokemon, index) => (
                    <PokemonCard
                        key={index}
                        name={pokemon.name}
                        src={!(pokemonImages[pokemon.name]) ? `${import.meta.env.BASE_URL}assets/animation-small.gif` : pokemonImages[pokemon.name]}
                    />
                ))}
            </div>
        </div>
    )
}