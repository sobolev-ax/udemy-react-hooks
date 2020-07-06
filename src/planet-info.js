import React, { useState, useEffect } from 'react';

export default () => {
  const [ planet, setPlanet ] = useState({ id: 3, name: ""});

  useEffect(() => {
    console.log('PlanetInfo, useEffect: update')

    let cancelled = false;

    fetch('https://swapi.dev/api/planets/' + planet.id)
      .then(res => res.json())
      .then(({ name }) => !cancelled && setPlanet((planet) => ({...planet, name})));

    return () => cancelled = true;
  }, [planet.id])

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

      <button onClick={() => setPlanet((planet) => ({...planet, id: planet.id - 1 ? planet.id - 1 : 1 }))}>Prev</button>
      <button onClick={() => setPlanet((planet) => ({...planet, id: planet.id + 1 }))}>Next</button>
    </section>
  )
}