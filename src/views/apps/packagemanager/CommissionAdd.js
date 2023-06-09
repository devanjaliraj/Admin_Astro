import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Form,
  Label,
  Input,
  Button,
  CustomInput,
} from "reactstrap";
import axiosConfig from "../../../axiosConfig";
import swal from "sweetalert";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";

class AddCommission extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: "",
      comision_name: "",
      comision_rate: "",
      category: "",
      status: "",
    };
    this.state = {
      categoryList: [],
      productList: [],
    };
  }

  componentDidMount() {
    console.log(this.state.category);
    axiosConfig
      .get(`/admin/getproductcalegory`)
      .then((response) => {
        this.setState({ categoryList: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  componentDidUpdate() {}
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();

    axiosConfig
      .post(`/admin/add_Comision`, this.state)
      .then((response) => {
        swal("Success!", "Submitted SuccessFull!", "success");
        this.props.history.push("/app/packagemanager/commission");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle="Add Commission"
          breadCrumbParent="Home"
          breadCrumbActive="Add Commission "
        />
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Add Commission
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/packagemanager/commission")
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
                <Col lg="4" md="4" sm="4" className="mb-2">
                  <Label>Category Name</Label>
                  <CustomInput
                    required
                    type="select"
                    name="category"
                    onChange={(e) => {
                      axiosConfig
                        .get(`/user/productbycategory/${e.target.value}`)
                        .then((response) => {
                          this.setState({ productList: response.data.data });
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    }}
                  >
                    <option>Select.....</option>
                    {this.state.categoryList?.map((catList) => (
                      <option key={catList._id} value={catList?._id}>
                        {catList.name}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
                <Col lg="4" md="4" sm="4" className="mb-2">
                  <Label>Product Name</Label>
                  <CustomInput
                    required
                    type="select"
                    name="product"
                    placeholder="Enter Title"
                    value={this.state.product}
                    onChange={this.changeHandler}
                  >
                    <option>Select.....</option>
                    {this.state.productList?.map((proList) => (
                      <option key={proList._id} value={proList._id}>
                        {proList?.product?.productname}
                      </option>
                    ))}
                  </CustomInput>
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Commission Name</Label>
                  <Input
                    required
                    type="text"
                    name="comision_name"
                    placeholder="Commission Name"
                    value={this.state.comision_name}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Commission Rate</Label>
                  <Input
                    required
                    type="text"
                    name="comision_rate"
                    placeholder="Enter Commision Rate"
                    value={this.state.comision_rate}
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
                    Save
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

export default AddCommission;
