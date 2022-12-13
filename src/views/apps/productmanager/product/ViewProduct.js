import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Breadcrumb,
  Media,
  BreadcrumbItem,
} from "reactstrap";
import { history } from "../../../../history";
import "../../../../assets/scss/pages/app-ecommerce-shop.scss";
import "../../../../assets/scss/pages/users.scss";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import ReactHtmlParser from "react-html-parser";
import axiosConfig from "../../../../axiosConfig";
import axios from "axios";
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
      .get(`/admin/viewoneProduct/${id}`)

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
            breadCrumbTitle="Customer"
            breadCrumbParent="Home"
            breadCrumbActive="View Customer "
          /> */}
          <Row>
            <Col sm="12">
              <div>
                <Breadcrumb listTag="div">
                  <BreadcrumbItem href="/analyticsDashboard" tag="a">
                    Product Detail
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    href="/app/productmanager/product/productList"
                    tag="a"
                  >
                    Product Management
                  </BreadcrumbItem>
                  <BreadcrumbItem active>Product Detail</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  View Product
                </h1>
              </Col>
              <Col>
                <Button
                  className=" btn btn-danger float-right"
                  onClick={() =>
                    history.push("/app/productmanager/product/productList")
                  }
                >
                  Back
                </Button>
              </Col>
            </Row>
            <CardBody className="pb-0">
              <Row className="ml-4">
                <Col sm="9" md="12" lg="12">
                  <div className="users-page-view-table">
                    <Row className="ml-4">
                      <Col sm="9" md="12" lg="12">
                        <Row className="mb-5 mt-2">
                          <Col md="6" sm="12" className="mb-4">
                            <h4>Title</h4>
                            <h6 className=""> {this.state.data.title}</h6>
                          </Col>
                          <Col md="6" sm="12" className="mb-4">
                            <h4>Product Name</h4>
                            <h6 className=""> {this.state.data.productname}</h6>
                          </Col>
                          <Col md="6" sm="12" className="mb-4">
                            <h4>price </h4>
                            <h6 className=""> {this.state.data.price}</h6>
                          </Col>
                          <Col md="6" sm="12" className="mb-4">
                            <h4>Category Name </h4>
                            <h6 className="">
                              {" "}
                              {this.state.data.category?.name}
                            </h6>
                          </Col>

                          <Col md="6" sm="12" className="mb-4">
                            <h4>Description</h4>
                            <h6 className="">
                              {" "}
                              {ReactHtmlParser(this.state.data.desc)}
                            </h6>
                          </Col>
                          <Col className="pl-0" sm="12" lg="6">
                            <h4>Image</h4>
                            <Media className="d-sm-flex d-block">
                              <Media className="mt-md-1 mt-0" left>
                                {this.state.data?.image?.map((i) => (
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
                          <Col md="6" sm="12" className="mb-4">
                            <h4>Status</h4>
                            <h6 className=""> {this.state.data.status}</h6>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>
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
