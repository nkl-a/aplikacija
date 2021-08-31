import React from "react";
import { Container, Nav } from "react-bootstrap";
import { HashRouter, Link } from "react-router-dom";

export class MainMenuItem {
    text: string = '';
    link: string = '#';

    constructor(text: string, link: string) {
        this.text = text;
        this.link = link;
    }
}

interface MainMenuProperties {
    items: MainMenuItem[];
}

export class MainMenu extends React.Component<MainMenuProperties> {
    render() {
        return (
            <Container>
                <Nav variant="tabs">
                    <HashRouter>
                    {this.props.items.map(item => {
                        return (
                        <Link className="nav-link" to={item.link}>{item.text}</Link>

                        )
                    })}
                    </HashRouter>
                </Nav>

                
            </Container>
        )
    }
    
}