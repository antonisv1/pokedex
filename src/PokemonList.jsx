import React , {useState,useEffect,useRef,useContext} from 'react';
import { useNavigate,Link,useParams } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import { PageContext } from './Pokedex';

export default function PokemonList(props) {

    const [pokemonList,setPokemonList] = useState([]);
    const [count,setCount] = useState(1000);
    const {page,setPage} = useContext(PageContext);
    const fetchPage = useRef(null);
    const [pokemonImages,setPokemonImages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (!isNaN(page) && page > 0) {
            if(fetchPage.current!==page) {
                fetchPokemon(page);
                fetchPage.current = page;
            }
        }
    }, [page]);
    
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
    
    function fetchPokemon(pageNumber) {
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
                setCount(data.count);      
                setPokemonList(data.results);
                
            } catch (error) {
               console.log(error.message);
            }
        }
        
        fetchData();
    }

    return (
        <div className="w-full flex flex-col items-center justify-start gap-4 font-retro my-2">
            {/* Pokemon Grid */}
            <div className="w-full pokemon-grid" style={{ 
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "1rem"
            }}>
                {pokemonList.map((pokemon, index) => (
                    <PokemonCard
                        key={index}
                        name={pokemon.name}
                        src={!(pokemonImages[pokemon.name]) ? "assets/animation.gif" : pokemonImages[pokemon.name]}
                    />
                ))}
            </div>
        </div>
    )
}