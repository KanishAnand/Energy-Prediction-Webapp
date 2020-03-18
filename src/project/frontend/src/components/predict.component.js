import React, { Component } from "react";
import ls from "local-storage";
import { Link } from "react-router-dom";
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
          time: ""
        }}
        onSubmit={(values, actions) => {
          alert(values.date + " " + values.time + ":00:00");
          axios
            .post("http://localhost:4000/model/predict", {
              dateTime: values.date + " " + values.time + ":00:00"
            })
            .then(res => {
              actions.resetForm();
              alert(res.data.output);
            })
            .catch(err => {
              this.setState({ showe: err.message, shows: "" });
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
                value={values.date}
                onChange={handleChange}
                isInvalid={(touched.date || values.date) && errors.date}
              />
              <Form.Control.Feedback type="invalid">
                {errors.date}
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
                value={values.time}
                onChange={handleChange}
                isInvalid={(touched.time || values.time) && errors.time}
              />
              <Form.Control.Feedback type="invalid">
                {errors.time}
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
