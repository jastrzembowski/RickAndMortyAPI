import headerImg from "../../images/header-img.png";
import "./header.scss";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <img src={headerImg} alt="Rick and Morty Header"></img>
      </Link>
    </header>
  );
}
