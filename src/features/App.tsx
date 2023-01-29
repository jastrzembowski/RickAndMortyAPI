import { Route, Routes } from "react-router-dom";
import "./../styles.scss";
import Catalog from "./catalog/Catalog";
import Header from "./header/Header";
import CharacterDetails from "./details/CharacterDetails";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/:id" element={<CharacterDetails />} />
      </Routes>
    </>
  );
}

export default App;
