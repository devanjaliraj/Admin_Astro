import React, { Component } from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  Label,
  Input,
  CustomInput,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import axiosConfig from "../../../axiosConfig";
// import { history } from "../../../../history";
import swal from "sweetalert";
import { Route } from "react-router-dom";

export default class AddStartUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      mrp_price: "",
      offer_price: "",
      status: "",
      image: "",
      selectedName: "",
      selectedFile: null,
    };
  }
  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/viewonePackage/${id}`)
      .then((response) => {
        console.log(response);
        this.setState({
          title: response.data.data.title,
          offer_price: response.data.data.offer_price,
          mrp_price: response.data.data.mrp_price,
          image: response.data.data.image,
          status: response.data.data.status,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ selectedName: event.target.files[0].name });
    console.log(event.target.files[0]);
  };
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    console.log(this.state);
    const data = new FormData();
    data.append("title", this.state.title);
    data.append("offer_price", this.state.offer_price);
    data.append("mrp_price", this.state.mrp_price);
    data.append("status", this.state.status);

    // for (const file of this.state.selectedFile) {
    //   if (this.state.selectedFile !== null) {
    //     data.append("image", file, file.name);
    //   }
    // }
    for (var value of data.values()) {
      console.log(value);
    }
    for (var key of data.keys()) {
      console.log(key);
    }
    let { id } = this.props.match.params;
    axiosConfig
      // .post(`/editsize/${id}`, this.state)
      .post(`/admin/editPackage/${id}`, data)

      .then((response) => {
        console.log(response.data);

        swal("Success!", "Submitted SuccessFull!", "success");
        this.props.history.push("/app/poojapackage/packageList");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <div>
              <Breadcrumb listTag="div">
                <BreadcrumbItem href="/analyticsDashboard" tag="a">
                  Home
                </BreadcrumbItem>
                <BreadcrumbItem href="/app/poojapackage/packageList" tag="a">
                  Package List
                </BreadcrumbItem>
                <BreadcrumbItem active>Edit Package</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Edit Package
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/poojapackage/packageList")
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
                    placeholder=""
                    value={this.state.title}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>MRP Price</Label>
                  <Input
                    type="text"
                    name="mrp_price"
                    placeholder=""
                    value={this.state.mrp_price}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Offer Price</Label>
                  <Input
                    type="text"
                    name="offer_price"
                    placeholder=""
                    value={this.state.offer_price}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Image</Label>
                  <CustomInput
                    type="file"
                    multiple
                    onChange={this.onChangeHandler}
                  />
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label className="mb-1">Status</Label>
                  <div
                    className="form-label-group"
                    onChange={(e) => this.changeHandler1(e)}
                  >
                    <Input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Active"
                    />
                    <span style={{ marginRight: "20px" }}>Active</span>

                    <Input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="status"
                      value="Inactive"
                    />
                    <span style={{ marginRight: "3px" }}>Inactive</span>
                  </div>
                </Col>
              </Row>
              <Col lg="6" md="6" sm="6" className="mb-2">
                <Button.Ripple
                  color="primary"
                  type="submit"
                  className="mr-1 mb-1"
                >
                  Update
                </Button.Ripple>
              </Col>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
