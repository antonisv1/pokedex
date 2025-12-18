import { Link } from "react-router-dom";
import { useContext } from "react";
import { PageContext } from "./Pokedex";

export default function PokemonCard(props) {
   const { page } = useContext(PageContext);
   return (
    <Link className="no-underline" to={`/${page}/${props.name}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div 
            className="flex items-center justify-center rounded-2xl hover:scale-105 transition-all duration-300 cursor-pointer font-retro"
            style={{
                gap: "0.5rem",
                padding: "0.75rem",
                width: "100%",
                minHeight: "100px",
                background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f0abfc 100%)",
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)",
                fontSize: "0.875rem"
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.4), 0 4px 8px rgba(0, 0, 0, 0.3)";
                e.currentTarget.style.background = "linear-gradient(135deg, #93c5fd 0%, #c4b5fd 50%, #f5d0fe 100%)";
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.2)";
                e.currentTarget.style.background = "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f0abfc 100%)";
            }}
            title={`View ${props.name} details`}
        >
            <img 
                src={props.src} 
                alt={props.name}
                loading="lazy"
                className="object-contain hover:scale-110 transition-transform duration-300"
                style={{
                    width: "64px",
                    height: "64px",
                    flexShrink: 0
                }}
            />
            <span className="font-bold text-center capitalize" style={{ 
                color: "#000",
                flex: 1,
                minWidth: 0,
                lineHeight: "1.2"
            }}>{props.name}</span>
        </div>
    </Link>
   );
}