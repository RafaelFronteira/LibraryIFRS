import React, { Component } from 'react';

export default class Singin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "" 
        }
    }

    updateState(key, value) {
        this.setState((state) => {
            state[key] = value;
            return state;
        })
    }

    render() { 
        return ( 
            <div>
                <h3>Entrar</h3>
                <div>
                    <input type="email"
                        required 
                        value={ this.state.email }
                        onChange={ (event) => this.updateState("email", event.target.value ) } 
                        placeholder="Email"/>
                    <br/><br/>
                    <input type="password"
                        required 
                        value={ this.state.pass }
                        onChange={ (event) => this.updateState("password", event.target.value ) } 
                        placeholder="Senha"/>
                    <br/><br/>
                    <button onClick={ () => this.validate() }>Entrar</button>
                    <button onClick={ () => this.props.open("welcome")}>Cancelar</button>
                </div>
            </div>
         );
    }
} 
