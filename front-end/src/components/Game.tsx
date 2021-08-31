import React from "react";
import { Card, Container } from "react-bootstrap";
import GameType from "../types/GameType";

interface GamePageProps {
    match: {
        params: {
            gId: number
        }
    }
}

interface GamePageState {
    game?: GameType;
}

 export default class Game extends React.Component<GamePageProps> {
     state: GamePageState;

     constructor(props: Readonly<GamePageProps>) {
         super(props)

         this.state = {}
     }


     render() {
         return (
             <Container>
                 <Card>
                     <Card.Body>
                         <Card.Title>
                            {this.state.game?.gameType}
                         </Card.Title>
                     </Card.Body>
                 </Card>
             </Container>
         )
     }

     componentWillMount() {
        this.getGameData(); 
     }

     componentWillReceiveProps(newProps: GamePageProps) {
         if(newProps.match.params.gId === this.props.match.params.gId){
             return;
         }
         
         this.getGameData();
     }

     private getGameData() {
        setTimeout(() => {
            const data: GameType = {
               gameType: 'Igra ' + this.props.match.params.gId
            }

            this.setState({
               game: data
           })


        }, 760);
     }

 }