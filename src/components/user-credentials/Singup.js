import React, { Component } from 'react';

export default class Singup extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            name: "",
            email: "",
            pass: "",
            confirm: ""
         }
    }

    updateState(key, value) {
        this.setState((state) => {
            state[key] = value;
            return state;
        })
    }

    validate(){
        if(this.state.name === "" || this.state.name.trim() === "") return alert("Nome inválido!");
        if(this.state.email === "" || this.state.email.trim() === "") return alert("Email inválido!");
        if(this.state.pass === "" || this.state.pass.trim() === "") return alert("Senha inválida!");
        if(this.state.confirm === "" || this.state.confirm.trim() === "") return alert("Confirme a senha!");
        if(this.state.pass !== this.state.confirm) return alert("Senhas não correspondem!");

        const userCredentials = {
            name: this.state.name,
            email: this.state.email,
            pass: this.state.pass
        };

        this.props.sUp(userCredentials);
    }

    render() { 
        return ( 
            <div>
                <h3>Cadastro</h3>
                <div>
                    <input type="text" 
                        required
                        value={ this.state.name }
                        onChange={ (event) => this.updateState("name", event.target.value ) } 
                        placeholder="Nome"/>
                    <br/><br/>
                    <input type="email"
                        required 
                        value={ this.state.email }
                        onChange={ (event) => this.updateState("email", event.target.value ) } 
                        placeholder="Email"/>
                    <br/><br/>
                    <input type="password"
                        required 
                        value={ this.state.pass }
                        onChange={ (event) => this.updateState("pass", event.target.value ) } 
                        placeholder="Senha"/>
                    <br/><br/>
                    <input type="password"
                        required 
                        value={ this.state.confirm }
                        onChange={ (event) => this.updateState("confirm", event.target.value ) } 
                        placeholder="Confirme a senha"/>
                    <br/><br/>
                    <button onClick={ () => this.validate() }>Confirme</button>
                    <button onClick={ () => this.props.open("welcome")}>Cancelar</button>
                </div>
            </div>
         );
    }
}