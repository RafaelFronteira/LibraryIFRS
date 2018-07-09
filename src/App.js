import React, { Component } from 'react';
import Welcome from './components/welcome/Welcome';
import Singup from './components/user-credentials/Singup';
import Singin from './components/user-credentials/Singin';
import Main from './components/main/Main';
//import API from "./API";

export default class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      page: "welcome"
    };

  }

  open(page) {
    this.setState((state) => {
      state.page = page;
      return page;
    });
  }

  singup(userCredential) {
    userCredential.name  =  encodeURIComponent(userCredential.name);
    userCredential.email =  encodeURIComponent(userCredential.email);
    userCredential.pass  =  encodeURIComponent(userCredential.pass);

    // API.post("users", userCredential).then(response => {
    //   console.log("Respnse => ", response);
    //   this.setState((state) => {
    //     state.page = "welcome";
    //     return state;
    //   })
    // })

    this.setState((state) => {
      state.page = "welcome";
      return state;
    })
  }

  singin(userCredential) {
    userCredential.email    = encodeURIComponent(userCredential.email);
    userCredential.password = encodeURIComponent(userCredential.password);

    this.setState((state) => {
      console.log(userCredential);
      
      state.page = "main";
      return state;
    });
  }

  logout() {
     //remove o token do common
    this.setState((state) => {
      state.page = "welcome";
      return state;
    });  
  }

  render() {
    return (
      <div>
        { 
          this.state.page === "welcome" ? ( <Welcome open={ (open) => this.open(open) } />):
          (
            this.state.page === "singup" ? (
              <Singup 
                open={ (open) => this.open(open) }
                sUp={ (userCredential) => this.singup(userCredential) } />
            ): (
              this.state.page === "singin" ? (
                <Singin
                  open={ (open) => this.open(open) }
                  sIn={ (userCredential) => this.singin(userCredential) }
                />
              ): (
                this.state.page === "main" ? 
                (
                  <Main logout={ () => this.logout() } />
                ) : (0)
              )
            )
          )
        }
      </div>
    );
  }
}
