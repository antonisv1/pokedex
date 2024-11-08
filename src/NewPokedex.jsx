import React , {useState,useEffect,useRef} from 'react';
import { useNavigate,Link,useParams } from 'react-router-dom';

export default function NewPokedex() {

    const [pokemonList,setPokemonList] = useState([]);
    //const [page,setPage] = useState(1);
    const [count,setCount] = useState(1000);
    const prevPageRef = useRef(null);
    const nextPageRef = useRef(null);
    const [page,setPage] = useState(1);
    const {p}= useParams();
    const [pokemonImages,setPokemonImages] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        prevPageRef.current.disabled = true;
        //fetchPokemon(page-1);
        
        const pageNumber =  parseInt(`${p}`);
        if (pageNumber<1) {
            navigate("/1");
            fetchPokemon(1);
        }
        setPage(pageNumber);
        if (pageNumber==1) {
            prevPageRef.current.disabled = true;
        }
        else {
            prevPageRef.current.disabled = false;
        }
        fetchPokemon(pageNumber);
    }, []
    );
    /*
    useEffect(() => {
        if (page==1) {
            prevPageRef.current.disabled = true;
        }
        else {
            prevPageRef.current.disabled = false;
        }
        fetchPokemon(page);
        
             
    }, [page]
    );*/

    useEffect(()=>{
        if (page*8<count) {
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
        let offset=(pageNumber-1)*8;
        const fetchData = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=8`);
                const data = await response.json();
                console.log(data);
                if (!(data.results[0])) {
                    const tp = Math.round(data.count/8);
                    setPage(tp);
                    navigate(`/${tp}`);
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
            setPage(p=>temp);
            const go = "/"+temp;
            console.log(go);   
            navigate(go);
            fetchPokemon(temp);
            nextPageRef.current.disabled = false;
        }
        
    }
    function navigateForward() {
        if ((page*8>count)) {
            nextPageRef.current.disabled = true;
        }
        if ((page*8<count)) {
            const nextPage = page+1;
            setPage(p=>nextPage);
            const go = "/"+nextPage;
            navigate(go);  
            fetchPokemon(nextPage);
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
        
        
        <div  className="pokedex-controls"><button className="back" onClick={navigateBack} ref={prevPageRef}></button></div>
                    <div className="pokedex-display">
                        
                            <div className="pokemon-list">
                            {
                                pokemonList.map((pokemon,index) =>
                                    <Link key={index} className="link" to={`pokemon/${pokemon.name}`} >
                                    <div className="pokemon-card" >
                                        <img src={pokemonImages[pokemon.name]} alt={pokemon.name} />{pokemon.name}
                                    </div>
                                    </Link> 
                            )
                            }
                        </div>
                        
                    </div>
                    <div  className="pokedex-controls next-container"><button className="next" ref={nextPageRef} onClick={navigateForward} ></button></div>
        
        
        </>
    )
}