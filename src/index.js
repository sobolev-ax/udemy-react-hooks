import React, { useState, useContext } from 'react';
import ReactDOM from 'react-dom';

const MyContext = React.createContext();

const Panel = () => {
  const name = useContext(MyContext);

  return (
    <section style={{textAlign: 'right', color: 'tomato'}}>
      Hello, { name }
    </section>
  )
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
    </main>
  </MyContext.Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
