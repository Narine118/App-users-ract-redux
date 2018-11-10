import React from 'react';
import {Table,Button,Glyphicon,Modal} from 'react-bootstrap';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import {deleteUser} from '../actions';
import {userReverse} from '../actions';

class User extends React.Component {
   constructor(props){
       super(props);
       this.state={
           id:null,
           show:false
       }

    }

    handleModal = (id) => {
           this.setState({
               show:true,
               id
           });
    }

    handleDeleteYes = () => {
       const { id } =this.state;
        this.props.deleteUser(id);
        this.setState({
            show:false,
        });

    }

    handleClose = () => {
        this.setState({
            show:false
        });
    }

    handleReverse = (users) => {
        console.log(users);
       this.props.userReverse(users);
    }


  render(){

    const { users,history }= this.props;
    const { show } = this.state;
 
    return (
        <div className='container-fluid'>
          <div className='row'>
                                {
                                    
                                    <Modal show={show} onHide={this.handleClose}>
                                        <Modal.Body>
                                            <p> Are you sure? </p>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <Button onClick={this.handleDeleteYes}>Yes</Button>
                                            <Button onClick={this.handleClose}>Close</Button>
                                        </Modal.Footer>
        </Modal>
                                }

                <div className='col-md-10'>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th/>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th> Date <Button onClick={()=> this.handleReverse(users)}>Reverse</Button></th>
                                <th/>
                                <th/>
                            </tr>
                            </thead>
                            <tbody>
                               
                                    {
                                    users && users.length === 0 &&
                                            <tr>
                                                <td colSpan={7}>No results</td>
                                            </tr>
                                    }
                                    {
                                   users && users.length >= 1 && 
                                     users.map((user,i)=>{
                                     return(
                                        <tr key={i}>
                                            <td>{i+1}</td>
                                            <td>{user.firstName}</td>
                                            <td>{user.lastName}</td>
                                            <td>{user.email}</td>
                                            <td>{user.date}</td>
                                            <td> 
                                                <Button onClick={()=>this.handleModal(user.id)}>
                                                <Glyphicon glyph="remove" />
                                                </Button>
                                            </td>
                                            <td> 
                                        
                                              <Button onClick={()=>history.push(`edit-user/${user.id}`)} >
                                                <Glyphicon glyph="pencil" />
                                               </Button>
                                      
                                            </td>
                                        </tr>
                                    )
                                    
                                        })
                                    }
                        </tbody>
                    </Table>
                </div>
                    <div className="col-lg-12">
                        <Link to='/add-user'>
                            <Button>Add user</Button>
                        </Link>
                    </div>
            </div>
       </div>
    );
 
}
} 

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => {
    return{
      deleteUser: id => {
        dispatch(deleteUser(id));
      
},
    userReverse: (users) => {
        dispatch(userReverse(users));
  
}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User));