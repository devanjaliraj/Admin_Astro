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
import "../../../../assets/scss/pages/app-ecommerce-shop.scss";
import { Route } from "react-router-dom";
import axiosConfig from "../../../../axiosConfig";
class ViewRashi extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/getoneRashi/${id}`)
      .then((response) => {
        // console.log(response.data);
        console.log(response.data.data);
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
                    href="/app/rashimanagement/rashi/rashiList"
                    tag="a"
                  >
                    Rashi List
                  </BreadcrumbItem>
                  <BreadcrumbItem active>View Rashi</BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  View Rashi
                </h1>
              </Col>
              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" btn btn-danger float-right"
                      onClick={() =>
                        history.push("/app/rashimanagement/rashi/rashiList")
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
                  <h6 className=""> {this.state.data.rashi_title}</h6>
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  <h4>Category</h4>
                  <h6 className=""> {this.state.data.category?.title}</h6>
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  <h4>Date</h4>
                  <h6 className=""> {this.state.data.date}</h6>
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  <h4>Description</h4>
                  <h6 className=""> {this.state.data.desc}</h6>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
export default ViewRashi;
