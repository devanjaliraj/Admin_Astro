import React from "react";
import { Button, Col, Container, Row } from "reactstrap";
import "../../../assets/scss/pages/astrochat.scss";
import Buyimg from "../../../assets/img/boy-img.png";
import ChatAppList from "./ChatAppList";
import ChatAppMassage from "./ChatAppMassage";
import axiosConfig from "../../../axiosConfig";
import swal from "sweetalert";

class Chatpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userChatList: [],
      view: false,
      userId: "",
      astroId: "",
      msg: "",
      roomId: "",
      roomChatData: [],
      time: {},
      seconds: 60 * 15,
      reciver: "",
      minutes: 15,
      indexValue: 0,
    };
    this.timer = 0;
  }

  handleChangeAstro = () => {
    const ChatAstroid = this.props.ChatAstro;
    const Userlist = this.props.userlist;
    if (ChatAstroid != "" && Userlist != "") {
      this.setState({ view: true });

      let astroId = localStorage.getItem("Chat_astro_id");
      let Chatuserid = localStorage.getItem("Chat_user_id");
      axiosConfig
        .get(`/user/astrogetRoomid/${astroId}`)
        .then((response) => {
          console.log("chatuserlist", response?.data?.data);
          const list = response.data?.data;
          const newlist = list.filter(
            (value) => value?.userid?._id === Chatuserid
          );
          console.log(newlist);
          if (response.data.status === true) {
            this.setState({
              userChatList: newlist,
              roomId: response?.data?.data?.roomid,
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else swal("Error", "Please Select Astrologer and User");
  };
  componentDidMount() {
    let astroId = localStorage.getItem("Chat_astro_id");
    let Chatuserid = localStorage.getItem("Chat_user_id");

    axiosConfig
      .get(`/user/astrogetRoomid/${astroId}`)
      .then((response) => {
        console.log("chatuserlist", response?.data?.data);
        const list = response.data?.data;
        const newlist = list.filter(
          (value) => value?.userid?._id === Chatuserid
        );
        console.log(newlist);
        if (response.data.status === true) {
          this.setState({
            userChatList: newlist,

            roomId: response?.data?.data?.roomid,
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getChatRoomId = async (user, i) => {
    console.log("wwww", user);

    let userIds = [user?.userid?._id];
    this.setState({
      userId: user?.userid?._id,
      roomId: user?.roomid,
      indexValue: i,
      astroId: user?.astroid?._id,
    });
    await axiosConfig
      .get(`/user/allchatwithAstro/${user?.astroid?._id}`)
      .then((response) => {
        console.log(response?.data?.data);
        if (response.data.status === true) {
          console.log("allchat", response?.data.data);
          let filteredArray = response?.data?.data.filter(function (item) {
            return (
              userIds.indexOf(item?.userid?._id || item?.reciver?._id) > -1
            );
          });

          this.setState({ roomChatData: filteredArray });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  submitHandler = async (e, astroid, userId) => {
    e.preventDefault();
    if (this.state.msg !== "") {
      let obj = {
        reciver: this.state.userId,
        msg: this.state.msg,
      };
      let userIds = [this.state.userId];
      await axiosConfig
        .post(`/user/add_chatroom/${this.state.astroId}`, obj)
        .then(async (response) => {
          console.log("hdfkjh", response.data.status);
          if (response.data.status === true) {
            this.setState({ msg: "" });
            await axiosConfig
              .get(`/user/allchatwithAstro/${this.state.astroId}`)
              .then((response1) => {
                console.log(response1?.data?.data);
                if (response1.data.status === true) {
                  let filteredArray = response1?.data?.data.filter(function (
                    item
                  ) {
                    return (
                      userIds.indexOf(item?.userid?._id || item?.reciver?._id) >
                      -1
                    );
                  });
                  this.setState({ roomChatData: filteredArray });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
        })

        .catch((error) => {
          console.log(error);
        });
    } else swal("Alert", "Input field is blank. Add Some Value");
  };

  handleChange = (e) => {
    this.setState({
      msg: e.target.value,
    });
  };

  render() {
    const { indexValue } = this.state;
    return (
      <div className="maindivofchat">
        <section
          style={{ marginTop: "-57px" }}
          className="mb-2 d-flex justify-content-end customclass"
        >
          <Button
            onClick={() => {
              this.handleChangeAstro();
            }}
            color="success"
          >
            show chat
          </Button>
        </section>
        {this.state.view === true ? (
          <>
            <section className="">
              <Container>
                <Row>
                  <Col lg="4">
                    <div className="mymessagehead">
                      <div className="mymsgsubhead">
                        <h1 className="title mx-1 mb-2">User Name</h1>

                        <ChatAppList
                          userChatList={
                            this.state.userChatList?.length
                              ? this.state.userChatList
                              : []
                          }
                          getChatRoomId={(user, i) =>
                            this.getChatRoomId(user, i)
                          }
                        />
                      </div>
                    </div>
                  </Col>
                  <Col lg="8">
                    <div className="app rt-chat">
                      <div className="messages">
                        <div className="chat-header">
                          <p>
                            <span>
                              <img
                                src={
                                  this.state.roomChatData?.length > 0
                                    ? this.state.userChatList[indexValue]
                                        ?.userid?.userimg[0]
                                    : Buyimg
                                }
                                className="app-img"
                                alt="img"
                              />
                            </span>
                            {this.state.roomChatData?.length > 0
                              ? this.state.userChatList[indexValue]?.userid
                                  ?.fullname
                              : null}
                          </p>
                          <span className="appchattimer"></span>
                        </div>
                        <div className="messages-history">
                          <ChatAppMassage
                            roomChatData={
                              this.state.roomChatData?.length > 0
                                ? this.state.roomChatData
                                : []
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </>
        ) : null}
      </div>
    );
  }
}

export default Chatpage;
