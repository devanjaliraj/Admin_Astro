import React from "react";
import { Route } from "react-router-dom";
import { Card, CardBody, Media, Row, Col, Button } from "reactstrap";
import axiosConfig from "../../../../axiosConfig";

class ViewBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
    };
  }
  componentDidMount() {
    //console.log(this.props.match.params);
    let { id } = this.props.match.params;
    axiosConfig
      .get(`admin/viewoneBlog/${id}`)
      .then((response) => {
        console.log(response.data);
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
        <Row>
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col>
                  <h1 col-sm-6 className="float-left">
                    Blog Detail
                  </h1>
                </Col>
                <Col>
                  <Route
                    render={({ history }) => (
                      <Button
                        className=" btn btn-danger float-right"
                        onClick={() =>
                          history.push("/app/blogmngment/blog/blogList")
                        }
                      >
                        Back
                      </Button>
                    )}
                  />
                </Col>
              </Row>
              <CardBody>
                <Row className="mx-0" col="12">
                  <Col className="pl-0" sm="12" lg="6">
                    <Media className="d-sm-flex d-block">
                      <Media className="mt-md-1 mt-0" left>
                        {this.state.data?.blogImg?.map((i) => (
                          <img
                            className="border-black m-0"
                            src={i}
                            alt="user avatar"
                            height="400"
                          />
                        ))}
                      </Media>
                      <Media body>
                        <Row className="ml-4">
                          <Col sm="9" md="12" lg="12">
                            <div className="users-page-view-table">
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Name
                                </div>
                                <div className="text-truncate">
                                  <span>{this.state.data.blog_title}</span>
                                  blogcategory ,blogImg , desc
                                </div>
                              </div>
                              <div className="d-flex user-info">
                                <div className="user-info-title font-weight-bold">
                                  Blog Category
                                </div>
                                <div className="text-truncate">
                                  <span>
                                    {this.state.data.blogcategory?.name}
                                  </span>
                                </div>
                              </div>
                              <div className="users-page-view-table">
                                <div className="d-flex user-info">
                                  <div className="user-info-title font-weight-bold">
                                    Description
                                  </div>
                                  <div>{this.state.data.desc}</div>
                                </div>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </Media>
                    </Media>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
export default ViewBlog;
