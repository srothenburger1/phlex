import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import getPgs from "./service/pgFakeDb";
//Components
import Navbar from "./components/Navbar";
import ResultPage from "./components/ResultPage";
import LandingPage from './components/LandingPage';
import UserSignup from './components/UserSignup/UserSignupComp';

//Stylesheets
import "./App.css";


class App extends Component {
  state = {
    data: {
      search: {
        photoType: "",
        dateFrom: "",
        basePrice: "300",
        addPrice: "50",
      },
      photographers: []
    },
    error: {},
    atHome: false
  };

  componentDidMount() {
    const photographers = getPgs();
    let { atHome } = this.state;
    atHome = this.props.location.pathname === '/' ? true : false;
    this.setState(prevState => ({
      data: { ...prevState.data, photographers: [...photographers], ...prevState.atHome = atHome }
    }))
  }

  componentWillReceiveProps(nextProps) {
    const photographers = getPgs();
    let { atHome } = this.state
    atHome = nextProps.location.pathname === '/' ? true : false;
    this.setState(prevState => ({
      data: { ...prevState.data, photographers: [...photographers], ...prevState.atHome = atHome }
    }))
  }

  handleChange = e => {
    const { value, id } = e.target;
    let search = {};
    Object.keys(this.state.data.search).map(input => (
      input === id
        ? (search[input] = value)
        : (search[input] = this.state.data.search[input])
    ));
    this.setState(prevState =>
      ({
        data: { ...prevState.data, search }
      }));
  };

  handleSearch = () => {
    const searchString = this.state.data.search.photoType;
    if (searchString) {
      return this.props.history.push('/result');
    }
  };

  render() {
    const { atHome } = this.state;
    return (
      <div className="App">
        <Navbar isLandingPage={atHome} />
        <Switch>
          <Route
            path="/result"
            render={props => (
              <ResultPage
                {...props}
                {...this.state}
                onChange={e => this.handleChange(e)}
              />
            )}
          />
          <Route
            path="/join"
            render={props => <h1>I am the Become a photographer page</h1>}
          />
          <Route
            path="/register"
            render={
              props => <UserSignup />
            }
          />
          <Route path="/login" render={props => <h1>I am the login page</h1>} />
          <Route
            exact
            path="/"
            //change this
            render={props => (
              <LandingPage
                {...props}
                {...this.state}
                onChange={e => this.handleChange(e)}
                onClick={() => this.handleSearch()}
              />
            )}
          />
          <Redirect from='*' to='/' />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
