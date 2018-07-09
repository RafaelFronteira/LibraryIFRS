import React, { Component } from 'react';

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: "",
            author: "",
            description: "",
            category: 0,
            image: "",
            pdf: "",
            addCategory: false,
            newCategory: ""
         }
    }

    componentDidMount() {
        if(this.props.editBook) {
            const book = this.props.editBook;

            this.setState((state) => {
                state.title = book.title;
                state.author = book.author;
                state.description = book.description;
                state.image = book.image;
                state.pdf = book.pdf;
                state.category = book.category.id; 
                return state;
            });
        }
    }


    updateState(key, value) {
        this.setState((state) => {
            state[key] = value;
            return state;
        })
    }

    updateStateFiles(key, file) {
        const myFile = file[0];
        const reader = new FileReader();

        reader.readAsDataURL(myFile);

        reader.onload = () => {
            this.setState((state) => {
                state[key] = reader.result;
                return state;
            })
        }
        reader.onerror = (error) => {
            console.log('Error => ', error);
        }
    }

    validate(bookId) {
        if(this.state.title === ""  || this.state.title.trim() === "") return alert("Título inválido!");
        if(this.state.author === "" || this.state.author.trim() === "") return alert("Autor inválido!");
        if(this.state.description === ""  || this.state.description.trim() === "") return alert("Descrição inválida!");
        if(this.state.category ===  0) return alert("Categoria inválida!");

        if(!bookId) {
            if(this.state.image === ""  || this.state.image.trim() === "") return alert("Imagem inválida!");
            if(this.state.pdf === ""    || this.state.pdf.trim() === "") return alert("PDF inválido!");

            const book = {
                title: this.state.title,
                author: this.state.author,
                category: this.state.category,
                image: this.state.image,
                pdf: this.state.pdf,
                description: this.state.description
            }
    
            this.props.addBook(book);
        } else {
            const book = {
                id: bookId,
                title: this.state.title,
                author: this.state.author,
                category: this.state.category,
                image: this.state.image,
                publishedAt: this.props.editBook.publishedAt,
                pdf: this.state.pdf,
                description: this.state.description
            }
    
            this.props.saveBook(book);
        }

        this.setState((state) => {
           state = { 
                title: "",
                author: "",
                description: "",
                category: 0,
                image: "",
                pdf: "",
                addCategory: false,
                newCategory: ""
            }

            return state;
        })
    }

    validateCategory() {
        if(this.state.newCategory === ""  || this.state.newCategory.trim() === "") return alert("Categoria inválida!");
        if(this.props.categories.find(category => 
            this.state.newCategory.toUpperCase() === category.name.toUpperCase())) return alert("Categoria já existe!");

        this.props.addCategory(this.state.newCategory)
        this.setState((state) => {
            state.addCategory = false;
            return state;
        });
    }

    render() { 
        return ( 
            <div className="border mx-auto p-3">
                <h3>Cadastre seu Livro</h3>
                <div>
                    <label htmlFor="title">Título: </label><br/>
                    <input 
                        id="title"
                        type="text"
                        value={ this.state.title }
                        placeholder="Título do livro"
                        required
                        onChange={ (event) => this.updateState("title", event.target.value)} />
                    <br/><br/>
                    <label htmlFor="author">Autor: </label><br/>
                    <input
                        id="author" 
                        type="text"
                        required
                        value={ this.state.author }
                        placeholder="Autor do livro"
                        onChange={ (event) => this.updateState("author", event.target.value)} />
                    <br/><br/>
                    <label htmlFor="category">Categoria: </label><br/>
                    <select required value={ this.state.category} onChange={ (event) => this.updateState("category", event.target.value) }>
                        <option selected value="">Selecione a categoria</option>
                        { this.props.categories.map(category => (
                            <option key={category.id} value={category.id}>{ category.name }</option>
                        )) }
                    </select><br/>
                    Não encontrou uma categoria? {
                        this.state.addCategory === false ? (
                            <button 
                                onClick={ () => this.setState((state) => state.addCategory = true)} >Adicione uma categoria</button>
                        ) : (
                            <button 
                                onClick={ () => this.setState((state) => state.addCategory = false)} >Cancelar</button>
                        )
                    }
                    { this.state.addCategory === true ? (
                        <div className="mt-2">
                            <input className="ml-1" 
                                type="text"
                                required 
                                value={ this.state.newCategory }
                                onChange={ (event) => this.updateState("newCategory", event.target.value) }/>
                            <button onClick={ () => this.validateCategory() }>Salvar</button>
                        </div>
                    ):("")}
                    <br/><br/>
                    { this.props.editBook ? 
                        ("") 
                        : 
                        (
                            <div>
                                <label htmlFor="image">Imagem: </label><br/>
                                <input
                                    id="image" 
                                    type="file"
                                    required
                                    accept=".jpg, .jpeg, .png"
                                    onChange={ (event) => this.updateStateFiles("image", event.target.files)} />
                                <br/><br/>
                                <label htmlFor="pdf">PDF: </label><br/>
                                <input
                                    id="pdf" 
                                    required
                                    type="file"
                                    accept=".pdf"
                                    onChange={ (event) => this.updateStateFiles("pdf", event.target.files)} />
                                </div>
                        )
                    }
                    <br/><br/>
                    <label htmlFor="desc">
                        Descrição: 
                    </label><br/>
                    <textarea
                        id="desc" 
                        required
                        value={ this.state.description } 
                        onChange={ (event) => this.updateState("description", event.target.value)} ></textarea>
                </div>
                <br/><br/>
                { this.props.editBook ? 
                    (<button onClick={ () => this.validate(this.props.editBook.id) }>Salvar</button>) 
                    : 
                    (<button onClick={ () => this.validate(null) }>Adicionar</button>)
                }
                <button onClick={ () => this.props.page("home") }>Cancelar</button>
            </div>
         );
    }
}