import React, { Component } from "react";
import {
  Grid,
  Row,
  Col
} from "react-bootstrap";

import { DropdownButton, MenuItem } from "react-bootstrap";



import { Card } from "components/Card/Card.jsx";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

import Button from "components/CustomButton/CustomButton.jsx";
import {server_base_url} from "variables/Variables.jsx";

import { withRouter } from "react-router";
import PropTypes from "prop-types";



class Enrolment extends Component {


  constructor(props) {
    super(props);
    this.state = {
      student:'',
      selectedOption: 'Select Course', // default selected value
      courses:[],
      year:'',
    };
 
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);

}







handleChange(event) {
  this.setState({student: event.target.student,
     course: event.target.course, year:event.target.year});    
}


handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.target);


  var student = data.get('student')
  var course = this.state.selectedOption
  var year = data.get('year')
  var json_data = JSON.stringify({student:student, course:course, year:year})


  fetch(server_base_url+'/api/v1/enrolment', {
    method: 'POST',
    headers: new Headers({'Content-Type': 'application/json'}),
    body: json_data,
    
  }).then( (result) => {

      this.props.history.push('/students');

  });
}



componentDidMount(prevProps) {


  fetch(server_base_url+"/api/v1/courses")
  .then(res => res.json())
  .then(
    (result) => {
      var names =[]
      var data=result['data']

      { data.map(item => (
          names.push(item.name)
          ))

        }

      this.setState({
        courses: names
      });
    },

    (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    }
  )



  
try
  {
    this.setState({student: this.props.location.state.student})
  }
  catch(e)
  {
    console.log('Usual render')


  }

  
}


handleSelect(eventKey, event) {
  this.setState({ selectedOption: this.state.courses[eventKey] });

}


  render() {
    return (
      
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={8}>
              <Card
                title="Enrolment Detail"
                content={
                  <form onSubmit={this.handleSubmit}>

                    <FormInputs
                      ncols={["col-md-6"]}
                      proprieties={[
                        { id:"student",
                          name:"student",
                          label: "Student",
                          type: "text",
                          bsClass: "form-control",
                          value:this.state.student,
                          readOnly:true,

                        }
                      ]}
                    />
                        <DropdownButton 
                        
                          bsStyle="btn-primary"
                          title={this.state.selectedOption}
                          id="dropdown-size-medium"
                          required="required"

                          onSelect={this.handleSelect
                          } >

                        
                          {this.state.courses.map((opt, i) => (
                                <MenuItem key={i} eventKey={i}>
                                    {opt}
                                </MenuItem>
                            ))}

                        </DropdownButton>

                        <br></br>
                        <br></br>


                     <FormInputs
                      ncols={["col-md-6"]}
                      proprieties={[
                        {
                          id:"year",
                          name:"year",
                          label: "Year",
                          type: "text",
                          bsClass: "form-control",
                          placeholder: "Year",
                          required:true

                         
                        }
                      ]}
                    />
                                      
                    <Button bsStyle="primary" pullRight fill type="submit">
                      Enrol
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
}

export default Enrolment;
