import React, { Component } from "react";
import ls from "local-storage";
import axios from "axios";
import { Form, Button, Alert, InputGroup, Table, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";

const schema = yup.object({
  fromDate: yup.date().required("Please Enter the Date"),
  fromTime: yup.string().required("Please Enter the Time"),
  toDate: yup.date().required("Please Enter the Date"),
  toTime: yup.string().required("Please Enter the Time"),
});

export default class Predict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      type: "light",
      data: [],
    };
  }

  componentDidMount() {
    if (
      ls.get("username") !== this.props.match.params.id ||
      ls.get("userType") !== this.props.match.params.type
    ) {
      ls.clear();
      window.location.href = "/login";
    }
  }

  HandleAlert = () => {
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

  Data = () => {
    let table = [];
    let body = [];
    let row = [];
    row.push(<th key="date">{"Date"}</th>);
    row.push(<th key="energy">{"Energy(kWh)"}</th>);
    body.push(<tr key={0}>{row}</tr>);
    table.push(<thead key="head">{body}</thead>);
    body = [];
    for (let i in this.state.data) {
      row = [];
      row.push(<td key={"date" + i}>{this.state.data[i]["date"]}</td>);
      row.push(<td key={"energy" + i}>{this.state.data[i]["yhat"]}</td>);
      body.push(<tr key={i}>{row}</tr>);
    }
    table.push(<tbody key="body">{body}</tbody>);
    return (
      <Table striped bordered hover variant="light">
        {this.state.data !== null && this.state.data.length !== 0 && table}
      </Table>
    );
  };

  View = () => {
    return (
      <Formik
        validationSchema={schema}
        initialValues={{
          fromDate: "",
          fromTime: "",
          toDate: "",
          toTime: "",
        }}
        onSubmit={(values, actions) => {
          if (values.fromDate.localeCompare(values.toDate) > 0) {
            actions.setFieldError("toDate", "Invalid Date!");
            actions.setSubmitting(false);
          } else if (
            values.fromDate.localeCompare(values.toDate) === 0 &&
            values.fromTime.localeCompare(values.toTime) >= 0
          ) {
            actions.setFieldError("toTime", "Invalid Time!");
            actions.setSubmitting(false);
          } else {
            this.setState({
              message: "Please wait for some time!!",
              type: "warning",
              data: [],
            });
            axios
              .post("http://localhost:4000/model/predict", {
                fromDate: values.fromDate,
                fromTime: values.fromTime,
                toDate: values.toDate,
                toTime: values.toTime,
              })
              .then((res) => {
                this.setState({
                  message: "Energy Prediction Completed Successfully!",
                  type: "success",
                  data: res.data,
                });
              })
              .catch((err) => {
                this.setState({ message: err.message, type: "danger" });
              })
              .finally(() => {
                actions.setSubmitting(false);
              });
          }
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
            <Form.Row>
              <Form.Group as={Col} md="6" controlId="predictFrom">
                <Form.Label>From</Form.Label>
                <Form.Group md="6" controlId="predictFromDate">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="fromDate">Date</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="date"
                      placeholder="Date"
                      aria-describedby="fromDate"
                      name="fromDate"
                      value={values.fromDate}
                      onChange={handleChange}
                      isInvalid={
                        (touched.fromDate || values.fromDate) && errors.fromDate
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fromDate}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group md="6" controlId="predictFromTime">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="fromTime">Time</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="time"
                      placeholder="Time"
                      name="fromTime"
                      value={values.fromTime}
                      onChange={handleChange}
                      isInvalid={
                        (touched.fromTime || values.fromTime) && errors.fromTime
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.fromTime}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form.Group>

              <Form.Group as={Col} md="6" controlId="predictTo">
                <Form.Label>To</Form.Label>
                <Form.Group md="6" controlId="predictToDate">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="toDate">Date</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="date"
                      placeholder="Date"
                      aria-describedby="toDate"
                      name="toDate"
                      value={values.toDate}
                      onChange={handleChange}
                      isInvalid={
                        (touched.toDate || values.toDate) && errors.toDate
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.toDate}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                <Form.Group md="6" controlId="predictToTime">
                  <InputGroup>
                    <InputGroup.Prepend>
                      <InputGroup.Text id="toTime">Time</InputGroup.Text>
                    </InputGroup.Prepend>
                    <Form.Control
                      type="time"
                      placeholder="Time"
                      name="toTime"
                      value={values.toTime}
                      onChange={handleChange}
                      isInvalid={
                        (touched.toTime || values.toTime) && errors.toTime
                      }
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.toTime}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>
              </Form.Group>
            </Form.Row>

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    );
  };

  render() {
    return (
      <div className="container">
        <this.HandleAlert />
        <br />
        <this.View />
        <br />
        <br />
        <this.Data />
      </div>
    );
  }
}
