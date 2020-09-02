import React, { useCallback, useEffect, useMemo, useState } from 'react';

const getPlanet = (id) => {
  return fetch('https://swapi.dev/api/planets/' + id)
  .then(res => res.ok ? res : Promise.reject(res))
  .then(res => res.json());
}

const useRequest = (request) => {
  const initialState = useMemo(() => ({
    loading: true,
    data: false,
    error: false,
  }), []);

  const [state, setState] = useState(initialState);

  useEffect(() => {
    let cancelled = false;

    setState(initialState);

    request()
      .then((data) => (
        !cancelled && setState({
          loading: false,
          data,
          error: false,
        })
      ))
      .catch(() => {
        !cancelled && setState({
          loading: false,
          data: false,
          error: true,
        })
      });
    
    return () => cancelled = true;
  }, [ request, initialState ]);

  return state;
}

const usePlanetData = (id) => {
  const request = useCallback(() => getPlanet(id), [ id ]);
  return useRequest(request);
}

export default ({ id }) => {
  const { loading, data, error} = usePlanetData(id);

  if(error)
    return <div>Something went wrong :(</div>

  if(loading)
    return <div>loading...</div>

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