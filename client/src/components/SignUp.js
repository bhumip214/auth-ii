import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ErrorMessage = styled.p`
  color: red;
`;

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 4,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3
  },
  pushRight: {
    marginLeft: 10
  }
});

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      department: "",
      username: "",
      password: "",
      errorMessage: null
    };
  }

  handleChanges = e => {
    e.preventDefault();
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const endpoint = "http://localhost:4000/api/register";

    axios
      .post(endpoint, {
        department: this.state.department,
        username: this.state.username,
        password: this.state.password
      })
      .then(res => {
        //console.log(res.data);
        localStorage.setItem("jwt", res.data.token);
        this.props.history.push("/users");
      })
      .catch(err => {
        this.setState({ errorMessage: err.response.data.message });
      });
  };

  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />

        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>

          <form onSubmit={this.handleSubmit} className={classes.form}>
            {this.state.errorMessage && (
              <ErrorMessage>* {this.state.errorMessage}</ErrorMessage>
            )}
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="department">Department</InputLabel>
              <Input
                type="text"
                name="department"
                value={this.state.department}
                onChange={this.handleChanges}
                autoFocus
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                type="text"
                name="username"
                value={this.state.username}
                onChange={this.handleChanges}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                value={this.state.password}
                onChange={this.handleChanges}
                type="password"
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>

            <div>
              <p>
                Already have an account?
                <span className={classes.pushRight}>
                  <Link to="/sign-in">Sign In</Link>
                </span>
              </p>
            </div>
          </form>
        </Paper>
      </main>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignUp);