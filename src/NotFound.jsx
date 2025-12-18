import { Link, useNavigate } from "react-router-dom";
import SearchBar from './SearchBar';
import SmallLed from './SmallLed';
import { FaChevronLeft } from 'react-icons/fa6';

export default function NotFound() {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate("/1");
    };

    return (
        <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0.5rem",
            fontFamily: '"Press Start 2P", "Pixelade", monospace',
            minHeight: "100vh",
            width: "100%",
            boxSizing: "border-box"
        }}>
            {/* Pokédex Device Container */}
            <div style={{
                background: "linear-gradient(135deg, #cc0000 0%, #ff3333 50%, #990000 100%)",
                borderRadius: "1rem",
                padding: "1rem",
                maxWidth: "1400px",
                width: "100%",
                minHeight: "90vh",
                maxHeight: "95vh",
                boxShadow: "0 20px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                border: "4px solid #660000",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                boxSizing: "border-box"
            }}>
                {/* Top Section with Logo and LEDs */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: "1rem",
                    marginBottom: "1rem",
                    paddingBottom: "0.5rem",
                    borderBottom: "3px solid rgba(0,0,0,0.3)",
                    width: "100%",
                    boxSizing: "border-box"
                }}>
                    <Link style={{ textDecoration: "none", display: "flex", alignItems: "center", flex: "1 1 auto" }} to="/1">
                        <img 
                            alt="Pokedex" 
                            src="/assets/pokedex-logo.png" 
                            style={{
                                height: "60px",
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
                <div style={{ 
                    marginBottom: "1rem",
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    boxSizing: "border-box"
                }}>
                    <SearchBar />
                </div>

                {/* Main Screen - Cyan Display */}
                <div className="pokedex-screen flex flex-col items-center justify-center" style={{
                    background: "linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%)",
                    border: "4px solid #333",
                    borderRadius: "0.5rem",
                    boxShadow: "inset 0 8px 16px rgba(0,0,0,0.5), inset 0 -2px 4px rgba(255,255,255,0.1), 0 4px 12px rgba(0,0,0,0.4)",
                    padding: "1rem",
                    height: "60dvh",
                    
                    overflowY: "auto",
                    overflowX: "hidden",
                    marginBottom: "1rem",
                    flex: 1,
                    boxSizing: "border-box",
                    width: "100%"
                }}>
                    
                        <h1 className="animate-bounce items-center justify-center" style={{
                            fontSize: "1.5rem",
                            color: "#dc2626",
                            margin: 0,
                            animation: "bounce 1s infinite",
                            wordBreak: "break-word"
                        }}>404 Not Found!</h1>
                        
                        <p style={{
                            fontSize: "0.75rem",
                            color: "#333",
                            lineHeight: "1.6",
                            margin: 0,
                            wordBreak: "break-word",
                            
                        }}>
                            Oops! The page you are looking for doesn't exist.
                        </p>
                        
                        <p style={{
                            fontSize: "0.75rem",
                            color: "#333",
                            margin: 0,
                            wordBreak: "break-word"
                        }}>
                            Here is a dancing pikachu 🎶
                        </p>
                        
                        <img 
                            src="/assets/pikachu-dancing.gif" 
                            alt="Dancing Pikachu"
                            style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "contain",
                                maxWidth: "100%"
                            }}
                        />
                    
                </div>

                {/* Bottom Controls Section */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "1rem",
                    borderTop: "3px solid rgba(0,0,0,0.3)",
                    marginTop: "auto",
                    width: "100%",
                    boxSizing: "border-box"
                }}>
                    <button
                        onClick={handleBack}
                        style={{
                            background: "linear-gradient(145deg, #1e40af 0%, #3b82f6 100%)",
                            border: "4px solid #1e3a8a",
                            borderRadius: "50%",
                            width: "70px",
                            height: "70px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)",
                            color: "white",
                            fontSize: "0.6rem",
                            fontFamily: '"Press Start 2P", "Pixelade", monospace',
                            gap: "0.25rem",
                            padding: "0.5rem",
                            flexShrink: 0
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow = "0 6px 12px rgba(0,0,0,0.4), inset 0 2px 4px rgba(255,255,255,0.3)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.3), inset 0 2px 4px rgba(255,255,255,0.2)";
                        }}
                    >
                        <FaChevronLeft style={{ fontSize: "1.2rem", background: "transparent" }} />
                        <span>Back</span>
                    </button>
                </div>
            </div>
        </div>
    )
}