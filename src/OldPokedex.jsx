import React, {useState,useEffect,useRef} from 'react';
import Pokemon from './Pokemon.jsx';

export default function Pokedex() {

    const [pokemonList,setPokemonList] = useState([]);
    const [page,setPage] = useState(1);
    const [count,setCount] = useState(100);
    const [displayPokemon,setDisplayPokemon] = useState(true);
    const [pokemonUrl,setPokemonUrl] = useState("");
    const [pokemon,setPokemon] =useState();
    const prevPageRef = useRef(null);
    const nextPageRef = useRef(null);
    const listRef = useRef(null);
    // it will run when the component first mounts, it will fetch the first page of pokemon
    useEffect(() => {
        fetchPokemon(page-1);

        prevPageRef.current.disabled = true;
    }, []
    );

    // it will run when the page changes
    useEffect(() => {
        console.log(page);
        fetchPokemon(page-1);        
    }, [page]
    );
    useEffect(() => {
        fetchPokemonCard();
    }, [pokemonUrl]
    );

    function fetchPokemon(p) {
        let offset=p*15;
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=15`);
                const data = await response.json();
                setCount(data.count);      
                setPokemonList(data.results);
            } catch (error) {
               console.log(error.message);
            }
        }
        fetchData();
    }

    function navigateBack() {
        if(page>1) {
            if(page==2) {
                prevPageRef.current.disabled = true;
            } 
            nextPageRef.current.disabled = false;
            setPage(p=>p-1);              
        }
    }
    function navigateForward() {
        if ((page*15>count)) {
            nextPageRef.current.disabled = true;
        }
        if (!(page*15>count)) {
            setPage(p=>p+1);
            prevPageRef.current.disabled = false;
            //setPrevDisabled(false);  disabled={prevDisabled} 
        }
    }
    function showPockemonDetails(url) {
        setDisplayPokemon(false);
        setPokemonUrl(url);
    }
    function showAllPokemon() {
        setDisplayPokemon(true);

    }
    function fetchPokemonCard() {
        const fetchData = async () => {
            try {
                const response = await fetch(pokemonUrl);
                //console.log(response);
                const pokemon = await response.json();
                console.log(pokemon);
                setPokemon(
                    <Pokemon name={pokemon.name}
                    height={pokemon.height}
                    weight={pokemon.weight}
                    img={pokemon.sprites.front_default}
                    types={pokemon.types}/>
                );
            } catch (error) {
               console.log(error.message);
            }
        }
        fetchData();

    }
    /*
 <li key={index} onClick={() => showPockemonDetails(pokemon.url)}>
                            {pokemon.name}
                        </li>
    */
    return(
        <div className="pokedex-container">
            <div className="pokedex-display">
                { displayPokemon ? ( <>
                    <ul ref={listRef}  className="pokemon-list">
                    {
                        pokemonList.map((pokemon,index) =>
                            <li key={index} className="pokemon-card" onClick={() => showPockemonDetails(pokemon.url)}>
                                {pokemon.name}
                            </li>
                       )
                    }
                </ul>
                
                </>
            ) : <div className="pokedex-controls"><button onClick={showAllPokemon}>back</button>{pokemon}</div>}
            </div>
            <div style={{ display: displayPokemon ? 'block' : 'none' }}  className="pokedex-controls">
                 <button ref={prevPageRef} onClick={navigateBack}>Back</button>
                 {page}
                 <button ref={nextPageRef} onClick={navigateForward}>Next</button>
                 
            </div>
        </div>
    )

}