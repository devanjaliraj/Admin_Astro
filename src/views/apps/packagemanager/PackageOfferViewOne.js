import React from "react";
import {
  Card,
  CardBody,
  Row,
  Col,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import "../../../assets/scss/pages/app-ecommerce-shop.scss";
import { Route } from "react-router-dom";
import axiosConfig from "../../../axiosConfig";
import ReactHtmlParser from "react-html-parser";
import axios from "axios";
class PackageOfferViewOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/viewonePackage/${id}`)
      .then((response) => {
        console.log("viewOne", response.data.data);
        this.setState({ data: response.data.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <Row>
            <Col sm="12">
              <div>
                <Breadcrumb listTag="div">
                  <BreadcrumbItem href="/analyticsDashboard" tag="a">
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    href="/app/horoscopecategory/horoscopeCategoryList"
                    tag="a"
                  >
                    PackageOffer Category List
                  </BreadcrumbItem>
                  <BreadcrumbItem active>View PackageOffer</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  View PackageOffer
                </h1>
              </Col>
              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" btn btn-danger float-right"
                      onClick={() =>
                        history.push(
                          "/app/horoscopecategory/horoscopeCategoryList"
                        )
                      }
                    >
                      Back
                    </Button>
                  )}
                />
              </Col>
            </Row>
            <CardBody className="pb-0">
              <Row className="mb-5 mt-2">
                <Col md="6" sm="12" className="mb-4">
                  <h4>Title</h4>
                  <h6 className=""> {this.state.data.title}</h6>
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  <h4>MRP Price</h4>
                  <h6 className="">
                    {ReactHtmlParser(this.state.data.mrp_price)}
                  </h6>
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  <h4>Offer Price</h4>
                  <h6 className=""> {this.state.data.offer_price}</h6>
                </Col>

                <Col md="6" sm="12" className="mb-4">
                  <h4>Thumnail Image</h4>
                  <img
                    src={this.state.data.image}
                    alt="Thumnnail_Image_missing"
                    width={120}
                    height={120}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
export default PackageOfferViewOne;
