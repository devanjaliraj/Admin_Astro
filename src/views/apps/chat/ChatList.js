import React from "react";
import { Card, Row, Col } from "reactstrap";
import axiosConfig from "../../../axiosConfig";
import "../../../assets/scss/plugins/tables/_agGridStyleOverride.scss";
import "../../../assets/scss/pages/users.scss";
import Chatpage from "./Chatpage";

class ChatList extends React.Component {
  state = {
    rowData: [],
    AstroId: "",
    UserId: "",
    astrolist: [],
    ChatAstro: [],
    mode: false,
    paginationPageSize: 20,
    currenPageSize: "",
    getPageSize: "",
    userlist: "",
    defaultColDef: {
      sortable: true,
      editable: true,
      resizable: true,
      suppressMenu: true,
    },
  };

  async componentDidMount() {
    axiosConfig.get(`/admin/alluser`).then((response) => {
      let userlist = response.data.data;
      console.log(userlist);
      this.setState({ userlist: userlist });
    });
  }

  render() {
    const { rowData, columnDefs, defaultColDef } = this.state;
    return (
      <div>
        <Row className="app-user-list">
          <Col sm="12">
            <Card>
              <Row className="m-2">
                <Col lg="3" md="3" sm="12">
                  <label for="cars">
                    <b>Select Aser</b>
                  </label>
                  <select
                    onChange={(e) => {
                      localStorage.setItem("Chat_user_id", e.target.value);
                      this.setState({ UserId: e.target.value });
                      axiosConfig
                        .get(`/user/getroomid/${e.target.value}`)
                        .then((res) => {
                          this.setState({ ChatAstro: res.data.data });
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                      console.log(e.target.value);
                    }}
                    className="form-control"
                    name="cars"
                    id="cars"
                  >
                    <option value="volvo">Select User</option>
                    {this.state.userlist.length > 0 ? (
                      <>
                        {this.state.userlist?.map((value) => (
                          <>
                            <option key={value?._id} value={value?._id}>
                              {value?.fullname}
                            </option>
                          </>
                        ))}
                      </>
                    ) : null}
                  </select>
                </Col>
                <Col lg="3" md="3" sm="12">
                  <label for="cars">
                    <b>Select Astrologer</b>
                  </label>
                  <select
                    onChange={(e) => {
                      console.log(e.target.value);
                      this.setState({ AstroId: e.target.value });
                      localStorage.setItem("Chat_astro_id", e.target.value);
                    }}
                    className="form-control"
                    name="cars"
                    id="cars"
                  >
                    <option>User Chat with</option>
                    {this.state.ChatAstro?.length > 0 ? (
                      <>
                        {this.state.ChatAstro?.map((value) => (
                          <>
                            <option
                              key={value?._id}
                              value={value?.astroid?._id}
                            >
                              {value?.astroid?.fullname}
                            </option>
                          </>
                        ))}
                      </>
                    ) : null}
                  </select>
                </Col>
              </Row>

              <>
                <Row>
                  <div className="container">
                    <Chatpage
                      userlist={this.state.UserId}
                      ChatAstro={this.state.AstroId}
                    />
                  </div>
                </Row>
              </>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChatList;
