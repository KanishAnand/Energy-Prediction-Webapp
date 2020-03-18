import React, { Component } from "react";
import ls from "local-storage";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
import { Form, Button, Alert, Navbar, Nav } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  date: yup.date().required("Please Enter the Date"),
  time: yup
    .number()
    .min(0)
    .max(23)
    .required("Please Enter the Time")
});

export default class Predict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shows: "",
      showe: ""
    };
  }

  UserNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href={"/vendor/" + this.props.match.params.id + "/add"}>
              Prediction
            </Nav.Link>
            <Link className="nav-link" to="/login" onClick={e => ls.clear()}>
              Logout
            </Link>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  };

  HandleAlert = () => {
    return (
      <React.Fragment>
        {this.state.showe !== "" && (
          <Alert
            key="general"
            variant={this.state.showe !== "" ? "danger" : "light"}
            onClose={() => this.setState({ showe: "" })}
            dismissible
          >
            {this.state.showe}
          </Alert>
        )}

        {this.state.shows !== "" && (
          <Alert
            key="general"
            variant={this.state.shows !== "" ? "success" : "light"}
            onClose={() => this.setState({ shows: "" })}
            dismissible
          >
            {this.state.shows}
          </Alert>
        )}
      </React.Fragment>
    );
  };

  View = () => {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          date: "",
          time: 0
        }}
        onSubmit={(values, actions) => {
          alert(values.date + values.time);
          alert("200");
        }}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group md="6" controlId="predictDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                placeholder="Date"
                aria-describedby="inputGroupPrepend"
                name="date"
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
            <Form.Group md="6" controlId="predictTime">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="23"
                secureTextEntry
                placeholder="Time"
                name="time"
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
    return (
      <React.Fragment>
        {ls.get("username") === this.props.match.params.id && (
          <React.Fragment>
            <this.UserNavbar />
            <br />
            <this.HandleAlert />
            <this.View />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
