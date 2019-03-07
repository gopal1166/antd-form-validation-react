import React from 'react';
import {
  Form, Input, DatePicker, TimePicker, Select, Cascader,
  InputNumber, Card, Button, Radio, message
} from 'antd';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

const { TextArea } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

/**
 * React Component for posting a new activity
 */
class FormLayoutDemo extends React.Component {
  constructor() {
    super();
    this.state = {
      formLayout: 'horizontal',
      fields: {},
      errors: {},
      messages: {},
      teamOptions: null
    };
  }

  /**
   * @desc update the state fields object with the input, remove errors messages
   * @param {object} event - event object gives input tag name, value info
   * @return {None}
   */
  handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    let fields = this.state.fields
    let messages = this.state.messages
    let errors = this.state.errors

    messages[name] = 'success'
    fields[name] = value
    errors[name] = null

    this.setState({
      fields: fields,
      messages: messages,
      errors: errors
    })
    // console.log("fiedls: ", fields);
  }

  /**
   * @desc store the selected severity in the state fields object
   * @param {string} value - selected choice value
   * @return {None}
   */
  handleSelect = (value) => {
    const name = "severity"
    let fields = this.state.fields
    
    let messages = this.state.messages
    let errors = this.state.errors

    messages[name] = 'success'
    errors[name] = null

    fields[name] = value
    this.setState({
      fields: fields,
      messages: messages,
      errors: errors
    })
  }

  /**
   * @summery performs form fields validation
   * @desc After Submit button clicked this function will be called
   *       fields object from the state used to validate the input
   *       If any field input is missing we'll add error message to the 
   *       errors object and error message to the messages object else null
   *       We'll set the state with new messages, error messages
   * 
   * @param {None}
   * @return {boolean} true/false - should return true/false
   */
  handleValidation = () => {
    let isFormValid = true
    const { fields, messages } = this.state
    let errors = {}

    if (!fields['title']) {
      messages['title'] = 'error'
      errors['title'] = "Activity title is mandatory"
      isFormValid = false
    } else {
      messages['title'] = 'success'
      errors['title'] = ''
    }

    if (!fields['severity']) {
      messages['severity'] = 'error'
      errors['severity'] = 'Severity is mandatory'
      isFormValid = false
    } else {
      messages['severity'] = 'success'
      errors['severity'] = ''
    }

    this.setState({
      messages: messages,
      errors: errors,
    })
    return isFormValid
  }

  /**
   * @summary validates and submit the form data to backend
   * @desc handleValidation method will check for the form field errors 
   *       if there is no error data will be submitted to backend
   *       otherwise error messages will be displayed
   * @param {None} 
   * @return {None}
   */
  submitHandler = (e) => {
    e.preventDefault() 
    console.log("state fields", this.state.fields);
    if (this.handleValidation()) {
      alert('Good to go')
    } else {
      console.log("some errors");
    }
  }

  render() {
    const { formLayout } = this.state;
    const formItemLayout = formLayout === 'horizontal' ? {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    } : null;
    const buttonItemLayout = formLayout === 'horizontal' ? {
      wrapperCol: { span: 14, offset: 4 },
    } : null;

    let teamsJSX = null
    if (this.state.teamOptions) {
      const {teamOptions} = this.state
      teamsJSX = teamOptions.map(obj => {
        return (
          <Option name={obj.key} value={obj.value}>{obj.text}</Option>
        )
      })
    }
    return (
      <Card style={{ width: "40%" }}>
         <AppBar position="static" style={{width: "100%", top: "0px", position: "absolute", background: "rgb(60, 167, 255)", marginBottom: "50px"}}>
          <Toolbar></Toolbar>
        </AppBar>
        <Form layout={formLayout} style={{marginTop: "80px"}}>
          
          <Form.Item
            label="Title:"
            {...formItemLayout}
            required
            validateStatus={this.state.messages['title']}
            help={this.state.errors['title']}
          >
            <Input name="title" placeholder="Activity Title"
              onChange={this.handleChange} />
          </Form.Item>

          <Form.Item
            label="Severity:"
            {...formItemLayout}
            required
            validateStatus={this.state.messages['severity']}
            help={this.state.errors['severity']}
          >
            <Select
              placeholder="Select severity"
              onChange={this.handleSelect}
              name="severity"
            >
              <Option name="severity" value="Low">Low</Option>
              <Option name="severity" value="Medium">Medium</Option>
              <Option name="severity" value="High">High</Option>
            </Select>
          </Form.Item>

          <Form.Item {...buttonItemLayout}>
            <Button type="danger">Cancel</Button> &nbsp; &nbsp;
            <Button type="primary" onClick={this.submitHandler}>Submit</Button>
          </Form.Item>
        </Form>
      </Card>
    );
  }
}

export default FormLayoutDemo;
