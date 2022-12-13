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
import { history } from "../../../../history";
import "../../../../assets/scss/pages/app-ecommerce-shop.scss";
import "../../../../assets/scss/pages/users.scss";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Route } from "react-router-dom";
import axiosConfig from "../../../../axiosConfig";
import ReactHtmlParser from "react-html-parser";

class ViewRashiHoroscope extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/getone_Rhscope/${id}`)

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
          <Breadcrumbs
            breadCrumbTitle="Rashi Management"
            breadCrumbParent="Home"
            breadCrumbActive="View Rashi Horoscope"
          />
          <Row>
            <Col sm="12">
              {/* <div>
                <Breadcrumb listTag="div">
                  <BreadcrumbItem href="/analyticsDashboard" tag="a">
                    Home
                  </BreadcrumbItem>
                  <BreadcrumbItem
                    href="/app/rashimanagement/rashihoroscope/rashiHoroscopeList"
                    tag="a"
                  >
                    Rashi Horoscope List
                  </BreadcrumbItem>
                  <BreadcrumbItem active>View Rashi Horoscope</BreadcrumbItem>
                </Breadcrumb>
              </div> */}
            </Col>
          </Row>
          <Card className="overflow-hidden app-ecommerce-details">
            <Row className="m-2">
              <Col>
                <h1 col-sm-6 className="float-left">
                  View Rashi Horoscope
                </h1>
              </Col>
              <Col>
                <Route
                  render={({ history }) => (
                    <Button
                      className=" btn btn-danger float-right"
                      onClick={() =>
                        history.push(
                          "/app/rashimanagement/rashihoroscope/rashiHoroscopeList"
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
              {/* <Row className="ml-4">
                <Col sm="9" md="12" lg="12">
                  <div className="users-page-view-table">
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Title
                      </div>
                      <div className="text-truncate">
                        <span>{this.state.data.title}</span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Short Description
                      </div>
                      <div className="text-truncate">
                        <span>
                          {ReactHtmlParser(this.state.data.sort_desc)}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Long Description
                      </div>
                      <div className="text-truncate">
                        <span>
                          {ReactHtmlParser(this.state.data.long_desc)}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex user-info">
                      <div className="user-info-title font-weight-bold">
                        Rashi Title
                      </div>
                      <div className="text-truncate">
                        <span>{this.state.data.rashiId[0].rashi_title}</span>
                      </div>
                    </div>
                   
                  </div>
                </Col>
              </Row> */}
              <Row className="mb-5 mt-2">
                <Col md="6" sm="12" className="mb-4">
                  <h4>Title</h4>
                  <h6 className=""> {this.state.data.title}</h6>
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  <h4>Rashi Title</h4>
                  <div className="text-truncate">
                    {this.state.data.rashiId?.map((rashi) => (
                      <span key={rashi._id}>{rashi?.rashi_title}</span>
                    ))}
                  </div>
                  {/* <h6 className=""> {this.state.data?.rashiId?.rashi_title}</h6> */}
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  <h4>Short Description</h4>
                  <h6 className="">
                    {" "}
                    {ReactHtmlParser(this.state.data.sort_desc)}
                  </h6>
                </Col>
                <Col md="6" sm="12" className="mb-4">
                  <h4>Long Description</h4>
                  <h6 className="">
                    {" "}
                    {ReactHtmlParser(this.state.data.long_desc)}
                  </h6>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

export default ViewRashiHoroscope;
