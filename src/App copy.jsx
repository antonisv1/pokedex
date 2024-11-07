import Pokedex from "./Pokedex" 
import { Route,  createBrowserRouter, createRoutesFromElements, RouterProvider,Routes, Link, BrowserRouter } from 'react-router-dom';
import { useContext } from "react";
import Pokemon from "./Pokemon2";

function App() {



  const router = createBrowserRouter(
    createRoutesFromElements(    <>
            <Route path="/" element={<Pokedex />}></Route>
            <Route path="/1" element={<Pokedex />}></Route>
            <Route path="/:p" element={<Pokedex />}></Route>
            <Route path="/:p/pokemon/:name" element={<Pokemon />} />
            <Route path="/pokemon/:name" element={<Pokemon />} />
            </>          
     )
  );
  return ( <>
    <BrowserRouter>
      <div className="pokedex-header-container">
        <Link className="pokedex-header" to="/1">
          <img alt="Pokedex" src="./assets/pokemon-logo.png" />
        </Link>
      </div>
      <div className="pokedex-container">
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/1" element={<Pokedex />} />
          <Route path="/:p" element={<Pokedex />} />
          <Route path="/:p/pokemon/:name" element={<Pokemon />} />
          <Route path="/pokemon/:name" element={<Pokemon />} />
        </Routes>
      </div>
    </BrowserRouter>
  </>
  )
}

export default App
