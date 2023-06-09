import React from "react";
import "../../../assets/scss/pages/astrochat.scss";

class ChatAppList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Index: "",

      userChatList: this.props.userChatList,
      roomid: "",
    };
  }

  render() {
    const { userChatList } = this.props;
    console.log("console.log", this.props.userChatList);
    return (
      <div
        className="listofchat"
        style={{ listStyle: "none", marginLeft: "none", cursor: "pointer" }}
      >
        {userChatList.length
          ? userChatList.map((user, i) => {
              return (
                <div
                  className="newmainheaading mt-1 mb-1"
                  style={{
                    backgroundColor: `${
                      this.state.Index === i ? "#ef9014" : "white"
                    }`,
                    borderRadius: "8px",
                    height: "60px",
                  }}
                  onClick={() => {
                    this.props.getChatRoomId(user, i);
                    this.setState({ Index: i });
                  }}
                >
                  <div
                    className="imglf"
                    onClick={() => this.props.getChatRoomId(user, i)}
                  >
                    <img
                      src={user.userid?.userimg}
                      className="app-img"
                      alt=""
                    />
                  </div>
                  <div className="lst-con mt-1">
                    <h5>{user.userid?.fullname}</h5>
                    <p>{user.msg}</p>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    );
  }
}

export default ChatAppList;
