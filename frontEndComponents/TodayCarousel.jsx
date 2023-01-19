import TodayCafeteriaMenu from "./TodayCafeteriaMenu";
import "./Carousel.css";

const TodayCarousel = (props) => {

    return (
        <div style={{width:"100%"}}>
            <div className="list-containter1">
                <ul className="card-list">
                    {  props.data.map((cafeteria, index) => (
                        <li hidden={cafeteria.todayMenu==null} key={String(index)}><TodayCafeteriaMenu cafeteria={cafeteria}/></li>
                    ))}
                </ul>
            </div>
        </div>

    );
};

export default TodayCarousel;