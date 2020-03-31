import React, { Component } from "react";
import Nav from "./Navbar";
//import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
import { Form, DatePicker, Select, Input, Button, Row, Col } from "antd";
import "antd/dist/antd.css";
import axios from "axios";
import "./RentCar.css";
import config from "../../src/config";

const CURRENT_USER_LICENSE = "currentUserLicense";
const CURRENT_USER_FIRSTNAME = "currentUserFirstName";
const CURRENT_USER_LASTNAME = "currentUserLastName";
const { RangePicker } = DatePicker;
const { Option } = Select;
class RentCarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      validated: false,
      setValidated: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
        return;
      }
      // Should format date value before submit.
      const rangeValue = fieldsValue["range-picker"];
      const values = {
        ...fieldsValue,
        startDate: rangeValue[0].format("YYYY-MM-DD"),
        endDate: rangeValue[1].format("YYYY-MM-DD")
      };
      console.log("Received values of form: ", values);
      this.bookACar(values);
    });
  };

  bookACar(values) {
    console.log("values", values);
    const postPayload = {
      firstName: values.firstname,
      license: values.license,
      lastName: values.lastname,
      start_date: values.startDate,
      end_date: values.endDate,
      car_type: values.car_type,
      userName: localStorage.getItem("userName")
    };
    axios
      .post(config.BackendUrl + "/bookacar", postPayload)
      .then(function(response) {
        console.log("response", response);
        return response;
      })
      .then(data => {
        console.log(data);
        alert(data.data);
      })
      .catch(function(error) {
        console.log("Error " + JSON.stringify(error));
      });
  }

  componentDidMount() {
    console.log("componentDidMount");
    var currentUserFirstName = localStorage.getItem(CURRENT_USER_FIRSTNAME);
    var currentUserLastName = localStorage.getItem(CURRENT_USER_LASTNAME);
    var currentUserLicense = localStorage.getItem(CURRENT_USER_LICENSE);

    const { getFieldValue } = this.props.form;

    this.props.form.setFieldsValue({
      firstname: currentUserFirstName,
      lastname: currentUserLastName,
      license: currentUserLicense
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const rangeConfig = {
      rules: [{ type: "array", required: true, message: "Please select time!" }]
    };

    return (
      <div>
               <Nav />
        <Row className="title-justify-center">
          <h2>Please complete the below form to rent a car</h2>
        </Row>
        <Row type="flex" justify="center" align="middle">
                  {" "}
          <Form className="booking-form" onSubmit={this.handleSubmit}>
            <Form.Item label="First Name">
              {getFieldDecorator("firstname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your first name!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
              
            <Form.Item label="Last Name">
              {getFieldDecorator("lastname", {
                rules: [
                  {
                    required: true,
                    message: "Please input your last name!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="License">
              {getFieldDecorator("license", {
                rules: [
                  {
                    required: true,
                    message: "Please input your license number!"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Select Booking Dates">
              {getFieldDecorator("range-picker", rangeConfig)(<RangePicker />)}
            </Form.Item>
            <Form.Item label="Car Type" className="rent-car-select">
              {getFieldDecorator("car_type", {
                rules: [
                  {
                    required: true,
                    message: "Please select a car!"
                  }
                ]
              })(
                <Select>
                  <Option value="Coupe">Coupe</Option>
                  <Option value="Sedan">Sedan</Option>
                  <Option value="SUV">SUV</Option>
                  <Option value="CamperVan">CamperVan</Option>
                </Select>
              )}
            </Form.Item>
            <Form.Item className="rent-car-submit">
                {" "}
              <Button variant="primary" htmlType="submit">
                     Submit   {" "}
              </Button>
            </Form.Item>
          </Form>
        </Row>
              {" "}
      </div>
    );
  }
}

const WrappedRentCarForm = Form.create({ name: "rent_car_form" })(RentCarPage);
export default WrappedRentCarForm;
