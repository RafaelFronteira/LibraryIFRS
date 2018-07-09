import React, { Component } from 'react';
import './List.css';

export default class List extends Component {
    
    constructor(props) {
        super(props);
    }

    

    render() {
        return ( 
            this.props.isCollection ? (
                <div className="w-100 flex-container">
                    {
                        this.props.books.map(book => (
                            <div key={book.id} className="card w-25 h-75 mh-75 mx-2 mt-4">
                                <img className="card-img-top" 
                                    height="150" 
                                    width="180" 
                                    src={book.image} 
                                    alt="Livro X" />
                                <div className="card-body">
                                    <h5 className="card-title">Título: {book.title}</h5>
                                    <p>Descrição:</p>  
                                    <p className="card-text card-book">
                                        {book.description}
                                    </p>
                                    <a href="#" 
                                        onClick={ () => this.props.edit(book) } 
                                        className="btn btn-secondary">editar</a>
                                </div>
                            </div> 
                        ))
                    }
                </div>
            ) 
            : (
                <div className="w-100 flex-container">
                    {
                        this.props.books.map(book => (
                            <div key={book.id} className="card w-25 h-75 mh-75 mx-2 mt-4">
                                <img className="card-img-top" 
                                    height="150" 
                                    width="180" 
                                    src={book.image} 
                                    alt="Livro X" />
                                <div className="card-body">
                                    <h5 className="card-title">Título: {book.title}</h5>
                                    <p>Descrição:</p>  
                                    <p className="card-text card-book">
                                        {book.description}
                                    </p>
                                    <a href="#" className="btn btn-secondary">Mais detalhes</a>
                                </div>
                            </div> 
                        ))
                    }
                </div>
            )
        );
    }
}