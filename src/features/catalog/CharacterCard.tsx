import { Link } from "react-router-dom";
import { Character } from "../../app/models/interfaces";
import { Button } from "@mui/material";
interface Props {
  result: Character;
}

export default function CharacterCard({ result }: Props) {
  return (
    <div className="character-box">
      <img src={result.image} alt={result.name}></img>
      <div>
        <h1> {result.name}</h1>
        <p className="text-bold">
          <span
            className="circle"
            style={{
              backgroundColor:
                (result.status === "Alive" &&  "#526E2DFF") ||
                (result.status === "Dead" && "rgb(162, 5, 7)") ||
                (result.status === "unknown" && "#B7E4F9FF") ||
                "",
            }}
          />{" "}
          {result.status} / {result.species}{" "}
        </p>

        <p>
          <span className="text-bold"> Gender : </span>
          {result.gender}{" "}
        </p>
        <p className="text-bold">Last known location :</p>
        <p> {result.location.name}</p>
       <Button component={Link} to={`/${result.id}`}>See more</Button>
      </div>
    </div>
  );
}
