import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
} from "reactstrap";
//import axios from "axios";
import axiosConfig from "../../../axiosConfig";
// import { useParams } from "react-router-dom";
//import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

import swal from "sweetalert";
export class EditPrediction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      rashiName: "",
      pre_type: "",
      desc: "",
      status: "",
    };
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`admin/getonePridiction/${id}`)
      .then((response) => {
        console.log(response);
        this.setState({
          title: response.data.data.title,
          rashiName: response.data.data.rashiName,
          pre_type: response.data.data.pre_type,
          desc: response.data.data.desc,
          status: response.data.data.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let { id } = this.props.match.params;
    axiosConfig
      .post(`admin/editPridiction/${id}`, this.state)
      .then((response) => {
        console.log(response);
        swal("Success!", "Submitted SuccessFull!", "success");
        this.props.history.push("/app/prediction/predictionList");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle="Predictoin"
          breadCrumbParent="Home"
          breadCrumbActive="Edit Predictoin "
        />
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Edit Prediction
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/prediction/predictionList")
                    }
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Title</Label>
                  <Input
                    required
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    value={this.state.title}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Prediction Type</Label>

                  <Input
                    required
                    type="select"
                    name="pre_type"
                    value={this.state.pre_type}
                    onChange={this.changeHandler}
                  >
                    <option selected>---Select---</option>
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </Input>
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Rashi name</Label>
                  <Input
                    required
                    type="select"
                    name="rashiName"
                    value={this.state.rashiName}
                    onChange={this.changeHandler}
                  >
                    <option>---Select Rashi---</option>
                    <option>Aries</option>
                    <option>Taurus</option>
                    <option>Gemini</option>
                    <option>Cancer</option>
                    <option>Leo</option>
                    <option>Virgo</option>
                    <option>Libra</option>
                    <option>Scorpio</option>
                    <option>Saggitarius</option>
                    <option>Capricorn</option>
                    <option>Aquarius</option>
                    <option>Pisces</option>
                  </Input>
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Description</Label>
                  <Input
                    required
                    type="textarea"
                    name="desc"
                    placeholder="Enter desc"
                    value={this.state.desc}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label className="mb-1">Status</Label>
                  <div
                    className="form-label-group"
                    onChange={(e) => this.changeHandler1(e)}
                  >
                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Active"
                    />
                    <span style={{ marginRight: "20px" }}>Active</span>

                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Inactive"
                    />
                    <span style={{ marginRight: "3px" }}>Inactive</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    Add
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default EditPrediction;
