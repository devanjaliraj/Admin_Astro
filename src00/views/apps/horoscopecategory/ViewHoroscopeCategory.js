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
class ViewHoroscopeCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/getoneCategory/${id}`)
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
                    href="/app/horoscopecategory/horoscopeCategoryList"
                    tag="a"
                  >
                    Horoscope Category List
                  </BreadcrumbItem>
                  <BreadcrumbItem active>
                    View Horoscope Category
                  </BreadcrumbItem>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  View Horoscope Category
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
                {/* <Col md="6" sm="12" className="mb-4">
                  <h4>Value</h4>
                  <h6 className=""> {this.state.data.value}</h6>
                </Col> */}
                <Col md="6" sm="12" className="mb-4">
                  <h4>Description</h4>
                  <h6 className=""> {ReactHtmlParser(this.state.data.desc)}</h6>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}
export default ViewHoroscopeCategory;
