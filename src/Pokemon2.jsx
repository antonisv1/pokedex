import React, {useState,useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';

export default function Pokemon() {
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
    const { name,p } = useParams();
    const [url,setUrl] = useState("");
    const [returnUrl,setReturnUrl] = useState("");

    useEffect(() => {
     
      
      setReturnUrl(`/${p}`);
      setUrl(`https://pokeapi.co/api/v2/pokemon/${name}`);


    }, []);

    useEffect(() => {
      
      const fetchData = async () => {
        try {
            const response = await fetch(url);
            //console.log(response);
            const pokemon = await response.json();
            console.log(pokemon);
            
            setHeight(pokemon.height);
            setWeight(pokemon.weight);
            setImage(pokemon.sprites.front_default);
            setTypes(pokemon.types);
            
        } catch (error) {
           console.log(error.message);
        }
    }
    fetchData();
    }, [url]);

    function addDecimalPoint(number) {
      if (number >= 10) {
        const decimalIndex = number.toString().length - 1;
        return number.toString().slice(0, decimalIndex) + '.' + number.toString().slice(decimalIndex);
      } else {
        return "0."+number.toString();
      }
    }

    return (
        <>
        <div className="pokedex-header-container">
            <Link className="pokedex-header" to={`/1`} ><h1>Pokedex</h1></Link>
        </div>
        <div className="pokedex-container">
        <div   className="pokedex-controls"><Link to={returnUrl}><img style={{height: "50px",width: "50px;"}} src="/assets/back.png"/></Link></div>
                      <div className="pokedex-display">
                        { types &&
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
                        }
                    </div>
        </div>
        </>
    )
}