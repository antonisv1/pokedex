import React , {useState,useEffect,useRef,useContext} from 'react';
import { useNavigate,Link,useParams } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import { PageContext } from './Pokedex';

export default function PokemonList(props) {

    const [pokemonList,setPokemonList] = useState([]);
    //const [page,setPage] = useState(1);
    const [count,setCount] = useState(1000);
    const prevPageRef = useRef(null);
    const nextPageRef = useRef(null);
    //  const [page,setPage] = useState(1);
    const {page,setPage} = useContext(PageContext);
    const fetchPage = useRef(null);
    const [pokemonImages,setPokemonImages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const pageNumber =  parseInt(page);
        prevPageRef.current.disabled = true;
        //fetchPokemon(page-1);
        
        if (pageNumber<1) {     
            //setPage(1);
            //setPage(1);
        }
        else if (!isNaN(pageNumber) && pageNumber > 0) {
            //setPage(pageNumber);
            //setPage(pageNumber);
        }
       
        if (pageNumber==1) {
            prevPageRef.current.disabled = true;
        }
        else {
            prevPageRef.current.disabled = false;
        }
        
    }, []
    );
    
    useEffect(() => {
        if (page==1) {
            prevPageRef.current.disabled = true;
        }
        else {
            prevPageRef.current.disabled = false;
        }
        if (!isNaN(page) && page > 0) {
            if(fetchPage.current!==page) {
                fetchPokemon(page);
                fetchPage.current = page;
            }
            
        }
             
    }, [page]
    );
    
    useEffect(()=>{
        if (!isNaN(page) && page > 0 && page*8<count) {
            nextPageRef.current.disabled = false;
        }
    },[count]);
    
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
        if (pageNumber==1) {
            prevPageRef.current.disabled = true;
        }
        if (pageNumber*8>count) {
            nextPageRef.current.disabled = true;
        }
        console.log(pageNumber);
        let offset=(pageNumber-1)*8;
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=8`);
                const data = await response.json();
                console.log(data);
                if (!(data.results[0])) {
                    const tp = Math.round(data.count/8);
                    //setPage(tp);
                    //navigate(`/${tp}`);
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

    function navigateBack() {
       /* if(page>1) {
            if(page==2) {
                prevPageRef.current.disabled = true;
            } 
            nextPageRef.current.disabled = false;
            const prevPage = page-1;
            navigate(`/${prevPage}`);            
        }*/
            
        
        if (page>1) {
            
            const temp = page-1;
            const go = "/"+temp;
 
            navigate(go);
            //fetchPokemon(temp);
            nextPageRef.current.disabled = false;
        }
        
    }
    function navigateForward() {

        const nextPage = parseInt(page)+1;
        const go = "/"+nextPage;
            console.log(go);
            navigate(go);  
        if ((page*8>count)) {
            nextPageRef.current.disabled = true;
        }
        if ((page*8<count)) {
            const nextPage = page+1;

            const go = "/"+nextPage;

            navigate(go);  

            prevPageRef.current.disabled = false;
            //setPrevDisabled(false);  disabled={prevDisabled} 
        }
            
       /* let temp = page;

        temp++;
        const go = "/"+temp;
        setPage(p=>p++);
        */
        
    }
/*
    function showPockemonDetails(name) {
        //setPokemonUrl(url);
       // setPokemonName(name);

        const path = `/${page}/pokemon/${name}`;
        console.log(path);
        navigate(path); // Navigate to details page
    }

    */

    return(
        <>
        
        
        <div  className="pokedex-controls">
            <button className="back" onClick={navigateBack} ref={prevPageRef}></button>
        </div>
                    <div className="pokedex-display">
                        
                            <div className="pokemon-list">
                            {
                                pokemonList.map((pokemon,index) =>

                                    <PokemonCard key={index} name={pokemon.name} src={!(pokemonImages[pokemon.name])?"assets/animation.gif":pokemonImages[pokemon.name]}/>
                                )
                            }
                        </div>
                        
                    </div>
        <div  className="pokedex-controls next-container">
            <button className="next" ref={nextPageRef} onClick={navigateForward} ></button>
        </div>
                
        
        </>
    )
}