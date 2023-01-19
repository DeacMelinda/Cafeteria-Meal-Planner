import "./TodayCafeteria.css";

export const TomorrowMenuCard = ({writeOn}) => {
    
    const current = new Date();

    let tomorrow =  new Date()
    tomorrow.setDate(current.getDate() + 1)

    const date = `${tomorrow.getDate()}/${tomorrow.getMonth()+1}/${tomorrow.getFullYear()}`;

    return (
    <div className='paper'>

        <div className="lines"></div>
        <div className='text'>
            <h3>{date}</h3>
            <br></br>
            <ul>
                {writeOn.length == 0 ? "" : writeOn.map(item => (
                    <li>{item.menuItem}</li>
                ))}
            </ul>
        </div> 
        
        <div className="holes hole-top"></div>
        <div className="holes hole-middle"></div>
        <div className="holes hole-bottom"></div>

    </div>
    );
}