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

  componentDidMount() {
    let { id } = this.props.match.params;
    axiosConfig
      .get(`/admin/getone_term_cond/${id}`)
      .then((response) => {
        console.log(response.data.data.desc);
        this.setState({
          desc: response.data.data.desc,
        });
      })
      .catch((error) => {
        console.log(error.response);
      });
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandler = (e) => {
    e.preventDefault();
    let { id } = this.props.match.params;
    axiosConfig
      .post(`/admin/edit_term_cond/${id}`, this.state)
      .then((response) => {
        console.log(response);
        // swal("Success!", "Submitted SuccessFull!", "success");
        this.props.history.push(
          `/app/pagesetup/termscondition/termConditionList`
        );
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  render() {
    return (
      <Card>
        <Row className="m-2">
          <Col>
            <h1 col-sm-6 className="float-left">
              Edit Term And Condition
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
