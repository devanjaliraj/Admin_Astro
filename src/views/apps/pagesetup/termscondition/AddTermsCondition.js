import React from "react";
import { Card, CardBody, Col, Row, Form, Button, Label } from "reactstrap";
import "react-toastify/dist/ReactToastify.css";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../../../../assets/scss/plugins/extensions/editor.scss";
import axiosConfig from "../../../../axiosConfig";
import { history } from "../../../../history";
import swal from "sweetalert";
var htmlParser = require("html-parser");

var html =
  "<!doctype html><html><body onload=\"alert('hello');\">Hello<br />world</body></html>";
htmlParser.parse(html, {
  openElement: function (name) {
    console.log("open: %s", name);
  },
  closeOpenedElement: function (name, token, unary) {
    console.log("token: %s, unary: %s", token, unary);
  },
  closeElement: function (name) {
    console.log("close: %s", name);
  },
  comment: function (value) {
    console.log("comment: %s", value);
  },
  cdata: function (value) {
    console.log("cdata: %s", value);
  },
  attribute: function (name, value) {
    console.log("attribute: %s=%s", name, value);
  },
  docType: function (value) {
    console.log("doctype: %s", value);
  },
  text: function (value) {
    console.log("text: %s", value);
  },
});
class AddTermsCondition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      desc: "",
      editorState: EditorState.createEmpty(),
    };
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      desc: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };

  submitHandler = (e) => {
    e.preventDefault();

    axiosConfig
      .post("/admin/add_term_cond", this.state)
      .then((response) => {
        console.log(response);
        this.props.history.push(
          "/app/pagesetup/termscondition/termConditionList"
        );
        // alert("Privacy Policy Added Successfully !");
        swal("Good job!", "You clicked the button!", "success");
      })
      .catch((error) => {
        console.log(error);
      });

    // this.state.editorState.getCurrentContent().getPlainText();
  };

  render() {
    return (
      <Card>
        <Row className="m-2">
          <Col>
            <h1 col-sm-6 className="float-left">
              Add Term And Condition
            </h1>
          </Col>
          <Col>
            <Button
              className=" btn btn-danger float-right"
              onClick={() =>
                history.push("/app/pagesetup/termscondition/termConditionList")
              }
            >
              Back
            </Button>
          </Col>
        </Row>
        <CardBody>
          <Form onSubmit={this.submitHandler}>
            <Col lg="12" md="12" sm="12" className="mb-2">
              <Label>Description</Label>
              <Editor
                toolbarClassName="demo-toolbar-absolute"
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                editorState={this.state.editorState}
                onEditorStateChange={this.onEditorStateChange}
                toolbar={{
                  options: ["inline", "blockType", "fontSize", "fontFamily"],
                  inline: {
                    options: [
                      "bold",
                      "italic",
                      "underline",
                      "strikethrough",
                      "monospace",
                    ],
                    bold: { className: "bordered-option-classname" },
                    italic: { className: "bordered-option-classname" },
                    underline: { className: "bordered-option-classname" },
                    strikethrough: {
                      className: "bordered-option-classname",
                    },
                    code: { className: "bordered-option-classname" },
                  },
                  blockType: {
                    className: "bordered-option-classname",
                  },
                  fontSize: {
                    className: "bordered-option-classname",
                  },
                  fontFamily: {
                    className: "bordered-option-classname",
                  },
                }}
              />
              <br />
            </Col>
            <Button color="primary"> Submit</Button>
          </Form>
        </CardBody>
      </Card>
    );
  }
}
export default AddTermsCondition;
