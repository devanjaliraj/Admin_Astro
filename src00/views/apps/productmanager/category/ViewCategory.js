import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Media,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { history } from "../../../../history";
import "../../../../assets/scss/pages/app-ecommerce-shop.scss";
import "../../../../assets/scss/pages/users.scss";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ReactHtmlParser from "react-html-parser";

import axiosConfig from "../../../../axiosConfig";
import axios from "axios";
import { Route } from "react-router-dom";
class ViewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/viewonePdctCategory/${id}`)

      .then((response) => {
        //console.log(response.data);
        console.log(response.data.data);
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          {/* <Breadcrumbs
            breadCrumbTitle="Product Category"
            breadCrumbParent="Home"
            breadCrumbActive="View CustoProduct Categorymer "
          /> */}
          <Row>
            <Col sm="12">
              <div>
                <Breadcrumb listTag="div">
                  <BreadcrumbItem href="/analyticsDashboard" tag="a">
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    href="/app/productmanager/category/categoryList"
                    tag="a"
                  >
                    Product Category List
                  </BreadcrumbItem>
                  <BreadcrumbItem active> Product Category</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  View Product Category
                </h1>
              </Col>
              <Col>
                <Button
                  className=" btn btn-danger float-right"
                  onClick={() =>
                    history.push("/app/productmanager/category/categoryList")
                  }
                >
                  Back
                </Button>
              </Col>
            </Row>
            <CardBody className="pb-0">
              <Row className="ml-4">
                <Col md="6" sm="12" className="mb-4">
                  <h4>Name</h4>
                  <h6 className=""> {this.state.data.name}</h6>
                </Col>
                <Col className="pl-0" sm="12" lg="6">
                  <h4>Image</h4>
                  <Media className="d-sm-flex d-block">
                    <Media className="mt-md-1 mt-0" left>
                      {this.state.data?.img?.map((i) => (
                        <img
                          className="border-black m-0"
                          src={i}
                          alt="user avatar"
                          height="100"
                        />
                      ))}
                    </Media>
                    <Media body></Media>
                  </Media>
                </Col>
              </Row>
              <Row className="ml-4">
                <Col md="6" sm="12" className="mb-4">
                  <h4>Description</h4>
                  <h6 className=""> {ReactHtmlParser(this.state.data.desc)}</h6>
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  <h4>Status</h4>
                  <h6 className=""> {this.state.data.status}</h6>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewProduct;
