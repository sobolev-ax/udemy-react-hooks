import React, { useEffect, useState } from 'react';

const getPlanet = (id) => {
  return fetch('https://swapi.dev/api/planets/' + id)
  .then(res => res.json());
}

const usePlanetData = (id) => {
  const [data, setData] = useState({});

  useEffect(() => {
    let cancelled = false;

    getPlanet(id).then((data) => !cancelled && setData(data));

    return () => cancelled = true;
  }, [id]);

  return data;
}

export default ({ id }) => {
  const data = usePlanetData(id);

  return (
    <section>
      <h3>Planet Info</h3>
      <ul>
        <li>
          id: { id }
        </li>
        <li>
          name: { data.name } 
        </li>
      </ul>
    </section>
  )
}