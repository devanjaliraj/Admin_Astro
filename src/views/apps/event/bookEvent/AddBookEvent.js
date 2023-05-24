import React, { useState, useEffect } from "react";
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
} from "reactstrap";
import axiosConfig from "../../../../axiosConfig";
import "react-toastify/dist/ReactToastify.css";
import { Route } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import Breadcrumbs from "../../../../components/@vuexy/breadCrumbs/BreadCrumb";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState, convertToRaw } from "draft-js";
import "../../../../assets/scss/plugins/extensions/editor.scss";
import draftToHtml from "draftjs-to-html";
import swal from "sweetalert";

const AddBookEvent = () => {
  const [product, setProduct] = useState([
    {
      // image: {},
      name: "",
      price: "",
      description: "",
    },
  ]);
  const [inputList, setInputlist] = useState([]);
  const [time_slots, setTime_slots] = useState([
    {
      start_Time: "",
      End_Time: "",
    },
  ]);
  const [pooja_price, setpooja_price] = useState("");
  const [city, setCity] = useState("");
  const [duration, setDuration] = useState("");
  const [benefits, setBenefits] = useState("");
  const [poojaimg, setpoojaimg] = useState({});
  const [mode_ofpuja, setmode_ofpuja] = useState("");
  const [fullfill_location, setFullfill_location] = useState("");
  const [pooja_type, setPooja_type] = useState("");
  const [desc, setDesc] = useState("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [pujaN, setPujaN] = useState([]);
  const handleInputListAdd = () => {
    setProduct([
      ...product,
      {
        name: "",
        price: "",
        description: "",
        // image: null,
      },
    ]);
  };
  const handleInputListRemove = (index) => {
    const listData = [...product];
    listData.splice(index, 1);
    setProduct(listData);
  };
  const handleProductChange = (index, e) => {
    const { name, value } = e.target;
    const view = [...product];
    console.log("View", view);
    view[index][name] = value;
    setProduct(view);
  };

  const addInputField = () => {
    setTime_slots([
      ...time_slots,
      {
        start_Time: "",
        End_Time: "",
      },
    ]);
  };
  const removeInputFields = (index) => {
    const rows = [...time_slots];
    rows.splice(index, 1);
    setTime_slots(rows);
  };
  const handleChange = (index, evnt) => {
    const { name, value } = evnt.target;
    const list = [...time_slots];
    list[index][name] = value;
    setTime_slots(list);
  };

  const uploadImageCallBack = (file) => {
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
  const changeHandler = (e) => {
    setTime_slots({ [e.target.name]: e.target.value });
    setProduct({ [e.target.name]: e.target.value });
  };
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setDesc(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  useEffect(() => {
    axiosConfig
      .get("/admin/admin_poojaList")
      .then((response) => {
        setPujaN(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    let start = time_slots.map((item) => item.start_Time);
    let end = time_slots.map((item) => item.End_Time);

    const time = start.concat(end);
    const data = new FormData();
    data.append("pooja_type", pooja_type);
    data.append("pooja_price", pooja_price);
    data.append("city", city);
    data.append("desc", desc);
    data.append("duration", duration);
    data.append("mode_ofpuja", mode_ofpuja);
    data.append("time_slots", time);
    // data.append("product", JSON.stringify(product));
    if (product) {
      for (let index = 0; index < product.length; index++) {
        data.append(`product[${[index]}][name]`, product[index].name);
        data.append(`product[${[index]}][price]`, product[index].price);
        data.append(
          `product[${[index]}][description]`,
          product[index].description
        );
      }
    }

    data.append("benefits", benefits);
    data.append("fullfill_location", fullfill_location);

    if (poojaimg != null) {
      console.log("images", poojaimg);
      data.append("poojaimg", poojaimg);
    }
    // if (product.image != null) {
    //   data.append("product.image", product[0].image);

    // }
    // for (let index = 0; index < product.length; index++) {
    // const element = array[index];
    // data.append(`product${[index]}.image`, product[index].image);
    // }

    // console.log("item", product);
    // data.append("product.image", product.product);
    // formData.append(`image${index}`, item);
    // if (moreProduct.image != null) {
    //  data.append("moreProduct.image", moreProduct.image);
    // }

    axiosConfig
      .post(`/admin/admin_Addevent`, data)
      .then((response) => {
        console.log("sdkkk", response);
        swal("Success!", "Submitted SuccessFull!", "success");
        this.props.history.push("app/event/bookEvent/bookEventList");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div>
      <Breadcrumbs
        breadCrumbTitle="Puja Type"
        breadCrumbParent=" home"
        breadCrumbActive="Add Puja Type"
      />
      <Card>
        <div className="container">
          <div className="row">
            <div className="col-sm-8"></div>
          </div>
          <div className="col-sm-4"></div>
        </div>
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
          <Form className="m-1" onSubmit={(e) => submitHandler(e)}>
            <Row>
              <Col lg="4" md="4" sm="4" className="mb-2">
                <Label> Name of Puja</Label>
                <CustomInput
                  required
                  type="select"
                  name="pooja_type"
                  value={pooja_type}
                  onChange={(e) => {
                    setPooja_type(e.target.value);
                    console.log("id", pooja_type);
                  }}
                >
                  <option>select Puja</option>
                  {pujaN?.map((allPuja) => (
                    <option value={allPuja?._id} key={allPuja?._id}>
                      {allPuja?.pooja_name}
                    </option>
                  ))}
                </CustomInput>
              </Col>
              <Col lg="4" md="4" sm="4" className="mb-2">
                <Label>Price Of Puja</Label>
                <Input
                  required
                  type="number"
                  name="pooja_price"
                  placeholder="Enter Price "
                  value={pooja_price}
                  onChange={(e) => {
                    setpooja_price(e.target.value);
                  }}
                ></Input>
              </Col>
              <Col lg="4" md="6" sm="12" className="mb-2">
                <Label>Duration Of Puja</Label>
                <Input
                  required
                  type="text"
                  name="duration"
                  placeholder="Puja Duration Time"
                  value={duration}
                  onChange={(e) => {
                    setDuration(e.target.value);
                  }}
                ></Input>
              </Col>
              {time_slots?.map((data, index) => {
                return (
                  <>
                    <Col key={index} lg="4" md="6" sm="12" className="mb-2">
                      <Label>Start Time Of Puja</Label>
                      <Input
                        type="time"
                        onChange={(evnt) => handleChange(index, evnt)}
                        value={data.start_Time}
                        name="start_Time"
                        className="form-control"
                        placeholder="start_Time"
                      ></Input>
                    </Col>

                    <Col key={index} lg="4" md="6" sm="12" className="mb-2">
                      <Label>End Time Of Puja</Label>
                      <Input
                        type="time"
                        onChange={(evnt) => handleChange(index, evnt)}
                        value={data.End_Time}
                        name="End_Time"
                        className="form-control"
                        placeholder="End_Time"
                      ></Input>
                    </Col>

                    {time_slots.length !== 1 ? (
                      <Col key={index} lg="2" md="6" sm="12" className="mb-2">
                        <button
                          className="btn btn-danger mt-1"
                          onClick={removeInputFields}
                        >
                          x
                        </button>
                      </Col>
                    ) : null}
                  </>
                );
              })}

              <div className="row">
                <div className="col-sm-12">
                  <Button
                    color="primary"
                    className="ml-1 mt-1"
                    onClick={addInputField}
                  >
                    Add New
                  </Button>
                </div>
              </div>

              <Col lg="4" md="6" sm="12" className="mb-2">
                <Label>Mode of Puja </Label>
                <CustomInput
                  type="select"
                  required
                  name="select"
                  onChange={(e) => setmode_ofpuja(e.target.value)}
                >
                  <option>select Puja</option>
                  <option>offline</option>
                  <option>online</option>
                </CustomInput>
              </Col>
              <Col lg="4" md="4" sm="4" className="mb-2">
                <Label>Image</Label>
                <CustomInput
                  type="file"
                  name="image"
                  // multiple
                  onChange={(e) => setpoojaimg(e.target.files[0])}
                />
              </Col>
              {mode_ofpuja === "online" ? (
                <>
                  <Col lg="4" md="6" sm="12" className="mb-2">
                    <Label>Fullfill Location of Puja</Label>
                    <Input
                      required
                      type="text"
                      name="fullfill_location"
                      placeholder="Enter  Location"
                      value={fullfill_location}
                      onChange={(e) => {
                        setFullfill_location(e.target.value);
                      }}
                    ></Input>
                  </Col>
                  <Col lg="4" md="6" sm="12" className="mb-2">
                    <Label>Puja City</Label>
                    <Input
                      required
                      type="text"
                      name="city"
                      placeholder="Enter City"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                      }}
                    ></Input>
                  </Col>
                  <Col lg="4" md="6" sm="6" className="mb-2">
                    <Label className="mb-1">Live Streaming</Label>
                    <div className="form-label-group">
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
                </>
              ) : null}

              <Col lg="12" md="12">
                <h2 className="">Add Product </h2>
              </Col>
              {product?.map((data, index) => {
                return (
                  <>
                    {/* <Col lg="4" className="mb-2">
                      <Label>Image</Label>
                      <CustomInput
                        type="file"
                        name="image"
                        onChange={(e) => setMoreProduct(e.target.files[0])}
                        onChange={(e) => handleProductImage(index, e)}
                      />
                    </Col> */}
                    <Col lg="4" className="mb-2">
                      <Label>Name</Label>
                      <Input
                        required
                        type="text"
                        name="name"
                        placeholder="Enter Name"
                        value={product.name}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </Col>
                    <Col lg="4" className="mb-2">
                      <Label>Price</Label>
                      <Input
                        required
                        type="number"
                        name="price"
                        placeholder="Enter Price"
                        value={product.price}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </Col>
                    <Col lg="6" className="mb-2">
                      <Label>Description</Label>
                      <Input
                        required
                        rows={1}
                        type="textarea"
                        name="description"
                        placeholder="Enter Description"
                        value={product.description}
                        onChange={(e) => handleProductChange(index, e)}
                      />
                    </Col>
                    {product.length - 1 === index ? (
                      <Col lg="3" md="6" sm="12" className="mb-2">
                        <Button
                          color="primary"
                          className="ml-1 mt-1"
                          onClick={handleInputListAdd}
                        >
                          Add more
                        </Button>
                      </Col>
                    ) : null}
                    {product.length !== 1 ? (
                      <Col key={index} lg="3" md="6" sm="12" className="mb-2">
                        <Button
                          className="btn btn-danger mt-1"
                          onClick={handleInputListRemove}
                        >
                          X
                        </Button>
                      </Col>
                    ) : null}
                  </>
                );
              })}

              <Col lg="12" md="12" sm="12" className="mb-2">
                <Label>Benefits</Label>
                <Input
                  required
                  type="textarea"
                  name="benefits"
                  placeholder="Enter benefits"
                  value={benefits}
                  onChange={(e) => setBenefits(e.target.value)}
                ></Input>
              </Col>

              <Col lg="12" md="12" sm="12" className="mb-2">
                <Label>About puja</Label>
                <br />
                <Editor
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  value={ReactHtmlParser(desc)}
                  onEditorStateChange={onEditorStateChange}
                  toolbar={{
                    inline: { inDropdown: true },
                    list: { inDropdown: true },
                    textAlign: { inDropdown: true },
                    link: { inDropdown: true },
                    history: { inDropdown: true },
                    image: {
                      uploadCallback: uploadImageCallBack,
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
};
export default AddBookEvent;
