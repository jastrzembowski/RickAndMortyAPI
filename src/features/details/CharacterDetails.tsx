import { Link, useParams } from "react-router-dom";
import {
  characterSelectors,
  fetchCharacterAsync,
} from "../catalog/catalogSlice";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { useEffect } from "react";
import { Character } from "../../app/models/interfaces";
import "./characterdetails.scss";
import { Button } from "@mui/material";
import NotFound from "../../app/errors/NotFound";

export default function CharacterDetails() {
  const { appStatus: characterStatus } = useAppSelector(
    (state) => state.catalog
  );

  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();
  const result = useAppSelector((state) =>
    characterSelectors.selectById(state, id!)
  );
  const character: Character = Object(result);

  useEffect(() => {
    if (result === undefined) dispatch(fetchCharacterAsync(parseInt(id!)));
  }, [id, result, dispatch]);

  if (!result && characterStatus==="idle") return <NotFound />;

  return (
    <article className="character-details__container">
      <div className="character-details__box">
        <div className="image-box">
          {" "}
          <img src={character.image} alt={character.name} />
          <Button className="desktop" component={Link} to="/">
            Return to list
          </Button>
        </div>{" "}
        <div className="character-text__box">
          <h1 className="desktop">Identification card</h1>
          <h2 className="desktop">{character.name} </h2>

          <div className="text-holder">
            <div className="text-left">
              <p>Name</p>
              <p>{character.name}</p>
              <p>Status</p>
              <p>{character.status}</p>
              <p>Species</p>
              <p>{character.species}</p>
              <p>Type</p>
              <p>{character.type ? character.type : "Unknown"}</p>
              <p>Gender</p>
              <p>{character.gender}</p>
            </div>
            <div className="text-right">
              <p>Origin</p>
              <p> {character.origin && character.origin.name}</p>

              <p>Last seen</p>
              <p>{character.location && character.location.name}</p>
              <p>Url</p>
              <a href={character.url} className="link">
                {character.url}
              </a>
            </div>{" "}
            <Button className="mobile" component={Link} to="/">
            Return to list
          </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
