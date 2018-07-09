import React, { Component } from 'react';
import './Header.css';


export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            book: ""
         }
    }

    searchBook(book) {
        this.updateValue(book);
        this.props.search(book);
        return false;
    }

    updateValue(value) {
        this.setState((state) => {
            state.book = value;
            return state;
        })
    }

    render() { 
        return ( 
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="home">Libflix</a>
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <a  className="nav-link" 
                                    onClick={ () => this.props.page("home") }
                                    href="#Home">Home <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Categorias
                                </a>
                                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    {
                                        this.props.categories.map(category => (
                                            <a key={ category.id } 
                                                onClick={ () => this.props.findAllByCategory(category.name) }
                                                className="dropdown-item category-click">{ category.name }</a>
                                        ))
                                    }
                                </div>
                            </li>
                            <li className="nav-item">
                                <a  className="nav-link"
                                    onClick={ () => this.props.page("addBook") }
                                    href="#AddBook">Adicionar livro</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" 
                                    onClick={ () => this.props.openCollection() } 
                                    href="#Collection">Meu acervo</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" 
                                    onClick={ () => this.props.logout() }
                                    href="#">Sair</a>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" 
                                type="search"
                                value={ this.state.book }
                                onChange={ (event) => this.searchBook(event.target.value) } 
                                placeholder="Procurar Livro pelo TÍTULO" 
                                aria-label="Search"/>
                        </form>
                    </div>
                </nav>
            </div> 
        );
    }
}