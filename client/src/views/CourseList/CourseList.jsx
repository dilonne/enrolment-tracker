import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Route, Link, Redirect} from 'react-router-dom';

import { withRouter } from "react-router";

import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";


import { thCourses,server_base_url} from "variables/Variables.jsx";

class CourseList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      show:false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }


  handleClick() {
    this.props.history.push('/course')
  }


  handleEdit(code) {
    fetch(server_base_url+'/api/v1/course/'+code, {
        method: 'GET'  
    })
    .then(res => res.json())
    .then( (result) => {

      var data=result['data']
      this.props.history.push({
        pathname: '/course',
        state: { name: data['name'] ,
                code: data['code'],
                description: data['description']
              }
      })
      },

    (error) => {
      console.log('++++++++++++++++++++++ Error  +++++++++++++++++',error)
   
      });    
  }

  handleDelete(name) {
    fetch(server_base_url+'/api/v1/course/'+name, {
        method: 'DELETE' 
    }).
    then( (result) => {
      this.setState({
        show: true
        
      });

    },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });

        }
    
    );
  }

  handleGet(code) {

    fetch(server_base_url+'/api/v1/course/'+code, {
      method: 'GET'  
    })
    .then(res => res.json())
    .then( (result) => {

      var data=result['data']
      console.log('++++++++++++++++++++++ Course Data  +++++++++++++++++',data)
    
      this.props.history.push({
        pathname: '/course',
        state: { name: data['name'] ,
                description: data['description'],
                code: data['code']
              }
      })

    },

    (error) => {
      console.log('++++++++++++++++++++++ Error  +++++++++++++++++',error)
   
      });  
      

   
  }


  componentDidMount() {
    
      fetch(server_base_url+"/api/v1/courses")
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



  
  componentDidUpdate(prevProps,prevState) {
   
    const {show} = this.state;
    if(show !== prevState.show){
        console.log('==================== Refresh! ==================');
        
    fetch(server_base_url+"/api/v1/courses")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          items:result['data'],
          show:false
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
                title="Courses"
                category="List of courses"
                action={
                  <Button  bsStyle="primary" pullRight fill onClick={this.handleClick}>New Course </Button>

                }
                ctTableFullWidth
                ctTableResponsive
                
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thCourses.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>

                        { items.map(item => (
                          <tr key={item.id}>
                            <td>{item.id} </td>
                            <td>{item.code}</td> 
                            <td>{item.name}</td> 
                            <td>{item.description}</td> 

                            <td> <Button  bsStyle="info" pullRight onClick={() => { this.handleEdit(item.code) }}>Edit </Button></td>  
                            <td> <Button  bsStyle="danger" pullRight onClick={() => { this.handleDelete(item.code) }}>Delete </Button></td>  
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
export default CourseList;

