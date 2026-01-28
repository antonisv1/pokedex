import { Link } from "react-router-dom";
import { useContext } from "react";
import { PageContext } from "./PageContext";

export default function PokemonCard(props) {
   const { page } = useContext(PageContext);
   return (
        <Link
            className="no-underline text-inherit block"
            to={`/${page}/${props.name}`}
            title={`View ${props.name} details`}
        >
            <div
                className="flex items-center gap-2 p-3 w-full min-h-[70px] rounded-lg border-2 border-t-white border-l-white border-r-neutral-300 border-b-neutral-400 bg-gradient-to-b from-white via-neutral-50 to-neutral-100 cursor-pointer font-retro text-[clamp(0.65rem,1.3vw,0.85rem)] shadow-[0_4px_8px_rgba(0,0,0,0.15),0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.9)] transition-all hover:shadow-[0_6px_12px_rgba(0,0,0,0.2),0_3px_6px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.9)] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(0,0,0,0.08)]"
            >
                <img
                    src={props.src}
                    alt={props.name}
                    loading="lazy"
                    className="w-12 h-12 sm:w-14 sm:h-14 flex-none object-cover"
                />
                <span className="flex-1 font-bold capitalize leading-tight text-neutral-800">
                    {props.name}
                </span>
            </div>
        </Link>
   );
}