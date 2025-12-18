export default function SmallLed(props) {
    return (
        <div className="led-indicator font-retro">
            <div 
                id={props.id} 
                className="led-dot shadow-lg shadow-current" 
                style={{ backgroundColor: props.color }}
            ></div>
        </div>
    )
}