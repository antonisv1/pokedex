import { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

export default function PokemonInfo() {
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
    const [abilities,setAbilities] = useState([]);
    const [stats,setStats] = useState([]);
    const [baseExp,setBaseExp] = useState(0);
    const { id } = useParams();
    const navigate = useNavigate();
    const [url,setUrl] = useState("");
    const [name,setName] = useState("");
    const [notFound,setNotFound] = useState(false);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        setUrl(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setName(id);
    }, [id]);

    useEffect(() => {
        if (notFound) {
            navigate('/not-found', { replace: true });
        }
    }, [notFound, navigate]);

    useEffect(() => {
      
      const fetchData = async () => {
        try {
            const response = await fetch(url);
            const pokemon = await response.json();
            setLoading(false);
            setHeight(pokemon.height);
            setWeight(pokemon.weight);
            setImage(pokemon.sprites.front_default);
            setTypes(pokemon.types);
            setAbilities(pokemon.abilities);
            setStats(pokemon.stats);
            setBaseExp(pokemon.base_experience);
            
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
        <div className="w-full flex flex-col items-center font-retro">
            {loading ? (
                <div className="flex flex-col items-center justify-center gap-4 py-10">
                    <img
                        src={`${import.meta.env.BASE_URL}assets/animation.gif`}
                        alt="Loading"
                        className="w-24 h-24"
                    />
                    <p className="text-xs text-neutral-800 m-0">Loading...</p>
                </div>
            ) : (
                <div className="w-full max-w-3xl retro-card">
                    <div className="flex flex-col items-center gap-4 mb-6">
                        {image && (
                            <img
                                alt={`${name} profile`}
                                src={image}
                                className="w-28 h-28 sm:w-36 sm:h-36 bg-white rounded-full p-2 border-4 border-gray-300 shadow-lg object-cover"
                            />
                        )}
                        <h1 className="text-red-600 text-xl sm:text-2xl font-bold capitalize m-0">
                            {name}
                        </h1>
                    </div>

                    <div className="mb-6 text-center">
                        <h3 className="text-red-600 text-sm sm:text-base mb-3 m-0">Types</h3>
                        <ul className="flex flex-wrap justify-center gap-3 list-none p-0 m-0">
                            {types.map((slot, index) => {
                                const matchingType = allTypes.find(
                                    (type) => type.type === slot.type.name
                                );
                                return (
                                    <li
                                        key={index}
                                        className="transition-transform hover:scale-110"
                                        title={slot.type.name}
                                    >
                                        {matchingType && (
                                            <img
                                                src={matchingType.url}
                                                alt={slot.type.name}
                                                className="w-[clamp(60px,15vw,96px)] h-auto bg-white p-1 rounded-lg border-2 border-gray-300 shadow-md"
                                            />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-white/60 p-3 rounded-lg border-l-4 border-red-600">
                            <h3 className="text-red-600 text-sm m-0">📏 Height</h3>
                            <span className="text-gray-800 font-bold text-sm">
                                {addDecimalPoint(height)} m
                            </span>
                        </div>
                        <div className="flex justify-between items-center bg-white/60 p-3 rounded-lg border-l-4 border-red-600">
                            <h3 className="text-red-600 text-sm m-0">⚖️ Weight</h3>
                            <span className="text-gray-800 font-bold text-sm">
                                {addDecimalPoint(weight)} kg
                            </span>
                        </div>
                        <div className="flex justify-between items-center bg-white/60 p-3 rounded-lg border-l-4 border-red-600">
                            <h3 className="text-red-600 text-sm m-0">⭐ Base Exp</h3>
                            <span className="text-gray-800 font-bold text-sm">{baseExp}</span>
                        </div>
                    </div>

                    {abilities.length > 0 && (
                        <div className="w-full mt-5">
                            <h3 className="text-red-600 text-sm sm:text-base mb-2 text-center m-0">
                                🎯 Abilities
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {abilities.map((ability, index) => (
                                    <span
                                        key={index}
                                        className="bg-red-600/10 text-red-600 border border-red-600 rounded-md px-3 py-2 text-[clamp(0.6rem,1.5vw,0.7rem)] font-bold capitalize"
                                    >
                                        {ability.ability.name}
                                        {ability.is_hidden && ' (H)'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {stats.length > 0 && (
                        <div className="w-full mt-5 bg-white/40 border-2 border-red-600/20 rounded-lg p-4">
                            <h3 className="text-red-600 text-sm sm:text-base mb-3 text-center m-0">
                                ⚔️ Battle Stats
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-white/60 px-3 py-2 rounded-md text-[clamp(0.6rem,1.5vw,0.75rem)]"
                                    >
                                        <span className="text-gray-800 font-bold uppercase">
                                            {stat.stat.name.split('-').join(' ')}
                                        </span>
                                        <span className="text-red-600 font-bold bg-red-600/10 px-2 py-1 rounded">
                                            {stat.base_stat}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
