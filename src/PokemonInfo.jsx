import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FaVolumeHigh } from 'react-icons/fa6';

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
    const [cry, setCry] = useState("");
    const audioRef = useRef(null);
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
            setCry(pokemon.cries?.latest || pokemon.cries?.legacy || "");
            
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
                <div className="w-full max-w-3xl rounded-xl border-4 border-t-white/60 border-l-white/40 border-r-neutral-300 border-b-neutral-400 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 p-4 sm:p-6 shadow-[0_8px_24px_rgba(0,0,0,0.2),0_4px_8px_rgba(0,0,0,0.15),inset_0_2px_0_rgba(255,255,255,0.8)]">
                    <div className="flex flex-col items-center gap-4 mb-6">
                        {image && (
                            <div className="rounded-full p-1 bg-gradient-to-br from-neutral-200 via-neutral-300 to-neutral-400 shadow-[0_8px_16px_rgba(0,0,0,0.25),inset_0_2px_4px_rgba(255,255,255,0.5)]">
                                <img
                                    alt={`${name} profile`}
                                    src={image}
                                    className="w-28 h-28 sm:w-36 sm:h-36 bg-gradient-to-br from-white to-neutral-100 rounded-full p-2 border-2 border-neutral-200 shadow-[inset_0_4px_8px_rgba(0,0,0,0.1),inset_0_-2px_4px_rgba(255,255,255,0.8)] object-cover"
                                />
                            </div>
                        )}
                        <div className="flex items-center gap-3">
                            <h1 className="text-red-600 text-xl sm:text-2xl font-bold capitalize m-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.1)]">
                                {name}
                            </h1>
                            {cry && (
                                <button
                                    type="button"
                                    onClick={() => audioRef.current?.play()}
                                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-t-neutral-200 border-l-neutral-200 border-r-neutral-400 border-b-neutral-500 bg-gradient-to-b from-white via-neutral-100 to-neutral-200 text-red-600 shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_12px_rgba(0,0,0,0.25)] active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(0,0,0,0.1)]"
                                    title="Play cry"
                                    aria-label="Play Pokemon cry"
                                >
                                    <FaVolumeHigh className="text-lg" />
                                </button>
                            )}
                        </div>
                        {cry && <audio ref={audioRef} src={cry} preload="auto" />}
                    </div>

                    <div className="mb-6 text-center">
                        <h3 className="text-red-600 text-sm sm:text-base mb-3 m-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">Types</h3>
                        <ul className="flex flex-wrap justify-center gap-3 list-none p-0 m-0">
                            {types.map((slot, index) => {
                                const matchingType = allTypes.find(
                                    (type) => type.type === slot.type.name
                                );
                                return (
                                    <li
                                        key={index}
                                        className="transition-all hover:scale-110 hover:-translate-y-1"
                                        title={slot.type.name}
                                    >
                                        {matchingType && (
                                            <img
                                                src={matchingType.url}
                                                alt={slot.type.name}
                                                className="w-[clamp(60px,15vw,96px)] h-auto  shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.9)]"
                                            />
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center bg-gradient-to-r from-white via-neutral-50 to-neutral-100 p-3 rounded-lg border-2 border-t-white border-l-white border-r-neutral-200 border-b-neutral-300 border-l-4 border-l-red-500 shadow-[0_3px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]">
                            <h3 className="text-red-600 text-sm m-0">📏 Height</h3>
                            <span className="text-gray-800 font-bold text-sm bg-white/80 px-2 py-1 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                                {addDecimalPoint(height)} m
                            </span>
                        </div>
                        <div className="flex justify-between items-center bg-gradient-to-r from-white via-neutral-50 to-neutral-100 p-3 rounded-lg border-2 border-t-white border-l-white border-r-neutral-200 border-b-neutral-300 border-l-4 border-l-red-500 shadow-[0_3px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]">
                            <h3 className="text-red-600 text-sm m-0">⚖️ Weight</h3>
                            <span className="text-gray-800 font-bold text-sm bg-white/80 px-2 py-1 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                                {addDecimalPoint(weight)} kg
                            </span>
                        </div>
                        <div className="flex justify-between items-center bg-gradient-to-r from-white via-neutral-50 to-neutral-100 p-3 rounded-lg border-2 border-t-white border-l-white border-r-neutral-200 border-b-neutral-300 border-l-4 border-l-red-500 shadow-[0_3px_6px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)]">
                            <h3 className="text-red-600 text-sm m-0">⭐ Base Exp</h3>
                            <span className="text-gray-800 font-bold text-sm bg-white/80 px-2 py-1 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">{baseExp}</span>
                        </div>
                    </div>

                    {abilities.length > 0 && (
                        <div className="w-full mt-5">
                            <h3 className="text-red-600 text-sm sm:text-base mb-2 text-center m-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                                🎯 Abilities
                            </h3>
                            <div className="flex flex-wrap justify-center gap-2">
                                {abilities.map((ability, index) => (
                                    <span
                                        key={index}
                                        className="bg-gradient-to-b from-red-500 to-red-600 text-white border-2 border-t-red-400 border-l-red-400 border-r-red-700 border-b-red-800 rounded-lg px-3 py-2 text-[clamp(0.6rem,1.5vw,0.7rem)] font-bold capitalize shadow-[0_3px_6px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_5px_10px_rgba(0,0,0,0.25)]"
                                    >
                                        {ability.ability.name}
                                        {ability.is_hidden && ' (H)'}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {stats.length > 0 && (
                        <div className="w-full mt-5 bg-gradient-to-b from-white/60 to-neutral-100/60 border-2 border-t-white border-l-white border-r-neutral-300 border-b-neutral-400 rounded-xl p-4 shadow-[0_4px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)]">
                            <h3 className="text-red-600 text-sm sm:text-base mb-3 text-center m-0 drop-shadow-[0_1px_1px_rgba(0,0,0,0.1)]">
                                ⚔️ Battle Stats
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {stats.map((stat, index) => (
                                    <div
                                        key={index}
                                        className="flex justify-between items-center bg-gradient-to-r from-white to-neutral-50 px-3 py-2 rounded-lg text-[clamp(0.6rem,1.5vw,0.75rem)] border border-t-white border-l-white border-r-neutral-200 border-b-neutral-300 shadow-[0_2px_4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]"
                                    >
                                        <span className="text-gray-800 font-bold uppercase">
                                            {stat.stat.name.split('-').join(' ')}
                                        </span>
                                        <span className="text-white font-bold bg-gradient-to-b from-red-500 to-red-600 px-2 py-1 rounded shadow-[0_2px_4px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.2)]">
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
