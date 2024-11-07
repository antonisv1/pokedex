import { PageContext} from "./Pokedex";
import React, {useContext,useState,useEffect} from 'react';
import { Link } from "react-router-dom";

export default function Pokemon(props) {
    const allTypes = [
        {type:"normal",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/1.png"},
        {type:"fighting",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/2.png"},
        {type:"flying",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/3.png"},
        {type:"poison",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/4.png"},
        {type:"ground",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/5.png"},
        {type:"rock",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/6.png"},
        {type:"bug",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/7.png"},
        {type:"ghost",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/8.png"},
        {type:"steel",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/9.png"},
        {type:"fire",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/10.png"},
        {type:"water",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/11.png"},
        {type:"grass",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/12.png"},
        {type:"electric",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/13.png"},
        {type:"psychic",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/14.png"},
        {type:"ice",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/15.png"},
        {type:"dragon",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/16.png"},
        {type:"dark",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/17.png"},
        {type:"fairy",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/brilliant-diamond-and-shining-pearl/18.png"},
        {type:"stellar",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-ix/scarlet-violet/19.png"},
        {type:"unknown",url:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-iv/platinum/10001.png"}
    ];

    const [height,setHeight] = useState(0);
    const [weight,setWeight] = useState(0);
    const [image,setImage] = useState("");
    const [types,setTypes] = useState([]);
    //const { p } = useParams();
    const {page} = useContext(PageContext);
    const [url,setUrl] = useState("");
    const [returnUrl,setReturnUrl] = useState("");
    const [returnAvailable,setReturnAvailable] = useState(true);
    const [name,setName] = useState("");
    const [notFound,setNotFound] = useState(false);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
     
      if(page) {
        setReturnUrl("/"+page);
      }
      else {
        setReturnAvailable(false);
      }
      setUrl(`https://pokeapi.co/api/v2/pokemon/${props.name}`);
      setName(props.name);
    }, []);

    useEffect(() => {
      
      const fetchData = async () => {
        try {
            console.log(url);
            const response = await fetch(url);
            //console.log(response);
            const pokemon = await response.json();
            console.log(pokemon);
            setLoading(false);
            setHeight(pokemon.height);
            setWeight(pokemon.weight);
            setImage(pokemon.sprites.front_default);
            setTypes(pokemon.types);
            
        } catch (error) {
          setNotFound(true);
          setLoading(false);
          console.log(error.message);
        }
    }
    if (url.length>0) {
      fetchData();
    }
    }, [url]);

    function addDecimalPoint(n) {
      let number = parseInt(n);
      if (number >= 10) {
        const decimalIndex = number.toString().length - 1;
        return number.toString().slice(0, decimalIndex) + '.' + number.toString().slice(decimalIndex);
      } else {
        return "0."+number;
      }
    }

    return (<> 
      { returnAvailable ?
        <div   className="pokedex-controls">
          <Link to={returnUrl}><img style={{height: "50px",width: "50px"}} src="/assets/back.png"/></Link>
        </div> 
        : ""
      }
                      <div className="pokedex-display" >
                        <div className="pokemon-container" style={loading?{display : "none"}:{display :"flex"}}>
                        { !(notFound) ?
                            
                              <div className="pokemon" id={name}>
                                  <div><img src={image}/><h1>{name}</h1></div>
                                  <div>Types: <ul>
                                      
                                  {types.map((slot, index) => {
                                  const matchingType = allTypes.find(
                                    (type) => type.type === slot.type.name
                                  );
                                  return (
                                    <li key={index}>
                                      {matchingType && <img src={matchingType.url} alt={slot.type.name} />}
                                    </li>
                                  );
                                })}
    
                                      </ul></div>
                                  <h3>Height: {addDecimalPoint(height)} m</h3>
                                  <h3>Weight: {addDecimalPoint(weight)} kg</h3>
                            </div>
                            :
                            <div className="pokemon-not-found">
                              <img src="/assets/pikachu-dancing.gif" alt="Pikachu Dances!" />
                              <h2>Oops.. Not found!</h2>
                            </div>
                        }
                        </div>
                        
                        
                    </div>
                    </>
        
    )
}