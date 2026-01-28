export default function SmallLed(props) {
    return (
        <div className="led-indicator font-retro">
            <div 
                id={props.id} 
                className="led-dot shadow-sm shadow-current" 
                style={{ backgroundColor: props.color, color: props.color }}
            ></div>
        </div>
    )
}