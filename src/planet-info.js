import React, { useState, useEffect } from 'react';

const usePlanetInfo = (id) => {
  const [ planet, setPlanet ] = useState({ id, name: ""});

  useEffect(() => {
    console.log('PlanetInfo, useEffect: update')

    let cancelled = false;

    fetch('https://swapi.dev/api/planets/' + planet.id)
      .then(res => res.json())
      .then(({ name }) => !cancelled && setPlanet((planet) => ({...planet, name})));

    return () => cancelled = true;
  }, [planet.id])

  const setId = (id) => setPlanet((planet) => ({...planet, id: id > 0 ? id : 1}))

  return [planet, setId];
}

export default () => {
  const [ planet, setId ] = usePlanetInfo(3);

  return (
    <section style={{border: "1px solid black"}}>
      <h3>Planet Info</h3>
      <ul>
        <li>
          id: { planet.id }
        </li>
        <li>
          name: { planet.name } 
        </li>
      </ul>

      <button onClick={() => setId(planet.id - 1)}>Prev</button>
      <button onClick={() => setId(planet.id + 1)}>Next</button>
    </section>
  )
}