import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";


import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import {server_base_url} from "variables/Variables.jsx";

import { withRouter } from "react-router";
import PropTypes from "prop-types";



class Course extends Component {

  constructor(props) {
    super(props);
    this.state = {
      course_name:'',
      course_code:'',
      course_description:'',
      edit:false
    };
    
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
}


handleChange(event) {
  this.setState({course_name: event.target.course_name,
     course_description:  event.target.course_description, 
     course_code:event.target.course_code});    
}



handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);
  
  var name = data.get('name')
  var description = data.get('description')
  var code = data.get('code')

  var json_data = JSON.stringify({name:name,
                                  description:description,
                                  code:code})

  fetch(server_base_url+'/api/v1/course/'+code, {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: json_data,
    
  }).then( (result) => {
      //flash result then redirect
      this.props.history.push('/courses');

  });
}


handleUpdate(event) {
  event.preventDefault();
  const data = new FormData(event.target);
   

  var name = data.get('name')
  var description = data.get('description')
  var code = data.get('code')

  var json_data = JSON.stringify({name:name,description:description,code:code})


  fetch(server_base_url+'/api/v1/course/'+code, {
    method: 'PUT',
    headers: new Headers({'Content-Type': 'application/json'}),

    body: json_data,
    
    }).then( (result) => {
        //flash result then redirect
        this.props.history.push('/courses');
      
  });


  
  }


componentDidMount(prevProps) {
    
  console.log('==================== Did mount==================')

try
  {
    console.log('==================== Set state ==================',this.props.location.state.name)
    this.setState({edit: true ,course_name: this.props.location.state.name,
      course_description:this.props.location.state.description,
      course_code:this.props.location.state.code}
      )
  }
  catch(e)
  {
    console.log('==================== Usual render ==================')


  }

  
}

  render() {

    const edit = this.state.edit

    if(edit){
      return (
      
        <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Update Course"
                content={
                  <form onSubmit={this.handleUpdate}>

                     <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          id:"code",
                          name:"code",
                          label: "Code",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Code",
                          value:this.state.course_code,
                          onChange:this.handleChange,
                          readOnly:true,
                         
                        }
                      ]}
                    />

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        { id:"name",
                          name:"name",
                          label: "Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Name",
                          value:this.state.course_name,
                          onChange:this.handleChange,
                          required:true

                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          id:"description",
                          name:"description",
                          label: "Description",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Description",
                          value:this.state.course_description,
                          onChange:this.handleChange,
                          required:true

                         
                        }
                      ]}
                    />

                    
                                      
                    <Button bsStyle="primary" pullRight fill type="submit">
                      Update Course
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            
          </Row>
        </Grid>>
      </div>
       
      );

    }


    return (
      
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Add Course"
                content={
                  <form onSubmit={this.handleSubmit}>

                  <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          id:"code",
                          name:"code",
                          label: "Code",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Code",
                          value:this.state.course_code,
                          onChange:this.handleChange,
                          required:true

                      
                        }
                      ]}
                    />

                  

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        { id:"name",
                          name:"name",
                          label: "Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Name",
                          value:this.state.course_name,
                          onChange:this.handleChange,
                          required:true

                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          id:"description",
                          name:"description",
                          label: "Description",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Description",
                          value:this.state.course_description,
                          onChange:this.handleChange,
                          required:true

                         
                        }
                      ]}
                    />
                                      
                    <Button bsStyle="primary"  fill type="submit">
                      New Course
                    </Button>
                    <div className="clearfix" />
                  </form>
                }
              />
            </Col>
            
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Course;
