import api from "../api/axioss";
import React, { Component } from "react";
import { Redirect, withRouter, } from "react-router-dom";

class NewGame extends Component {
  state = {
    word: '',
    done: false,
    redirect: false,
    url: '/',
    game: {}
}

  setNewWord = (e: any) => {
      this.setState({
        word:e.target.value
      })
  }

  createGame = () => {
      console.log(this.state.word)

      api.post('/addNewGame', {userWord: this.state.word})
      .then( (response) => {
        this.setState({
          url: `/game/${response.data.gameId}`,
          redirect: true,
          game: response.data
        })
      })
      .catch(function (error) {
        console.log(error);
      })

  }
  render() {

    if (this.state.redirect) {
      return <Redirect to={{
                pathname: this.state.url,
                state: {game: this.state.game}}} />
    }

    return (

      
      <div className="container">
        <div className="row">
          <div className="col-6">
          <input className="form-control my-3" placeholder="Upisite vasu rec"  onChange={this.setNewWord} value={this.state.word}></input>
          <button className="btn btn-primary" onClick={this.createGame}>Krairaj novu igru</button>
          </div>
        </div>
      
      </div>
    );
  }

  
}

export default NewGame;

