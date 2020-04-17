import React, { Component } from "react";
import ls from "local-storage";
import { Redirect } from "react-router";
import axios from "axios";
import { Form, Button, Alert, Navbar, Nav } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  username: yup
    .string()
    .required("Please Enter a username")
    .min(4, "Too Short!")
    .max(16, "Too Long!"),
  password: yup
    .string()
    .required("Please Enter your password")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "Must Contain 8 Characters, One Alphabet, One Number and one special case Character"
    ),
});

export default class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      username: "",
      show: false,
      type: "customer",
    };
  }

  UserNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/register">Register</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  };

  LoginForm = () => {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          username: "",
          password: "",
        }}
        onSubmit={(values, actions) => {
          axios
            .post("http://localhost:4000/user/login", values)
            .then((res) => {
              if (res.data !== null) {
                ls.set("username", res.data.username);
                ls.set("userType", res.data.userType);
                this.setState({
                  type: res.data.userType,
                  username: res.data.username,
                  redirect: true,
                });
              } else {
                actions.setFieldError(
                  "general",
                  "Username or Password is Incorrect!"
                );
                this.setState({ show: true });
              }
            })
            .catch((err) => {
              actions.setFieldError("general", err.message);
              this.setState({ show: true });
            })
            .finally(() => {
              actions.setSubmitting(false);
            });
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            {this.state.show && (
              <Form.Group>
                <Alert
                  key="general"
                  variant={errors.general ? "danger" : "light"}
                  onClose={() => this.setState({ show: false })}
                  dismissible
                >
                  {errors.general}
                </Alert>
              </Form.Group>
            )}

            <Form.Group md="6" controlId="loginUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                name="username"
                value={values.username}
                onChange={handleChange}
                isInvalid={
                  (touched.username || values.username) && errors.username
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.username}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group md="6" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                securetextentry="true"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isInvalid={
                  (touched.password || values.password) && errors.password
                }
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    );
  };

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          push
          to={"/" + this.state.type + "/" + this.state.username + "/predict"}
        />
      );
    }
    return (
      <React.Fragment>
        <this.UserNavbar />
        <br />
        <this.LoginForm />
      </React.Fragment>
    );
  }
}
