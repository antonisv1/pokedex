import { Link } from "react-router-dom";
import React, { useEffect } from "react";

export default function LandingPage() {

    useEffect(() => {
        document.body.style.backgroundImage = "url('./assets/bg.png')";
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "bottom";
        document.body.style.backgroundAttachment = "fixed";
    }, [])

    return (
        <div className="min-h-screen w-screen flex flex-col justify-between items-center py-8 px-4 bg-cover bg-bottom bg-fixed" style={{ backgroundImage: "url('./assets/bg.png')" }}>
            {/* Header - Pokédex Logo */}
            <div className="pt-4">
                <Link to="/1" title="Start exploring Pokédex">
                    <img 
                        alt="Pokédex Logo" 
                        src="./assets/pokedex-logo.png" 
                        className="h-24 md:h-32 drop-shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                    />
                </Link>
            </div>

            {/* Main Content - Glassmorphism Card */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                width: "100%",
                maxWidth: "900px",
                position: "relative"
            }}>
                {/* Glow background */}
                <div style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to right, rgba(200,100,255,0.6), rgba(255,100,200,0.6), rgba(100,100,255,0.6))",
                    borderRadius: "2rem",
                    filter: "blur(3rem)",
                    opacity: 0.4,
                    zIndex: 0,
                    pointerEvents: "none"
                }}></div>

                {/* Main card */}
                <div style={{
                    position: "relative",
                    zIndex: 10,
                    background: "rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(20px)",
                    border: "2px solid rgba(255, 255, 255, 0.4)",
                    borderRadius: "2rem",
                    padding: "3rem",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                    width: "100%",
                    maxWidth: "800px"
                }}>
                    {/* Shine effect */}
                    <div style={{
                        position: "absolute",
                        inset: 0,
                        background: "linear-gradient(to bottom right, rgba(255,255,255,0.4), transparent)",
                        borderRadius: "2rem",
                        animation: "pulse 2s infinite",
                        pointerEvents: "none"
                    }}></div>

                    {/* Content */}
                    <div style={{
                        position: "relative",
                        zIndex: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        gap: "2rem"
                    }}>
                        <h1 style={{
                            fontSize: "2.5rem",
                            color: "#dc2626",
                            textShadow: "0 4px 6px rgba(0,0,0,0.2)",
                            animation: "bounce 1s infinite",
                            margin: 0,
                            fontFamily: '"Press Start 2P", "Pixelade", monospace',
                            letterSpacing: "0.1em"
                        }}>
                            Welcome!
                        </h1>

                        <div style={{ space: "1.5rem" }}>
                            <p style={{
                                fontSize: "1.125rem",
                                lineHeight: "1.6",
                                fontFamily: '"Press Start 2P", "Pixelade", monospace',
                                marginBottom: "1.5rem"
                            }}>
                                This is an Interactive Pokédex built with React.js and the PokeAPI.
                            </p>

                            <div style={{
                                background: "rgba(255, 255, 255, 0.3)",
                                backdropFilter: "blur(8px)",
                                borderRadius: "1.5rem",
                                padding: "1.5rem",
                                border: "1px solid rgba(255, 255, 255, 0.5)",
                                marginBottom: "1.5rem"
                            }}>
                                <p style={{
                                    fontWeight: "bold",
                                    color: "#dc2626",
                                    marginBottom: "1rem",
                                    fontSize: "1.125rem",
                                    fontFamily: '"Press Start 2P", "Pixelade", monospace'
                                }}>Features:</p>
                                <ul style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    gap: "0.5rem",
                                    listStyle: "none",
                                    padding: 0,
                                    margin: 0,
                                    color: "#1f2937",
                                    fontFamily: '"Press Start 2P", "Pixelade", monospace',
                                    fontSize: "0.875rem"
                                }}>
                                    <li>✓ Browse all Pokémon</li>
                                    <li>✓ Search by name</li>
                                    <li>✓ View detailed stats</li>
                                    <li>✓ Smooth navigation</li>
                                </ul>
                            </div>

                            <Link to="/1">
                                <button style={{
                                    background: "linear-gradient(135deg, #cc0000, #ff0000)",
                                    color: "white",
                                    border: "none",
                                    padding: "0.75rem 2rem",
                                    fontSize: "1rem",
                                    borderRadius: "0.5rem",
                                    cursor: "pointer",
                                    fontFamily: '"Press Start 2P", "Pixelade", monospace',
                                    fontWeight: "bold",
                                    boxShadow: "0 4px 12px rgba(220, 38, 38, 0.4)",
                                    transition: "all 0.3s ease",
                                    letterSpacing: "0.05em"
                                }} onMouseEnter={(e) => {
                                    e.target.style.transform = "scale(1.05)";
                                    e.target.style.boxShadow = "0 6px 16px rgba(220, 38, 38, 0.6)";
                                }} onMouseLeave={(e) => {
                                    e.target.style.transform = "scale(1)";
                                    e.target.style.boxShadow = "0 4px 12px rgba(220, 38, 38, 0.4)";
                                }}>
                                    Explore Pokémon!
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer - Pikachu */}
            <div className="relative w-full h-32 flex items-end justify-center overflow-hidden">
                <img 
                    className="h-24 md:h-32 animate-run object-contain" 
                    src="/assets/pikachu-running.gif" 
                    alt="Pikachu running animation"
                />
            </div>

            <style>{`
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-10px); }
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.5; }
                    50% { opacity: 1; }
                }
                @keyframes run {
                    0% { transform: translateX(-50%); }
                    30% { transform: translateX(30%); }
                    35% { transform: translateX(35%) translateY(-10px); }
                    37% { transform: translateX(40%) translateY(0); }
                    50% { transform: translateX(50%); }
                    60% { transform: translateX(40%); }
                    70% { transform: translateX(10%); }
                    80% { transform: translateX(40%) translateY(-20px); }
                    90% { transform: translateX(40%) translateY(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    )
}