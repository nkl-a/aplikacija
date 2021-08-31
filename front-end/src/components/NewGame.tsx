import React, { useState } from "react";


function Home() {

  const [word, setWord] = useState('');

  let wordInput = React.createRef();

  const createGame = () => {
    console.log(word);
  }

  function handleChange (e: { target: { value: string }; }) {
      setWord(e.target.value)
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-6">
        <input className="form-control my-3" placeholder="Upisite vasu rec"  onChange={(event) => handleChange(event)}></input>
        <button className="btn btn-primary" onClick={() => createGame()}>Krairaj novu igru</button>
        </div>
      </div>
     
    </div>
  );

  
}

export default Home;

