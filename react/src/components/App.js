import React from 'react';
import {Component} from 'react';
import {Route, Switch} from "react-router-dom";
import Face from './Face.jsx';

import who from './../who.json';


class App extends Component {

    constructor(props) {
        super(props)


        this.state = {
            faces: who.faces,
            selected: JSON.parse(JSON.stringify(who.faces[who.selected]))
        };
    }


    flipCard = (card, checked) => {

        let faces = this.state.faces;
        faces[card].checked = checked;
        this.setState({faces: faces});

    }

    void = () => {

    }


    render() {

        let faces = Object.keys(this.state.faces).map(face => {
            console.log(face)
            return <Face
                face={this.state.faces[face]}
                key={face}
                id={face}
                checked={this.state.faces[face].checked}
                flip={this.flipCard}
            />
        });

        return (
            <div>
                <div className="container">
                    <div className="row">
                        {faces}
                    </div>
                    <hr/>
                    <div className="row standard-gap">
                        <Face
                            face={this.state.selected}
                            key={who.selected + 1}
                            id={who.selected}
                            checked={false}
                            flip={this.void}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;