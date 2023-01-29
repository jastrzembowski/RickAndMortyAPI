import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import "./notfound.scss";
export default function NotFound() {
  return (
    <div className="notfound">
      <div className="wrapper">
        <div className="img-wrapper">
          <span className="notfound-title">44</span>
        </div>
        <p>We couldn't find the character that you are looking for...</p>
        <Button component={Link} to={`/`}>
          To character list
        </Button>
      </div>
      
    </div>
  );
}
