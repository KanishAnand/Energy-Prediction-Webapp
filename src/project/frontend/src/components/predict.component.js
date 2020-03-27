import React, { Component } from "react";
import ls from "local-storage";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Navbar, Nav } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  date: yup.date().required("Please Enter the Date"),
  time: yup.string().required("Please Enter the Time")
});

export default class Predict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      type: "light"
    };
  }

  UserNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href={"#"}>Prediction</Nav.Link>
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
        {this.state.message !== "" && (
          <Alert
            key="general"
            variant={this.state.type}
            onClose={() => this.setState({ message: "", type: "light" })}
            dismissible
          >
            {this.state.message}
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
          this.setState({
            message: "Please wait for few seconds!!",
            type: "warning"
          });
          axios
            .post("http://localhost:4000/model/predict", {
              date: values.date,
              time: values.time
            })
            .then(res => {
              this.setState({ message: "Predicted Electricity Consumption is " + res.data + " KW/h", type: "success" });
            })
            .catch(err => {
              this.setState({ message: err.message, type: "danger" });
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
                type="time"
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
