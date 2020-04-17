import React, { Component } from "react";
import ls from "local-storage";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Navbar, Nav, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  subject: yup.string().required("Please mention the subject"),
  text: yup.string().required("Please tell us about your issue"),
});

export default class QueryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      type: "light",
    };
  }

  UserNavbar = () => {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#">Home</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link
              href={
                "/" +
                this.props.match.params.type +
                "/" +
                this.props.match.params.id +
                "/predict"
              }
            >
              Prediction
            </Nav.Link>
            <Nav.Link
              href={
                "/" +
                this.props.match.params.type +
                "/" +
                this.props.match.params.id +
                "/weather"
              }
            >
              Weather
            </Nav.Link>
            <Nav.Link
              href={
                "/" +
                this.props.match.params.type +
                "/" +
                this.props.match.params.id +
                "/users"
              }
            >
              Users
            </Nav.Link>
            <Nav.Link
              href={
                "/" +
                this.props.match.params.type +
                "/" +
                this.props.match.params.id +
                "/query"
              }
            >
              Customer Care
            </Nav.Link>
            <Nav.Link
              href={
                "/" +
                this.props.match.params.type +
                "/" +
                this.props.match.params.id +
                "/profile"
              }
            >
              Profile
            </Nav.Link>
            <Link className="nav-link" to="/login" onClick={(e) => ls.clear()}>
              Logout
            </Link>
          </Nav>
        </Navbar>
      </React.Fragment>
    );
  };

  HandleAlert = () => {
    setTimeout(() => {
      this.setState({ message: "", type: "light" });
    }, 10000);
    return (
      <React.Fragment>
        {this.state.message !== "" && (
          <React.Fragment>
            <br />
            <Alert
              key="general"
              variant={this.state.type}
              onClose={() => this.setState({ message: "", type: "light" })}
              dismissible
            >
              {this.state.message}
            </Alert>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  };

  View = () => {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          subject: "",
          text: "",
        }}
        onSubmit={(values, actions) => {
          axios
            .post("http://localhost:4000/user/form", {
              subject: values.subject,
              text: values.text,
              username: this.props.match.params.id,
            })
            .then((res) => {
              this.setState({
                message: "Form submitted successfully!",
                type: "success",
              });
              actions.resetForm();
            })
            .catch((err) => {
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
          errors,
        }) => (
          <Form onSubmit={handleSubmit}>
            <br />
            <Form.Group md="6" controlId="queryTo">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="to-label">To</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  name="to"
                  defaultValue="Maintenance Team"
                />
              </InputGroup>
            </Form.Group>

            <Form.Group md="6" controlId="queryFrom">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="from-label">From</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  name="from"
                  defaultValue={this.props.match.params.id}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group md="6" controlId="querySubject">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="subject-label">Issue</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={values.subject}
                  onChange={handleChange}
                  isInvalid={
                    (touched.subject || values.subject) && errors.subject
                  }
                />
                <Form.Control.Feedback type="invalid">
                  {errors.subject}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group md="6" controlId="queryText">
              <Form.Control
                as="textarea"
                name="text"
                placeholder="Write about your issue"
                value={values.text}
                onChange={handleChange}
                isInvalid={(touched.text || values.text) && errors.text}
              />
              <Form.Control.Feedback type="invalid">
                {errors.text}
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
        {ls.get("username") === this.props.match.params.id &&
          ls.get("userType") === this.props.match.params.type && (
            <React.Fragment>
              <this.UserNavbar />
              <this.HandleAlert />
              <this.View />
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}
