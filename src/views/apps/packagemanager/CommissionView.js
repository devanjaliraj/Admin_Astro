import React from "react";
import { Card, CardBody, Row, Col, Button } from "reactstrap";
// import { history } from "../../../history";
import "../../../assets/scss/pages/app-ecommerce-shop.scss";
import "../../../assets/scss/pages/users.scss";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
// import ReactHtmlParser from "react-html-parser";

import axiosConfig from "../../../axiosConfig";
import { Route } from "react-router-dom";
class CommissionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`admin/getOneComision/${id}`)
      .then((response) => {
        console.log("commission", response.data.data);
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
          <Breadcrumbs
            breadCrumbTitle="Commission"
            breadCrumbParent="Home"
            breadCrumbActive="View Commission"
          />
          <Row></Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  View Commission
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
            <CardBody className="pb-0">
              <Row className="ml-4">
                <Col md="4" sm="12" className="mb-4">
                  <h4>Category Name</h4>
                  <h6 className=""> {this.state.data.comision_name}</h6>
                </Col>
                <Col md="4" sm="12" className="mb-4">
                  <h4>Commission Name</h4>
                  <h6 className=""> {this.state.data.comision_name}</h6>
                </Col>
                <Col md="4" sm="12" className="mb-4">
                  <h4>Product Name</h4>
                  <h6 className=""> {this.state.data.product?.productname}</h6>
                </Col>
              </Row>
              <Row className="ml-4">
                <Col md="6" sm="12" className="mb-4">
                  <h4>Commission Rate</h4>
                  <h6 className=""> {this.state.data.comision_rate}</h6>
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

export default CommissionView;
