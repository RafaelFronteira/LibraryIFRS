import React, { Component } from 'react';
import Header from './Header';
import List from './book/List';
import Add from './book/Add';


export default class Main extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            page: "home",
            books: [],
            searchBooks: [],
            collection: [],
            categories: [],
            isCollection: false,
            book: null
         }
    }

    componentDidMount() {
        this.setState((state) => {
            state.books = [
                { 
                    id: 1,
                    title: "Meu livro legal", 
                    category: {
                        id:2,
                        name: "Suspense"
                    }, 
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
                    image:"https://livecoins.com.br/wp-content/uploads/2018/03/capa-lista-de-livros-1.jpg",

                },
                { 
                    id: 2,
                    title: "Uma aventura super interessante", 
                    category:{
                        id:4,
                        name: "Auto Ajuda"
                    }, 
                    description: "ABC", 
                    image:"https://livecoins.com.br/wp-content/uploads/2018/03/capa-lista-de-livros-1.jpg",

                },
                { 
                    id: 3,
                    title: "A volta dos que não foram", 
                    category:{
                        id:3,
                        name: "Romance"
                    }, 
                    description: "ABC", 
                    image:"https://livecoins.com.br/wp-content/uploads/2018/03/capa-lista-de-livros-1.jpg",

                },
                { 
                    id: 4,
                    title: "Senta que lá vem história", 
                    category:{
                        id:3,
                        name: "Romance"
                    }, 
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
                    image:"https://livecoins.com.br/wp-content/uploads/2018/03/capa-lista-de-livros-1.jpg",

                },
                { 
                    id: 5,
                    title: "Outro livrão legal", 
                    category:{
                        id:1,
                        name: "Comédia"
                    }, 
                    description: "ABC", 
                    image:"https://livecoins.com.br/wp-content/uploads/2018/03/capa-lista-de-livros-1.jpg",

                }
            ]
            
            state.categories = [
                {
                    id: 1,
                    name: "Comédia"
                },
                {
                    id: 2,
                    name: "Suspense"
                },
                {
                    id: 3,
                    name: "Romance"
                },
                {
                    id: 4,
                    name: "Auto Ajuda"
                }
            ]
            return state;
        });
    }

    findAllByCategory(category) {
        const books = this.state.books.filter(book => book.category.name === category);
        this.setState((state) => {
            state.searchBooks = books;
            state.page = "home"
            return state;
        });
    }

    addCategory(category) {
        this.setState((state) => {
            //gambi pra add um id. remover quando usar a API
            const cat = {
                id: this.state.categories.length + 1,
                name: category
            }

            state.categories.push(cat);
            return state;
        });
    }

    addBook(book) {
        const newBook = {
            id: this.state.books.length + 1,
            title: book.title,
            author: book.author,
            image: book.image,
            pdf: book.pdf,
            publishedAt: new Date(),
            description: book.description
        }

        this.setState((state) => {
            state.books.push(newBook);
            state.page  = "home";
            return state;
        });

    }

    editBook(book) {
        console.log(book)
        this.setState((state) => {
            const index = state.books.findIndex(bookItem => bookItem.id === book.id);
            if(index !== -1) {
                state.books[index] = book;
                this.page = "home";
                state.isCollection = true;
                return state;
            }
        })
    }

    changePage(page) {
        this.setState((state) => {
            if(page === "home") state.searchBooks = [];
            state.isCollection = false;
            state.page = page;
            return state;
        });
    }

    searchBook(myBook) {
        const book = this.state.books.filter(bookItem => myBook.toUpperCase() === bookItem.title.toUpperCase() );
        this.setState((state) => {
            state.searchBooks = book;
            return state;
        });
    }

    myCollection() {

        this.getCollection().then(response => {
            this.setState((state) => {
                state.isCollection = true;
                state.collection = response;
                return state;
            })
        });
    }


    getCollection() {
        return new Promise((resolve, reject) => {
            const collection = [
                { 
                    id: 1,
                    title: "Meu livro legal", 
                    category:"Suspense", 
                    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", 
                    image:"https://livecoins.com.br/wp-content/uploads/2018/03/capa-lista-de-livros-1.jpg",

                },
                { 
                    id: 2,
                    title: "Uma aventura super interessante", 
                    category:"Auto Ajuda", 
                    description: "ABC", 
                    image:"https://livecoins.com.br/wp-content/uploads/2018/03/capa-lista-de-livros-1.jpg",

                }
            ];

            resolve(collection);
        })
    }

    isEditMode(book) {
        console.log(book)
        this.setState((state) => {
            state.book = book;
            state.page = "addBook"; 
            return state;
        })
    }

    render() { 
        return ( 
            <div>
                <Header 
                    categories={ this.state.categories } 
                    openCollection={ () => this.myCollection() }
                    page={ (page) => this.changePage(page) }
                    findAllByCategory={ (category) => this.findAllByCategory(category) }
                    search={ (book) => this.searchBook(book)}
                    logout={ () => this.props.logout() }
                    />
                <div className="container mt-5">
                    { this.state.page === "home" ? 
                        ( <List books={ 
                            this.state.isCollection === true ? 
                                this.state.collection :
                                this.state.searchBooks.length > 0 ? 
                                this.state.searchBooks : this.state.books  
                            } 
                            edit={ (bookId) =>  this.isEditMode(bookId) }
                            isCollection={ this.state.isCollection }/> ) :
                        ( 
                            this.state.page === "addBook" ? 
                            (
                                <Add 
                                    editBook={ this.state.book }
                                    addBook={ (book) => this.addBook(book) }
                                    saveBook={ (book) => this.editBook(book) }
                                    categories={ this.state.categories } 
                                    addCategory={ (category) => this.addCategory(category)} 
                                    page={ (page) => this.changePage(page) } />
                            ): (0)
                        )
                    }
                </div>
            </div>
         );
    }
}