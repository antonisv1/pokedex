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

    return (
        <div className="w-full flex flex-col items-center justify-center gap-4 font-retro">

            {/* Content */}
            <div className="w-full flex-1 flex items-center justify-center overflow-y-auto">
                {loading ? (
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "1rem",
                        height: "100%"
                    }}>
                        {/* Loading Animation */}
                        <img 
                            src="./assets/animation.gif" 
                            alt="Loading" 
                            style={{
                                width: "96px",
                                height: "96px",
                                flexShrink: 0
                            }}
                        />
                        <p style={{
                            fontSize: "0.75rem",
                            color: "#333",
                            fontFamily: '"Press Start 2P", "Pixelade", monospace',
                            margin: "0",
                            flexShrink: 0
                        }}>
                            Loading...
                        </p>
                    </div>
                ) : !notFound ? (
                    <div className="retro-card max-w-2xl w-full">
                        {/* Profile Section */}
                        <div className="flex flex-col items-center gap-4 mb-6">
                            <img
                                alt={`${name} profile`}
                                src={image}
                                className="w-32 h-32 bg-white rounded-full p-2 border-4 border-gray-400 shadow-lg"
                            />
                            <h1 className="text-2xl text-red-600 capitalize drop-shadow-lg">
                                {name}
                            </h1>
                        </div>

                        {/* Types */}
                        <div className="mb-6 text-center">
                            <h3 className="text-red-600 mb-3 text-sm">Types</h3>
                            <ul className="flex flex-wrap justify-center gap-3">
                                {types.map((slot, index) => {
                                    const matchingType = allTypes.find(
                                        (type) => type.type === slot.type.name
                                    );
                                    return (
                                        <li
                                            key={index}
                                            className="hover:scale-110 transition-transform"
                                            title={slot.type.name}
                                        >
                                            {matchingType && (
                                                <img
                                                    src={matchingType.url}
                                                    alt={slot.type.name}
                                                    className="h-12 w-12 bg-white p-1 rounded-lg border-2 border-gray-300 shadow-md"
                                                />
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Stats */}
                        <div className="space-y-3">
                            <div className="flex justify-between items-center bg-white/60 p-3 rounded-lg border-l-4 border-red-600">
                                <h3 className="text-red-600 text-sm">📏 Height</h3>
                                <span className="text-gray-800 font-bold">
                                    {addDecimalPoint(height)} m
                                </span>
                            </div>
                            <div className="flex justify-between items-center bg-white/60 p-3 rounded-lg border-l-4 border-red-600">
                                <h3 className="text-red-600 text-sm">⚖️ Weight</h3>
                                <span className="text-gray-800 font-bold">
                                    {addDecimalPoint(weight)} kg
                                </span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="retro-card max-w-md text-center bg-gradient-to-br from-red-100/50 to-red-50/50 border-4 border-red-400">
                        <img src="/assets/pikachu-dancing.gif" alt="Pikachu" className="h-32 mx-auto mb-4" />
                        <h2 className="text-red-600 text-lg mb-2">Not Found!</h2>
                        <p className="text-sm text-gray-700">
                            Sorry, we couldn't find that Pokémon.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}