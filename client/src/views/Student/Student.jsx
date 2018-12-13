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



class Student extends Component {


  constructor(props) {
    super(props);
    this.state = {
      student_name:'',
      national_id:'',
      edit:false
    };
    
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
}

handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    var name = data.get('name')
    var id = data.get('id')
    var json_data = JSON.stringify({name:name,id:id})


    fetch(server_base_url+'/api/v1/student/'+id, {
      method: 'POST',
      headers: new Headers({'Content-Type': 'application/json'}),

      body: json_data,
      
      }).then( (result) => {
        this.props.history.push('/students');

    });


}

handleChange(event) {
  this.setState({student_name: event.target.student_name,
     national_id:  event.target.national_id});    
}

handleUpdate(event) {
  event.preventDefault();
  const data = new FormData(event.target);
   

  var name = data.get('name')
  var id = data.get('id')
  var json_data = JSON.stringify({name:name,id:id})


  fetch(server_base_url+'/api/v1/student/'+id, {
    method: 'PUT',
    headers: new Headers({'Content-Type': 'application/json'}),

    body: json_data,
    
    }).then( (result) => {
        //flash result then redirect
        this.props.history.push('/students');
      
  });


  
  }


  componentDidMount(prevProps) {
    
    try
      {
        this.setState({edit: true,student_name: this.props.location.state.name,
          national_id:this.props.location.state.id})
      }
      catch(e)
      {
        console.log('Usual render')


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
                  title="Update Student"
                  content={
                    
                    <form onSubmit={this.handleUpdate}>
  
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          { id:"name",
                            name:"name",
                            label: "Name",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "Name",
                            value:this.state.student_name,
                            onChange:this.handleChange,
                            required:true

  
                          }
                        ]}
                      />
                      <FormInputs
                        ncols={["col-md-12"]}
                        proprieties={[
                          {
                            id:"id",
                            name:"id",
                            label: "National ID",
                            type: "text",
                            bsClass: "form-control",
                            placeholder: "National ID",
                            value:this.state.national_id,
                            onChange:this.handleChange,
                            readOnly:true,

                           
                          }
                        ]}
                      />
                                  
                      <Button bsStyle="primary" pullRight fill type="submit">
                        Update Student
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
                title="Add Student"
                content={
                  
                  <form onSubmit={this.handleSubmit}>

                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        { id:"name",
                          name:"name",
                          label: "Name",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Name",
                          value:this.state.student_name,
                          onChange:this.handleChange,
                          required:true


                        }
                      ]}
                    />
                    <FormInputs
                      ncols={["col-md-12"]}
                      proprieties={[
                        {
                          id:"id",
                          name:"id",
                          label: "National ID",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "National ID",
                          value:this.state.national_id,
                          onChange:this.handleChange,
                          required:true

                         
                        }
                      ]}
                    />
                                
                    <Button bsStyle="primary"  fill type="submit">
                      New Student
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

export default Student;
