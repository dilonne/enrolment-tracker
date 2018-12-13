import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import { Route, Link, Redirect} from 'react-router-dom';
import { withRouter } from "react-router";


import Card from "components/Card/Card.jsx";
import Button from "components/CustomButton/CustomButton.jsx";


import { thStudents,server_base_url} from "variables/Variables.jsx";


class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      show: false 
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleEnrol= this.handleEnrol.bind(this);
    this.handleGet = this.handleGet.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

  }


  handleClick() {
    this.props.history.push('/student')
  }


  handleEnrol(id) {
    fetch(server_base_url+'/api/v1/student/'+id, {
      method: 'GET'  
    })
    .then(res => res.json())
    .then( (result) => {

      var data=result['data']    
      this.props.history.push({
        pathname: '/enrolment',
        state: { student: data['name']}
      })

    },

    (error) => {
      console.log(error)
   
      }); 
  }

  handleGet(id) {

    fetch(server_base_url+'/api/v1/student/'+id, {
      method: 'GET'  
    })
    .then(res => res.json())
    .then( (result) => {

      var data=result['data']
   
      this.props.history.push({
        pathname: '/student',
        state: { name: data['name'] ,
                id: data['national_id']}
      })

    },

    (error) => {
      console.log(error)
      });  
      

   
  }

  handleDelete(id) {

    fetch(server_base_url+'/api/v1/student/'+id, {
        method: 'DELETE' 
    }).then( (result) => {
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

  hideModal = () => {
    this.setState({ show: false });

  };

 
  componentDidMount() {
    
      fetch(server_base_url+"/api/v1/students")
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
        
    fetch(server_base_url+"/api/v1/students")
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
                title="Students"
                category="List of students"
                action={
                  <Button  bsStyle="primary" pullRight fill onClick={this.handleClick}>New Student </Button>

                }
                ctTableFullWidth
                ctTableResponsive
                
                content={
                  <Table striped hover>
                    <thead>
                      <tr>
                        {thStudents.map((prop, key) => {
                          return <th key={key}>{prop}</th>;
                        })}
                      </tr>
                    </thead>
                    <tbody>

                        { items.map(item => (
                          <tr key={item.id}>
                            <td>{item.id} </td>
                            <td>{item.name}</td> 
                            <td>{item.national_id}</td> 

                            <td> <Button  bsStyle="success" pullRight onClick={() => { this.handleEnrol(item.national_id) }}>Enrol Course </Button></td>  
                            <td> <Button  bsStyle="info" pullRight  onClick={() => { this.handleGet(item.national_id) }}>Edit </Button></td>  
                            <td> <Button  bsStyle="danger" pullRight  onClick={() => { this.handleDelete(item.national_id) }}>Delete </Button></td>  
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
export default StudentList;

