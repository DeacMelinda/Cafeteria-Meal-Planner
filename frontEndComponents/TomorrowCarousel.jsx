import TomorrowCafeteriaMenu from "./TomorrowCafeteriaMenu";
import "./Carousel.css";

const TomorrowCarousel = (props) => {

    return (
        <div style={{width:"100%"}}>
            <div className="list-containter1">
                <ul className="card-list">
                    {  props.data.map((cafeteria, index) => (
                        <li hidden={cafeteria.tomorrowMenu==null} key={String(index)}><TomorrowCafeteriaMenu cafeteria={cafeteria}/></li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default TomorrowCarousel;