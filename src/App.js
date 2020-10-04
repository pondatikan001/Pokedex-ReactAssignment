import React, { useState, useEffect } from "react";

const API_POKEMON = "https://pokeapi.co/api/v2/pokemon";

async function fetchData() {
  const response = await fetch(API_POKEMON);
  return response.json();
}

export default function App() {
  const [pokeData, setPokeData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  useEffect(() => {
    setLoading(true);
    fetchData()
      .then((apiResponse) => setPokeData(apiResponse.results))
      .catch(() => {
        setError("There are somethings wrong, pleas try aging later");
      })
      .finally(setLoading(false));
    return () => {};
  }, []);

  return (
    <>
      <h1>Pokedex</h1>
      {!isLoading && pokeData && (
        <ul>
          {pokeData.map((pokemon) => (
            <li>{pokemon.name}</li>
          ))}
        </ul>
      )}
    </>
  );
}
