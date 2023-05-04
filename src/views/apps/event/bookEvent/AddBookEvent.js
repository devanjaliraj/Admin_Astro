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
  CustomInput,
  Table,
} from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import { Route } from "react-router-dom";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import "../../../../assets/scss/plugins/extensions/editor.scss";
import draftToHtml from "draftjs-to-html";
import swal from "sweetalert";
export class AddBookEvent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pooja_price: "",
      city: "",
      liveStreaming: "",
      duration: "",
      benefits: "",
      poojaimg: "",
      location: "",
      fullfill_location: "",
      time_slots: "",
      desc: "",
      pooja_type: "",
      editorState: EditorState.createEmpty(),
      selectedFile: undefined,
      selectedName: "",
      productImg: "",
      productPrice: "",
      productName: "",
      details: "",
    };
    this.state = {
      pujaN: [],
    };
    this.state = {
      inputlist: [{ firstName: "", lastName: "" }],
      timelist: [{ startTime: "", endTime: "" }],
    };
  }

  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files[0] });
    this.setState({ selectedName: event.target.files[0].name });
    console.log(event.target.files[0]);
  };
  onChangeHandler = (event) => {
    this.setState({ selectedFile: event.target.files });
    this.setState({ selectedName: event.target.files.name });
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
  handleTimeremove = (index) => {
    const AlltimeList = [...this.state.timelist];
    AlltimeList.splice(index, 1);
    this.setState({ timelist: AlltimeList });
  };
  handleTimeClick = () => {
    this.setState({
      timelist: [...this.state.timelist, { startTime: "", endTime: "" }],
    });
  };
  handleremove = (index) => {
    const list = [...this.state.inputlist];
    list.splice(index, 1);
    this.setState({ inputlist: list });
  };

  handleClick = () => {
    this.setState({
      inputlist: [...this.state.inputlist, { firstName: "", lastName: "" }],
    });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
      desc: draftToHtml(convertToRaw(editorState.getCurrentContent())),
    });
  };

  changeHandler1 = (e) => {
    this.setState({ status: e.target.value });
  };

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  async componentDidMount() {
    axiosConfig
      .get("/admin/admin_poojaList")
      .then((response) => {
        // console.log(response);
        this.setState({
          pujaN: response.data.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("pooja_type", this.state.pooja_type);
    data.append("pooja_price", this.state.pooja_price);
    data.append("city", this.state.city);
    // data.append("liveStreaming", this.state.liveStreaming);
    data.append("desc", this.state.desc);
    data.append("duration", this.state.duration);
    data.append("location", this.state.location);
    data.append("time_slots", this.state.time_slots);
    data.append("benefits", this.state.benefits);
    data.append("fullfill_location", this.state.fullfill_location);
    for (const file of this.state.selectedFile) {
      if (this.state.selectedFile !== null) {
        data.append("poojaimg", file, file.name);
      }
    }
    for (var value of data.values()) {
      console.log(value);
    }
    for (var key of data.keys()) {
      console.log(key);
    }

    axiosConfig
      .post(`/admin/admin_Addevent`, data)
      .then((response) => {
        console.log("DFSS@@@@@@@FD", response.data);
        swal("Success!", "Submitted SuccessFull!", "success");
        this.props.history.push("/app/event/bookEvent/bookEventList");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    console.log("first", this.state.inputlist);
    return (
      <div>
        <Breadcrumbs
          breadCrumbTitle="Puja Type"
          breadCrumbParent=" home"
          breadCrumbActive="Add Puja Type"
        />
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Add Puja
              </h1>
            </Col>
            <Col>
              <Route
                render={({ history }) => (
                  <Button
                    className=" btn btn-danger float-right"
                    onClick={() =>
                      history.push("/app/event/bookEvent/bookEventList")
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
                <Col lg="4" md="4" sm="4" className="mb-2">
                  <Label> Name of Pooja</Label>
                  <CustomInput
                    required
                    type="select"
                    name="pooja_type"
                    placeholder="Enter Title"
                    value={this.state.pooja_type}
                    onChange={this.changeHandler}
                  >
                    <option>select Event</option>
                    {this.state.pujaN?.map((allPuja) => (
                      <option value={allPuja?._id} key={allPuja?._id}>
                        {allPuja?.pooja_name}
                      </option>
                    ))}
                  </CustomInput>
                </Col>
                <Col lg="4" md="4" sm="4" className="mb-2">
                  <Label>Pooja Price</Label>
                  <Input
                    required
                    type="text"
                    name="pooja_price"
                    placeholder="Enter Price "
                    value={this.state.pooja_price}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="4" md="6" sm="12" className="mb-2">
                  <Label>Duration</Label>
                  <Input
                    required
                    type="text"
                    name="duration"
                    placeholder="Enter Duration"
                    value={this.state.duration}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                {this.state.timelist?.map((ele, i) => {
                  return (
                    <>
                      <Col lg="4" md="6" sm="12" className="mb-2">
                        <Label>Start Time</Label>
                        <Input
                          required
                          type="time"
                          name="time_slots"
                          placeholder="Enter Start Time"
                          value={this.state.time_slots}
                          onChange={this.changeHandler}
                        ></Input>
                      </Col>
                      <Col lg="4" md="6" sm="12" className="mb-2">
                        <Label>End Time</Label>
                        <Input
                          required
                          type="time"
                          name="time_slots"
                          placeholder="Enter End Time"
                          value={this.state.time_slots}
                          onChange={this.changeHandler}
                        ></Input>
                      </Col>
                      <Col lg="2" md="3" sm="12" className="">
                        {this.state.timelist.length - 1 === i && (
                          <Button
                            className="mt-1"
                            color="primary"
                            onClick={this.handleTimeClick}
                          >
                            Add More
                          </Button>
                        )}
                      </Col>
                      <Col lg="2" md="3" sm="12" className="">
                        {this.state.timelist.length - 1 !== i ? (
                          <Button
                            color="primary"
                            className="ml-2"
                            style={{ height: "40px" }}
                            onClick={() => this.handleTimeremove(i)}
                          >
                            Remove
                          </Button>
                        ) : null}
                      </Col>
                    </>
                  );
                })}
                <Col lg="4" md="6" sm="12" className="mb-2">
                  <Label>Location</Label>
                  <Input
                    required
                    type="text"
                    name="location"
                    placeholder="Enter Location"
                    value={this.state.location}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>{" "}
                <Col lg="4" md="6" sm="12" className="mb-2">
                  <Label>Fullfill Location</Label>
                  <Input
                    required
                    type="text"
                    name="fullfill_location"
                    placeholder="Enter Current Location"
                    value={this.state.fullfill_location}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="4" md="6" sm="12" className="mb-2">
                  <Label>Puja City</Label>
                  <Input
                    required
                    type="text"
                    name="city"
                    placeholder="Enter City"
                    value={this.state.city}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="4" md="4" sm="4" className="mb-2">
                  <Label>Image</Label>
                  <CustomInput
                    type="file"
                    // multiple
                    onChange={this.onChangeHandler}
                  />
                </Col>
                <Col lg="4" md="6" sm="6" className="mb-2">
                  <Label className="mb-1">Live Streaming</Label>
                  <div
                    className="form-label-group"
                    onChange={(e) => this.changeHandler1(e)}
                  >
                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="liveStreaming"
                      value="true"
                    />
                    <span style={{ marginRight: "20px" }}>Available</span>

                    <input
                      style={{ marginRight: "3px" }}
                      type="radio"
                      name="liveStreaming"
                      value="false"
                    />
                    <span style={{ marginRight: "3px" }}>Unvailable</span>
                  </div>
                </Col>
                <Col lg="12" md="12" sm="12" className="mb-2">
                  <Label>Benefits</Label>
                  <Input
                    required
                    type="textarea"
                    name="benefits"
                    placeholder="Enter benefits"
                    value={this.state.benefits}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="12" md="12">
                  {this.state.inputlist?.map((e, i) => {
                    return (
                      <Row key={i}>
                        <Col lg="4" className="mb-2">
                          <CustomInput
                            type="file"
                            onChange={this.onChangeHandler}
                          />
                        </Col>
                        <Col lg="4" className="mb-2">
                          <Input
                            required
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={this.state.city}
                            onChange={this.changeHandler}
                          ></Input>
                        </Col>
                        <Col lg="4" className="mb-2">
                          <Input
                            required
                            type="text"
                            name="city"
                            placeholder="Enter Price"
                            value={this.state.city}
                            onChange={this.changeHandler}
                          ></Input>
                        </Col>
                        <Col lg="6" className="mb-2">
                          <Input
                            required
                            rows={1}
                            type="textarea"
                            name="benefits"
                            placeholder="Enter benefits"
                            value={this.state.benefits}
                            onChange={this.changeHandler}
                          ></Input>
                        </Col>
                        <Col lg="3">
                          {this.state.inputlist.length - 1 === i && (
                            <Button color="primary" onClick={this.handleClick}>
                              Add More
                            </Button>
                          )}
                        </Col>
                        <Col lg="3">
                          {this.state.inputlist.length - 1 !== i ? (
                            <Button
                              color="primary"
                              className="ml-2"
                              style={{ height: "40px" }}
                              onClick={() => this.handleremove(i)}
                            >
                              Remove
                            </Button>
                          ) : null}
                        </Col>
                      </Row>
                    );
                  })}
                </Col>
                <Col lg="12" md="12" sm="12" className="mb-2">
                  <Label>About puja</Label>
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
export default AddBookEvent;
