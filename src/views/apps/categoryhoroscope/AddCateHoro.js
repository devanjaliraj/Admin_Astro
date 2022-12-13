import React, { Component } from "react";
import {
  Card,
  CardBody,
  Col,
  Form,
  Row,
  Input,
  Label,
  Button,
  FormGroup,
  CustomInput,
} from "reactstrap";
import axiosConfig from "../../../axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { data } from "jquery";
import swal from "sweetalert";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import "../../../assets/scss/plugins/extensions/editor.scss";
import draftToHtml from "draftjs-to-html";

export class AddCateHoro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rashiId: "",
      category: "",
      desc: "",
    };
    this.state = {
      RashiT: [],
      CategoryC: [],
      CategoryT: [],
    };
  }

  state = {
    editorState: EditorState.createEmpty(),
  };

  uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", "https://api.imgur.com/3/image");
      xhr.setRequestHeader("Authorization", "Client-ID 7e1c3e366d22aa3");
      const data = new FormData();
      data.append("image", file);
      xhr.send(data);
      xhr.addEventListener("load", () => {
        const response = JSON.parse(xhr.responseText);
        resolve(response);
      });
      xhr.addEventListener("error", () => {
        const error = JSON.parse(xhr.responseText);
        reject(error);
      });
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      desc: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };
  componentDidMount() {
    //Category//
    axiosConfig
      .get("admin/Rashilist")
      .then((response) => {
        console.log(response);
        this.setState({
          RashiT: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    //Rashi//
    axiosConfig
      .get("admin/getallCategory")
      .then((response) => {
        console.log(response);
        this.setState({
          CategoryC: response.data.data,
          CategoryT: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandler = (e) => {
    e.preventDefault();

    axiosConfig
      .post("/admin/adCat_horscope", this.state)

      .then((response) => {
        console.log(response.data);

        swal("Success!", "Submitted SuccessFull!", "success");
        this.props.history.push("/app/categoryhoroscope/catehoroscopelist");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle="Add Horoscope"
          breadCrumbParent=" Horoscope Mangement"
          breadCrumbActive="Add Horoscope"
        />
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Add Horoscope
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/categoryhoroscope/catehoroscopelist")
                    }
                  >
                    Back
                  </Button>
                )}
              />
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row>
                {/* <Col lg="6" md="6" sm="12" className="mb-2">
                  <Label>Title</Label>
                  <Input
                    required
                    type="text"
                    name="title"
                    placeholder="Enter Title"
                    value={this.state.title}
                    onChange={this.changeHandler}
                  ></Input>
                </Col> */}
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Title</Label>
                  <CustomInput
                    type="select"
                    name="category1"
                    value={this.state.category1}
                    onChange={this.changeHandler}
                  >
                    <option>Select Title</option>
                    {this.state.CategoryT?.map((allCategory1) => (
                      <option value={allCategory1?._id} key={allCategory1?._id}>
                        {allCategory1?.title}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Rashi</Label>
                  <CustomInput
                    type="select"
                    name="rashiId"
                    value={this.state.rashiId}
                    onChange={this.changeHandler}
                  >
                    <option>Select Rashi</option>
                    {this.state.RashiT?.map((allRashi) => (
                      <option value={allRashi?._id} key={allRashi?._id}>
                        {allRashi?.rashi_title}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
                {/* <Col lg="6" md="6" sm="12" className="mb-2">
                  <Label>Rashi</Label>
                  <Input
                    required
                    type="text"
                    name="category"
                    placeholder="Enter MRP"
                    value={this.state.category}
                    onChange={this.changeHandler}
                  ></Input>
                </Col> */}
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Category</Label>
                  <CustomInput
                    type="select"
                    name="category"
                    value={this.state.category}
                    onChange={this.changeHandler}
                  >
                    <option>Select Title</option>
                    {this.state.CategoryC?.map((allCategory) => (
                      <option value={allCategory?._id} key={allCategory?._id}>
                        {allCategory?.category}
                      </option>
                    ))}
                  </CustomInput>
                </Col>

                <Col lg="12" md="12" sm="12" className="mb-2">
                  <Label> Description</Label>

                  <br />

                  <Editor
                    wrapperClassName="demo-wrapper"
                    editorClassName="demo-editor"
                    onEditorStateChange={this.onEditorStateChange}
                    toolbar={{
                      inline: { inDropdown: true },
                      list: { inDropdown: true },
                      textAlign: { inDropdown: true },
                      link: { inDropdown: true },
                      history: { inDropdown: true },
                      image: {
                        uploadCallback: this.uploadImageCallBack,
                        previewImage: true,
                        alt: { present: true, mandatory: true },
                      },
                    }}
                  />
                </Col>
              </Row>
              {/* <Col lg="6" md="6" sm="6" className="mb-2">
                <Label className="mb-1">Status</Label>
                <div
                  className="form-label-group"
                  onChange={(e) => this.changeHandler1(e)}
                >
                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Active"
                  />
                  <span style={{ marginRight: "20px" }}>Active</span>

                  <input
                    style={{ marginRight: "3px" }}
                    type="radio"
                    name="status"
                    value="Inactive"
                  />
                  <span style={{ marginRight: "3px" }}>Inactive</span>
                </div>
              </Col> */}
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    Save
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    );
  }
}
export default AddCateHoro;
