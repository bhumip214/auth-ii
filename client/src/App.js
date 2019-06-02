import React, { Component } from "react";
import { Route, NavLink, withRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Users from "./components/Users";
import "./App.css";
import styled from "styled-components";

const NavBAR = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 60px;
  margin-bottom: 20px;
  background-color: lightgrey;
`;

const NavLinks = styled.div`
  text-align: center;
  margin-left: 100px;
  flex: 1;
  a {
    text-decoration: none;
    padding: 30px;
    color: blue;
  }
  a.active {
    color: red;
  }
`;
const Button = styled.button`
  padding: 10px 20px;
  background-color: black;
  color: white;
  font-weight: bold;
  text-align: right;
  border-radius: 5px;
`;

const ButtonDiv = styled.div`
  display: flex;
  align-items: center;
  right: 10px;
`;

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  logout = () => {
    localStorage.removeItem("jwt");
    this.props.history.push("/sign-in");
  };

  render() {
    return (
      <div>
        <NavBAR>
          <NavLinks>
            <NavLink to="/sign-up"> Sign up </NavLink>
            <NavLink to="/sign-in">Sign In</NavLink>
            <NavLink exact to="/users">
              Users
            </NavLink>
          </NavLinks>
          <ButtonDiv>
            <Button onClick={this.logout} color="primary">
              LOGOUT
            </Button>
          </ButtonDiv>
        </NavBAR>
        <div>
          <Route exact path="/users" component={Users} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/sign-in" component={SignIn} />
        </div>
      </div>
    );
  }
}

export default withRouter(App);
