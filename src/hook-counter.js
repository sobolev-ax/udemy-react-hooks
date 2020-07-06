import React, { Component, useState, useEffect } from 'react';

const HookCounter = ({ value }) => {

  useEffect(() => {
    console.log('HookCounter, useEffect: useEffect');

    return () => console.log('HookCounter, useEffect: clear');
  }, [ value ])

  return (
    <p>{ value }</p>
  )
}

class ClassCounter extends Component {

  constructor(props) {
    super(props);
    console.log('ClassCounter: constructor')
  }

  componentDidMount() {
    console.log('ClassCounter: mount')
  }

  componentDidUpdate() {
    console.log('ClassCounter: update')
  }

  componentWillUnmount() {
    console.log('ClassCounter: unmount')
  }

  render() {
    const { value } = this.props;

    return (
      <p>{ value }</p>
    )
  }
}

export default () => {
  const [visible, setVisible] = useState(true);
  const [value, setValue] = useState(0);

  if (visible) {
    return (
      <section>
        <button onClick={() => setVisible(false)}>+ Show/Hide Hook Counter</button>
        <h3>Hook Counter</h3>
        <HookCounter value={value} />
        <ClassCounter value={value} />
        <button onClick={() => setValue((v) => v + 1)}>+</button>
        <button onClick={() => setValue((v) => v - 1)}>-</button>
      </section>
    )
  }

  return (
    <section>
      <button onClick={() => setVisible(true)}>+ Show/Hide Hook Counter</button>
    </section>
  )
}