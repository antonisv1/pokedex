import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaCheck } from "react-icons/fa6";

export default function LandingPage() {
    const bgUrl = `${import.meta.env.BASE_URL}assets/bg.png`;
    const logoUrl = `${import.meta.env.BASE_URL}assets/pokedex-logo.png`;

    useEffect(() => {
        document.body.style.backgroundImage = `url('${bgUrl}')`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "bottom";
        document.body.style.backgroundAttachment = "fixed";
    }, [bgUrl])

    return (
        <div className="min-h-screen w-screen flex flex-col justify-between items-center py-8 px-4 bg-cover bg-bottom bg-fixed" style={{ backgroundImage: `url('${bgUrl}')` }}>
            {/* Header - Pokédex Logo */}
            <div className="pt-4">
                <Link to="/1" title="Start exploring Pokédex">
                    <img 
                        alt="Pokédex Logo" 
                        src={logoUrl}
                        className="h-24 md:h-32 drop-shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer"
                    />
                </Link>
            </div>

            {/* Main Content - Glassmorphism Card */}
            <div className="flex justify-center items-center flex-1 w-full max-w-[900px] relative">
                {/* Glow background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/60 via-pink-400/60 to-blue-400/60 rounded-[2rem] blur-[3rem] opacity-40 z-0 pointer-events-none"></div>

                {/* Main card */}
                <div className="relative z-10 bg-white/20 backdrop-blur-xl border-2 border-white/40 rounded-[2rem] p-8 sm:px-6 shadow-[0_8px_32px_rgba(0,0,0,0.3)] w-[90%] max-w-[800px]">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent rounded-[2rem] animate-pulse pointer-events-none"></div>

                    {/* Content */}
                    <div className="relative z-20 flex flex-col items-center text-center gap-8">
                        <h1 className="text-4xl text-red-600 drop-shadow-[0_4px_6px_rgba(0,0,0,0.2)] animate-bounce m-0 font-retro tracking-[0.1em]">
                            Welcome!
                        </h1>

                        <div className="space-y-6">
                            <p className="text-lg leading-relaxed font-retro mb-6">
                                This is an Interactive Pokédex built with React.js and the PokeAPI.
                            </p>

                            <div className="bg-white/30 backdrop-blur-lg rounded-3xl p-6 border border-white/50 mb-6">
                                <p className="font-bold text-red-600 mb-4 text-lg font-retro">
                                    Features:
                                </p>
                                <ul className="flex flex-col items-center gap-2 list-none p-0 m-0 text-gray-800 font-retro text-sm">
                                    <li className="flex items-center"><FaCheck className="text-red-600 mr-2 h-5 w-5" /> Browse all Pokémon</li>
                                    <li className="flex items-center"><FaCheck className="text-red-600 mr-2 h-5 w-5" /> Search by name</li>
                                    <li className="flex items-center"><FaCheck className="text-red-600 mr-2 h-5 w-5" /> View detailed stats</li>
                                    <li className="flex items-center"><FaCheck className="text-red-600 mr-2 h-5 w-5" /> Smooth navigation</li>
                                </ul>
                            </div>

                            <Link to="/1">
                                <button className="bg-gradient-to-br from-red-700 to-red-600 text-white border-none py-3 px-8 text-base rounded-lg cursor-pointer font-retro font-bold shadow-[0_4px_12px_rgba(220,38,38,0.4)] transition-all duration-300 tracking-wider hover:scale-105 hover:shadow-[0_6px_16px_rgba(220,38,38,0.6)]">
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
                    src={`${import.meta.env.BASE_URL}assets/pikachu-running.gif`}
                    alt="Pikachu running animation"
                />
            </div>

            <style>{`
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