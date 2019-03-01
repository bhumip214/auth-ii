import React from "react";
import axios from "axios";

// axios defaults and interceptors
axios.defaults.baseURL = "http://localhost:4000/api";
axios.interceptors.request.use(
  function(options) {
    options.headers.authorization = localStorage.getItem("jwt");

    return options;
  },
  function(error) {
    // do something with the error
    return Promise.reject(error);
  }
);

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem("jwt");
      const notLoggedIn = <div>Please sign in to see the users</div>;

      return <> {token ? <Component {...this.props} /> : notLoggedIn} </>;
    }
  };
}
