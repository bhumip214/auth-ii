import React from "react";
import axios from "axios";
// import  List  from "@material-ui/core/List";
import requiresAuth from "../auth/requiresAuth";
import styled from "styled-components";

const UserWrapper = styled.div`
  text-align: center;
  padding-top: 20px;
`;

const H1 = styled.h1`
  color: red;
`;

const List = styled.div`
  padding: 0 100px;
`;

class Users extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    axios.get("/users").then(res => {
      this.setState({ users: res.data });
    });
  }

  render() {
    return (
      <UserWrapper>
        <H1> List of Users </H1>
        <>
          <hr />
          {this.state.users.map(user => {
            return (
              <List key={user.id}>
                <h4> Username: {user.username} </h4>
                <p> Department: {user.department} </p>
                <hr />
              </List>
            );
          })}
        </>
      </UserWrapper>
    );
  }
}

export default requiresAuth(Users);
