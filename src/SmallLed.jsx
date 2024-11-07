export default function SmallLed(props) {
    return (
        <div className="led-cover"><div id={props.id} className="led" style={{backgroundColor: props.color}}></div></div>
    )
}