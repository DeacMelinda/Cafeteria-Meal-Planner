import { useAuth } from "./components/Auth";
import "./TodayCafeteria.css";

export const TodayMenuCard = () => {
    
    const current = new Date();

    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

    const auth = useAuth();

    return (
    <div className='paper'>

        <div className="lines"></div>
        <div className='text'>
            <h3>{date}</h3>
            <br></br>
            <ul>
            {(auth.user.todayMenu==null?"":
            auth.user.todayMenu.menuItems.map(
                menuItem => (
                    <li key={menuItem.menuItem}>
                        <h4>{menuItem.menuItem}</h4>
                    </li>
                ))
            )}
            </ul>
        </div> 
        
        <div className="holes hole-top"></div>
        <div className="holes hole-middle"></div>
        <div className="holes hole-bottom"></div>

    </div>
    );
}