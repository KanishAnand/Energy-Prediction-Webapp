import React, { Component } from "react";
import ls from "local-storage";
import { Link } from "react-router-dom";
import axios from "axios";
import { Form, Button, Alert, Navbar, Nav, InputGroup } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  issue: yup.string().required("Please mention the subject"),
  query: yup.string().required("Please tell us about your issue")
});

export default class QueryForm extends Component {
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
            <Link className="nav-link" to="/login" onClick={e => ls.clear()}>
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
          issue: "",
          query: ""
        }}
        onSubmit={(values, actions) => {
          this.setState({
            message: "Form submitted successfully!",
            type: "success"
          });
          actions.resetForm();
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
            <Form.Group md="6" controlId="queryTo">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="to-label">To</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control type="text" name="to" value="Maintenance Team" />
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
                  value={this.props.match.params.id}
                />
              </InputGroup>
            </Form.Group>

            <Form.Group md="6" controlId="queryIssue">
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="issue-label">Issue</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  name="issue"
                  placeholder="Subject"
                  value={values.issue}
                  onChange={handleChange}
                  isInvalid={(touched.issue || values.issue) && errors.issue}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.issue}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group md="6" controlId="queryTextArea">
              <Form.Control
                as="textarea"
                name="query"
                placeholder="Write about your issue"
                value={values.query}
                onChange={handleChange}
                isInvalid={(touched.query || values.query) && errors.query}
              />
              <Form.Control.Feedback type="invalid">
                {errors.query}
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
              <br />
              <this.HandleAlert />
              <this.View />
            </React.Fragment>
          )}
      </React.Fragment>
    );
  }
}
