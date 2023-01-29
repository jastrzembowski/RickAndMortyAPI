import { Route, Routes } from "react-router-dom";
import "./../styles.scss";
import Catalog from "./catalog/Catalog";
import Header from "./header/Header";
import CharacterDetails from "./details/CharacterDetails";
import NotFound from "../app/errors/NotFound";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/:id" element={<CharacterDetails />} />
        <Route path="*" element={<NotFound/>}/>

      </Routes>
    </>
  );
}

export default App;
