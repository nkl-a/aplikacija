import React, { Component } from "react";
import { Card, Container } from "react-bootstrap";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { ArrayTypeNode, ObjectType } from "typescript";


interface Game { game_id: number, game_players_id: number, game_type_id: number, word_id: number }


 class Game extends Component<RouteComponentProps> {

    state = {
        gameId: '',
        word: ''
    }


     render() {
        
         return (
             <Container>
                 <Card>
                     <Card.Body>
                         <Card.Title>
                            Igra broj: {this.state.gameId} <br/>
                            Pogadja se rec: <b>{this.state.word}</b>
                         </Card.Title>

                         <img src={'/images/hangman6.png'}  alt="hangman" />
                     </Card.Body>
                 </Card>
             </Container>
         )
     }

     componentDidMount() {
        const state = this.props.location.state;
        
        console.log((state as any)?.game[0])

        this.setState({
            gameId: (state as any)?.game[0].word_id,
            word:  (state as any)?.game[0].word,
        })

        

     }



 }

 export default withRouter(Game);

