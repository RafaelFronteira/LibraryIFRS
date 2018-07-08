import React, { Component } from 'react';

export default class Welcome extends Component {

    render() { 
        return ( 
            <div>
                <h3>Bem vindo à Libflix!</h3>
                <p>
                    Este é o seu site de compartilhamento de livros.
                    Aqui você pode publicar seus livros para a comunidade da Libflix.
                </p>
                <button onClick={ () => this.props.open("singin") } >Entre</button> ou 
                <button onClick={ () => this.props.open("singup") } >Junte-se!</button>
            </div>
         );
    }
}