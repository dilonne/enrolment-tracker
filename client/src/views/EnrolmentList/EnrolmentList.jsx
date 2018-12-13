import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Route, Link, Redirect} from 'react-router-dom';

import { withRouter } from "react-router";
import NotificationSystem from "react-notification-system";


import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";

import { style } from "variables/Variables.jsx";

import { thEnrolments,server_base_url} from "variables/Variables.jsx";

class EnrolmentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      show:false,
    };

  this.handleGenerateCsv = this.handleGenerateCsv.bind(this);

  }
  
  handleGenerateCsv() {

    fetch(server_base_url+'/enrolments_csv', {
        method: 'POST'  
    })
    .then(res => res.json())
    .then( (result) => {
          alert(result['message'])
      }); 
  }


  componentDidMount() {


  
    fetch(server_base_url+"/api/v1/enrolments")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result['data']
        });
      },
 
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )



}




  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      
    return (
      
      <div className="content">

        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Enrolments"
                category="List of Enrolments"
                action={
                  <Button  bsStyle="primary" pullRight fill onClick={this.handleGenerateCsv}>Generate Csv </Button>

                }
                ctTableFullWidth
                ctTableResponsive
                
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thEnrolments.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>

                        { items.map(item => (
                          <tr key={item.id}>
                            <td>{item.id}</td> 
                            <td>{item.student_name}</td> 
                            <td>{item.course_name} </td>
                            <td>{item.year}</td> 
                          </tr>
                          
                        ))}
                      
                    </tbody>
                  </Table>
                }
              />
            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}
}
export default EnrolmentList;

