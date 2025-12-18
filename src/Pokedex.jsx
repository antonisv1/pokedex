import React, { useState, useEffect, createContext } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import PokemonList from './PokemonList';
import SearchBar from './SearchBar';
import SmallLed from './SmallLed';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

export const PageContext = createContext(0);

export default function Pokedex() {
    const [page, setPage] = useState(0);
    const { p, n } = useParams();
    const [name, setName] = useState("");
    const [onlyName, setOnlyName] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (p) {
            const pageNumber = parseInt(`${p}`);
            if (!isNaN(pageNumber) && pageNumber > 0) {
                console.log(p);
                setPage(pageNumber);
                setOnlyName(false);
            }
            else {
                console.log(p);
                setOnlyName(true);
            }
        }
    }, [p]);

    useEffect(() => {
        if (n) {
            setName(n);
        }
        else {
            setName("");
        }
    }, [n]);

    useEffect(() => {
        if (onlyName) {
            setName(p);
        }
        else {
            setName("");
        }
    }, [onlyName]);

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
                    <Link style={{ textDecoration: "none", display: "flex", alignItems: "center", flex: "1 1 auto" }} to="/1">
                        <img 
                            alt="Pokedex" 
                            src="./assets/pokedex-logo.png" 
                            style={{
                                height: "clamp(50px, 10vw, 80px)",
                                maxWidth: "100%",
                                objectFit: "contain",
                                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.3))",
                                cursor: "pointer",
                                transition: "transform 0.2s",
                                userSelect: "none"
                            }}
                            onMouseEnter={(e) => e.target.style.transform = "scale(1.05)"}
                            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
                        />
                    </Link>
                    
                    {/* LED Indicators */}
                    <div style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                        flexShrink: 0
                    }}>
                        <SmallLed id="red-led" color="red" />
                        <SmallLed id="yellow-led" color="yellow" />
                        <SmallLed id="green-led" color="green" />
                    </div>
                </div>

                {/* Search Bar */}
                {name.length === 0 && (
                    <div style={{ 
                        marginBottom: "clamp(1rem, 2vw, 1.5rem)",
                        display: "flex",
                        justifyContent: "center"
                    }}>
                        <SearchBar />
                    </div>
                )}

                {/* Main Screen - Cyan Display */}
                <div className="pokedex-screen" style={{
                    background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
                    border: "clamp(4px, 1vw, 8px) solid #333",
                    borderRadius: "clamp(0.5rem, 2vw, 1rem)",
                    boxShadow: "inset 0 8px 16px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.4)",
                    padding: "clamp(0.5rem, 2vw, 1rem)",
                    height: "60dvh",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    overflowY: "auto",
                    marginBottom: "clamp(1rem, 2vw, 1.5rem)"
                }}>
                    <PageContext.Provider value={{ page, setPage }}>
                        <PokemonList />
                    </PageContext.Provider>
                </div>

                {/* Bottom Controls Section */}
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

                    {/* Right Control Area - Action Buttons */}
                    <div style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "clamp(0.75rem, 2vw, 1rem)",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}>
                        <button onClick={() => {
                            if (page > 1 && name.length === 0) {
                                navigate(`/${page - 1}`);
                            }
                        }} style={{
                            background: "linear-gradient(135deg, #0099ff 0%, #0066cc 100%)",
                            border: "3px solid #003366",
                            color: "white",
                            width: "clamp(55px, 13vw, 70px)",
                            height: "clamp(55px, 13vw, 70px)",
                            borderRadius: "50%",
                            cursor: page > 1 && name.length === 0 ? "pointer" : "not-allowed",
                            fontFamily: '"Press Start 2P", "Pixelade", monospace',
                            fontSize: "clamp(0.5rem, 1.5vw, 0.65rem)",
                            fontWeight: "bold",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)",
                            transition: "all 0.2s",
                            opacity: page > 1 && name.length === 0 ? 1 : 0.5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.2rem",
                            lineHeight: "1.2"
                        }} onMouseEnter={(e) => {
                            if (page > 1 && name.length === 0) {
                                e.target.style.transform = "scale(1.05)";
                                e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)";
                            }
                        }} onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)";
                        }}>
                            <FaChevronLeft style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)", background: "transparent" }} />
                            <span>Back</span>
                        </button>
                        <button onClick={() => {
                            if (name.length === 0) {
                                navigate(`/${page + 1}`);
                            }
                        }} style={{
                            background: "linear-gradient(135deg, #ff6600 0%, #cc3300 100%)",
                            border: "3px solid #663300",
                            color: "white",
                            width: "clamp(55px, 13vw, 70px)",
                            height: "clamp(55px, 13vw, 70px)",
                            borderRadius: "50%",
                            cursor: name.length === 0 ? "pointer" : "not-allowed",
                            fontFamily: '"Press Start 2P", "Pixelade", monospace',
                            fontSize: "clamp(0.5rem, 1.5vw, 0.65rem)",
                            fontWeight: "bold",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)",
                            transition: "all 0.2s",
                            opacity: name.length === 0 ? 1 : 0.5,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "0.2rem",
                            lineHeight: "1.2"
                        }} onMouseEnter={(e) => {
                            if (name.length === 0) {
                                e.target.style.transform = "scale(1.05)";
                                e.target.style.boxShadow = "0 6px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)";
                            }
                        }} onMouseLeave={(e) => {
                            e.target.style.transform = "scale(1)";
                            e.target.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.3)";
                        }}>
                            <FaChevronRight style={{ fontSize: "clamp(0.8rem, 2vw, 1rem)", background: "transparent" }} />
                            <span>Next</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}