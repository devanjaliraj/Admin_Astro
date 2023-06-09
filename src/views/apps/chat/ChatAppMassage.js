import React from "react";

import "../../../assets/scss/pages/astrochat.scss";

class ChatAppMassage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    console.log("props value", this.props.roomChatData);
    return (
      <>
        {this.props.roomChatData.length
          ? this.props.roomChatData
              .map((chat, index) => {
                return (
                  <>
                    {chat.type === "user" ? (
                      <div class="message me">
                        <div class="message-body">{chat.msg}</div>
                      </div>
                    ) : (
                      <div className="message">
                        <div class="message-body">{chat.msg}</div>
                      </div>
                    )}
                  </>
                );
              })
              .reverse()
          : null}
      </>
    );
  }
}

export default ChatAppMassage;
