import Pokedex from "./Pokedex" 
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import PokemonInfo from "./PokemonInfo";
import LandingPage from "./LandingPage";
import NotFound from "./NotFound";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(    
      <>
        <Route path="/" element={<LandingPage />} />
        <Route path="/:p" element={<Pokedex />} />
        <Route path="/:p/:id" element={<PokemonInfo />} />
        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </>          
    )
  );
  
  return <RouterProvider router={router} />;
}

export default App;
