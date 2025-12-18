import { PageContext} from "./Pokedex";
import React, {useContext,useState,useEffect} from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { FaChevronLeft } from 'react-icons/fa6';
import SmallLed from './SmallLed';
import SearchBar from './SearchBar';
import tailwindConfig from "../tailwind.config";

export default function PokemonInfo(props) {
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
    const {page} = useContext(PageContext);
    const { p, id } = useParams();
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

    const handleBack = () => {
        // Go back to the correct page
        navigate(`/${p}`);
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(0.5rem, 2vw, 2rem)",
            fontFamily: '"Press Start 2P", "Pixelade", monospace',
            minHeight: "100vh"
        }}>
            {/* Pokédex Device Container */}
            <div style={{
                background: "linear-gradient(135deg, #cc0000 0%, #ff3333 50%, #990000 100%)",
                borderRadius: "clamp(1rem, 2vw, 2rem)",
                padding: "clamp(1rem, 2vw, 2rem)",
                maxWidth: "1400px",
                width: "100%",
                minHeight: "90vh",
                maxHeight: "95vh",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                border: "4px solid #660000",
                position: "relative",
                display: "flex",
                flexDirection: "column"
            }}>
                {/* Top Section with Logo and LEDs */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginBottom: "clamp(1rem, 2vw, 2rem)",
                    paddingBottom: "clamp(0.5rem, 2vw, 1rem)",
                    borderBottom: "3px solid rgba(0,0,0,0.3)"
                }}>
                    <div style={{ flex: "1 1 auto", display: "flex", alignItems: "center" }}>
                        <img 
                            alt="Pokedex" 
                            src="/assets/pokedex-logo.png" 
                            style={{
                                height: "clamp(50px, 10vw, 80px)",
                                maxWidth: "100%",
                                objectFit: "contain",
                                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                                userSelect: "none"
                            }}
                        />
                    </div>
                    
                    {/* LED Indicators */}
                    <div style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        flexShrink: 0
                    }}>
                        <SmallLed id="red-led" color="#dc2626" />
                        <SmallLed id="yellow-led" color="#fbbf24" />
                        <SmallLed id="green-led" color="#22c55e" />
                    </div>
                </div>

                {/* Search Bar */}
                <div style={{ 
                    marginBottom: "clamp(1rem, 2vw, 1.5rem)",
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <SearchBar />
                </div>

                {/* Screen Display */}
                <div className="pokedex-screen" style={{
                    background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
                    borderRadius: "clamp(0.5rem, 2vw, 1rem)",
                    padding: "clamp(1rem, 2vw, 2rem)",
                    border: "clamp(4px, 1vw, 8px) solid #333",
                    boxShadow: "inset 0 4px 8px rgba(0,0,0,0.1)",
                    height: "60dvh",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    marginBottom: "clamp(1rem, 2vw, 2rem)",
                    overflowY: "auto"
                }}>
                    {loading ? (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "1rem",
                            height: "100%"
                        }}>
                            <img 
                                src="/assets/animation.gif" 
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
                    ) : (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            width: "100%",
                            maxWidth: "800px",
                            gap: "1.5rem",
                            padding: "1rem 0"
                        }}>
                            {/* Profile Section */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                gap: "1rem",
                                width: "100%"
                            }}>
                                {image && (
                                    <img
                                        alt={`${name} profile`}
                                        src={image}
                                        style={{
                                            width: "clamp(96px, 20vw, 140px)",
                                            height: "clamp(96px, 20vw, 140px)",
                                            backgroundColor: "white",
                                            borderRadius: "50%",
                                            padding: "clamp(8px, 2vw, 12px)",
                                            border: "2px solid #d1d5db",
                                            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
                                            objectFit: "contain",
                                            display: "block",
                                            flexShrink: 0
                                        }}
                                    />
                                )}
                                <h1 style={{
                                    color: "#dc2626",
                                    fontSize: "clamp(1rem, 4vw, 1.5rem)",
                                    fontWeight: "bold",
                                    textTransform: "capitalize",
                                    margin: "0"
                                }}>
                                    {name}
                                </h1>
                            </div>

                            {/* Types */}
                            <div style={{
                                marginBottom: "1.5rem",
                                textAlign: "center",
                                width: "100%"
                            }}>
                                <h3 className="mb-3 m-0" style={{
                                    color: "#dc2626",
                                    fontSize: "clamp(0.7rem, 2vw, 0.875rem)"
                                }}>
                                    Types</h3>
                                <ul style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    justifyContent: "center",
                                    gap: "clamp(0.5rem, 1.5vw, 0.75rem)",
                                    listStyle: "none",
                                    padding: "0",
                                    margin: "0"
                                }}>
                                    {types.map((slot, index) => {
                                        const matchingType = allTypes.find(
                                            (type) => type.type === slot.type.name
                                        );
                                        return (
                                            <li
                                                key={index}
                                                style={{
                                                    transition: "transform 0.2s"
                                                }}
                                                onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                                                onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                                                title={slot.type.name}
                                            >
                                                {matchingType && (
                                                    <img
                                                        src={matchingType.url}
                                                        alt={slot.type.name}
                                                        style={{
                                                            backgroundColor: "white",
                                                            padding: "clamp(2px, 0.5vw, 4px)",
                                                            borderRadius: "8px",
                                                            border: "2px solid #d1d5db",
                                                            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                                                            width: "clamp(60px, 15vw, 96px)",
                                                            height: "auto"
                                                        }}
                                                    />
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Physical Stats */}
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "clamp(0.5rem, 1.5vw, 0.75rem)",
                                width: "100%"
                            }}>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                                    padding: "clamp(0.5rem, 1.5vw, 0.75rem)",
                                    borderRadius: "8px",
                                    borderLeft: "4px solid #dc2626"
                                }}>
                                    <h3 style={{
                                        color: "#dc2626",
                                        fontSize: "clamp(0.65rem, 2vw, 0.875rem)",
                                        margin: "0"
                                    }}>📏 Height</h3>
                                    <span style={{
                                        color: "#1f2937",
                                        fontWeight: "bold",
                                        fontSize: "clamp(0.65rem, 2vw, 0.875rem)"
                                    }}>
                                        {addDecimalPoint(height)} m
                                    </span>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                                    padding: "clamp(0.5rem, 1.5vw, 0.75rem)",
                                    borderRadius: "8px",
                                    borderLeft: "4px solid #dc2626"
                                }}>
                                    <h3 style={{
                                        color: "#dc2626",
                                        fontSize: "clamp(0.65rem, 2vw, 0.875rem)",
                                        margin: "0"
                                    }}>⚖️ Weight</h3>
                                    <span style={{
                                        color: "#1f2937",
                                        fontWeight: "bold",
                                        fontSize: "clamp(0.65rem, 2vw, 0.875rem)"
                                    }}>
                                        {addDecimalPoint(weight)} kg
                                    </span>
                                </div>
                                <div style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                                    padding: "clamp(0.5rem, 1.5vw, 0.75rem)",
                                    borderRadius: "8px",
                                    borderLeft: "4px solid #dc2626"
                                }}>
                                    <h3 style={{
                                        color: "#dc2626",
                                        fontSize: "clamp(0.65rem, 2vw, 0.875rem)",
                                        margin: "0"
                                    }}>⭐ Base Exp</h3>
                                    <span style={{
                                        color: "#1f2937",
                                        fontWeight: "bold",
                                        fontSize: "clamp(0.65rem, 2vw, 0.875rem)"
                                    }}>
                                        {baseExp}
                                    </span>
                                </div>
                            </div>

                            {/* Abilities */}
                            {abilities.length > 0 && (
                                <div style={{
                                    width: "100%",
                                    marginTop: "clamp(0.5rem, 2vw, 1rem)"
                                }}>
                                    <h3 style={{
                                        color: "#dc2626",
                                        fontSize: "clamp(0.7rem, 2vw, 0.875rem)",
                                        margin: "0 0 0.5rem 0",
                                        textAlign: "center"
                                    }}>🎯 Abilities</h3>
                                    <div style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "clamp(0.4rem, 1vw, 0.5rem)",
                                        justifyContent: "center"
                                    }}>
                                        {abilities.map((ability, index) => (
                                            <span
                                                key={index}
                                                style={{
                                                    backgroundColor: "rgba(220, 38, 38, 0.1)",
                                                    color: "#dc2626",
                                                    padding: "clamp(0.4rem, 1vw, 0.5rem) clamp(0.5rem, 1.5vw, 0.75rem)",
                                                    borderRadius: "6px",
                                                    fontSize: "clamp(0.6rem, 1.5vw, 0.7rem)",
                                                    border: "1px solid #dc2626",
                                                    fontWeight: "bold",
                                                    textTransform: "capitalize"
                                                }}
                                            >
                                                {ability.ability.name}
                                                {ability.is_hidden && " (H)"}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Battle Stats */}
                            {stats.length > 0 && (
                                <div style={{
                                    width: "100%",
                                    marginTop: "clamp(0.5rem, 2vw, 1rem)",
                                    backgroundColor: "rgba(255, 255, 255, 0.4)",
                                    padding: "clamp(0.75rem, 2vw, 1rem)",
                                    borderRadius: "8px",
                                    border: "2px solid rgba(220, 38, 38, 0.2)"
                                }}>
                                    <h3 style={{
                                        color: "#dc2626",
                                        fontSize: "clamp(0.7rem, 2vw, 0.875rem)",
                                        margin: "0 0 0.75rem 0",
                                        textAlign: "center"
                                    }}>⚔️ Battle Stats</h3>
                                    <div style={{
                                        display: "grid",
                                        gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                                        gap: "clamp(0.4rem, 1vw, 0.5rem)"
                                    }}>
                                        {stats.map((stat, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    backgroundColor: "rgba(255, 255, 255, 0.6)",
                                                    padding: "clamp(0.4rem, 1vw, 0.5rem)",
                                                    borderRadius: "6px",
                                                    fontSize: "clamp(0.6rem, 1.5vw, 0.75rem)"
                                                }}
                                            >
                                                <span style={{
                                                    color: "#1f2937",
                                                    fontWeight: "bold",
                                                    textTransform: "uppercase"
                                                }}>
                                                    {stat.stat.name.split("-").join(" ")}
                                                </span>
                                                <span style={{
                                                    color: "#dc2626",
                                                    fontWeight: "bold",
                                                    backgroundColor: "rgba(220, 38, 38, 0.1)",
                                                    padding: "clamp(0.2rem, 0.5vw, 0.25rem) clamp(0.4rem, 1vw, 0.5rem)",
                                                    borderRadius: "4px"
                                                }}>
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

                {/* Bottom Controls */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "clamp(0.5rem, 2vw, 1rem)",
                    padding: "clamp(0.5rem, 2vw, 1rem)",
                    background: "rgba(0,0,0,0.2)",
                    borderRadius: "clamp(0.5rem, 2vw, 1rem)",
                    border: "2px solid rgba(0,0,0,0.3)"
                }}>
                    {/* Left Control Area */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        alignItems: "center"
                    }}>
                        <div style={{
                            width: "clamp(60px, 15vw, 80px)",
                            height: "clamp(60px, 15vw, 80px)",
                            background: "rgba(0,0,0,0.4)",
                            borderRadius: "50%",
                            border: "3px solid #333",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "clamp(0.5rem, 1.5vw, 0.7rem)",
                            color: "white",
                            fontWeight: "bold"
                        }}>
                            D-PAD
                        </div>
                    </div>

                    {/* Right Control Area - Back Button */}
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.75rem",
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <button
                            onClick={handleBack}
                            style={{
                                background: "linear-gradient(135deg, #0099ff 0%, #0066cc 100%)",
                                border: "3px solid #003366",
                                color: "white",
                                width: "clamp(60px, 15vw, 80px)",
                                height: "clamp(60px, 15vw, 80px)",
                                borderRadius: "50%",
                                cursor: "pointer",
                                fontFamily: '"Press Start 2P", "Pixelade", monospace',
                                fontSize: "clamp(0.5rem, 1.5vw, 0.7rem)",
                                fontWeight: "bold",
                                boxShadow: "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)",
                                transition: "all 0.2s",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                gap: "0.25rem",
                                lineHeight: "1.2"
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = "scale(1.05)";
                                e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "scale(1)";
                                e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)";
                            }}
                        >
                            <FaChevronLeft style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)" }} />
                            <span>Back</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
