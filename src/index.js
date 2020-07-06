import React, { useState, useContext, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Counter from './hook-counter';

const MyContext = React.createContext();

const Panel = () => {
  const name = useContext(MyContext);
  const [visible, setVisible ] = useState(true);

  useEffect(() => {
    const timerId = setTimeout(() => setVisible(false), 2000);

    return () => clearTimeout(timerId);
  }, []);

  if (visible) {
    return (
      <section style={{color: 'tomato', position: 'absolute', right: 0}}>
        <h2>Hello, { name }</h2>
      </section>
    )
  }

  return "";
}

const HookSwitcher = () => {
  const [font, setFont] = useState({
    size: 30,
    color: 'black',
  });

  return (
    <section>
      <h2 style={{fontSize: `${font.size}px`, color: font.color}}>
        Hello world!
      </h2>
      <button onClick={() => setFont((f) => ({...f, size: f.size + 5}))}>+</button>
      <button onClick={() => setFont((f) => ({...f, color: 'black'}))}>Black</button>
      <button onClick={() => setFont((f) => ({...f, color: 'tomato'}))}>Tomato</button>
      <button onClick={() => setFont((f) => ({...f, size: f.size - 5}))}>-</button>
    </section>
  );
}

const App = () => (
  <MyContext.Provider value="sobolev.ax">
    <main>
      <Panel />
      <HookSwitcher />

      <aside style={{border: '1px solid black', marginTop: '40px'}}>
        <Counter />
      </aside>
    </main>
  </MyContext.Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
