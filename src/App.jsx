import Pokedex from "./Pokedex" 
import { Route,  createBrowserRouter, createRoutesFromElements, RouterProvider,Routes, Link, BrowserRouter } from 'react-router-dom';
import Pokemon from "./Pokemon";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";

function App() {



  const router = createBrowserRouter(
    createRoutesFromElements(    
    <> 
       <Route path="/" element={<LandingPage />}></Route>
       <Route path="/:p" element={<Pokedex />}></Route>
       <Route path="/:p/pokemon/:name" element={<Pokemon />} />
       <Route path="/pokemon/:name" element={<Pokemon />} />
       <Route path="/:p/:n" element={<Pokedex />} />
       <Route path="/pokemon/:name" element={<Pokemon />} />
       <Route path="*" element={<NotFound />} />
    </>          
     )
  );
  return ( 
    <RouterProvider router={router} />
  )
}

export default App
