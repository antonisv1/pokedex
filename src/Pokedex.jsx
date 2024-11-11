import React , {useState,useEffect,createContext} from 'react';
import { Link,useParams } from 'react-router-dom';
import PokemonList from './PokemonList';
import Pokemon from './Pokemon';
import SearchBar from './SearchBar';
import SmallLed from './SmallLed';

export const PageContext = createContext(0);

export default function Pokedex() {
    const [page,setPage] = useState(0);
    const {p, n}= useParams();
    const [name,setName] = useState("");
    const [onlyName,setOnlyName] = useState(false);

    useEffect(() => {

        if(p) {
            const pageNumber =  parseInt(`${p}`);
            if (!isNaN(pageNumber) && pageNumber > 0) {
                console.log(p);
                setPage(pageNumber); // Set page only if it's a valid number
                setOnlyName(false);
            } 
            else {

                console.log(p);
                setOnlyName(true);
            }
        }
    }, [p]);

    useEffect(() => {
        if (n) { // Check if n is defined and not falsy
            setName(n);
        } 
        else  {
            setName("");
        }
    }, [n]);

    useEffect(()=>{
        if(onlyName) {
           setName(p);
        }
        else {
            setName("");
        }
    },[onlyName]);


    return(
        <div className='background-red'>
        
            <div className="pokedex-header-container">
                <Link  className="pokedex-header" to="/1">
                <img alt="Pokedex"  src="./assets/pokedex-logo.png" />
                </Link>
                <div>{(name.length===0)?<SearchBar/>:<></>}
                <SmallLed id="red-led" color="red"/>
                <SmallLed id="yellow-led" color="yellow"/>
                <SmallLed id="green-led" color="green"/></div>
                
            </div>
            <div className="pokedex-container"> 
                <PageContext.Provider value={{page,setPage}}>
                    {(name.length===0)?<PokemonList /> : <Pokemon name={name}/>}
                    
                </PageContext.Provider>
            </div>
        
        </div>
    )
}