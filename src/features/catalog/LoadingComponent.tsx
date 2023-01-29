import avatar from "../../images/avatar.jpeg";
import "./catalog.scss";
let arr = [1, 2, 3, 4, 5, 6];
export default function LoadingComponent() {
  return (
    <div className="cards-box">
      {arr.map(() => (
        <div className="character-box">
          <img src={avatar} alt="skeleton avatar" />
    
        </div>
      ))}
    </div>
  );
}
