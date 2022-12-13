import React, { Component } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Col,
  Form,
  Label,
  Input,
  CustomInput,
  Button,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap'
import axiosConfig from '../../../axiosConfig'
import { history } from '../../../history'
import swal from 'sweetalert'
export default class EditPlan extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      amount: '',
      status: '',
    }
  }

  componentDidMount() {
    let { id } = this.props.match.params
    axiosConfig
      .get(`/admin/getoneplan/${id}`)
      .then((response) => {
        console.log(response)
        this.setState({
          title: response.data.data.title,
          amount: response.data.data.amount,
          status: response.data.data.status,
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
  changeHandler1 = (e) => {
    this.setState({ status: e.target.value })
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  submitHandler = (e) => {
    e.preventDefault()
    let { id } = this.props.match.params
    axiosConfig
      .post(`/admin/editplan/${id}`, this.state)
      .then((response) => {
        console.log(response)
        swal('Success!', 'Submitted SuccessFull!', 'success')
        this.props.history.push('/app/packagemanager/allPlan')
      })
      .catch((error) => {
        console.log(error)
      })
  }
  render() {
    return (
      <div>
        <Row>
          <Col sm="12">
            <div>
              <Breadcrumb listTag="div">
                <BreadcrumbItem href="/analyticsDashboard" tag="a">
                  Home
                </BreadcrumbItem>
                <BreadcrumbItem href="/app/packagemanager/allPlan" tag="a">
                  Plan List
                </BreadcrumbItem>
                <BreadcrumbItem active>Edit Plan</BreadcrumbItem>
              </Breadcrumb>
            </div>
          </Col>
        </Row>
        <Card>
          <Row className="m-2">
            <Col>
              <h1 col-sm-6 className="float-left">
                Edit Plan
              </h1>
            </Col>
            <Col>
              <Button
                className=" btn btn-danger float-right"
                onClick={() => history.push('/app/packagemanager/allPlan')}
              >
                Back
              </Button>
            </Col>
          </Row>
          <CardBody>
            <Form className="m-1" onSubmit={this.submitHandler}>
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>title</Label>
                  <Input
                    type="text"
                    name="title"
                    placeholder=""
                    value={this.state.title}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label>Amount</Label>
                  <Input
                    type="amount"
                    name="amount"
                    placeholder="Enter Amount"
                    value={this.state.amount}
                    onChange={this.changeHandler}
                  ></Input>
                </Col>

                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Label className="mb-1">Status</Label>
                  <div
                    className="form-label-group"
                    onChange={(e) => this.changeHandler1(e)}
                  >
                    <input
                      style={{ marginRight: '3px' }}
                      type="radio"
                      name="status"
                      value="Active"
                    />
                    <span style={{ marginRight: '20px' }}>Active</span>

                    <input
                      style={{ marginRight: '3px' }}
                      type="radio"
                      name="status"
                      value="Deactive"
                    />
                    <span style={{ marginRight: '3px' }}>Deactive</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg="6" md="6" sm="6" className="mb-2">
                  <Button.Ripple
                    color="primary"
                    type="submit"
                    className="mr-1 mb-1"
                  >
                    Add
                  </Button.Ripple>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </div>
    )
  }
}
