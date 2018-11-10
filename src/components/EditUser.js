import React from 'react';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {editUser} from '../actions';

class EditUser extends React.Component {
   constructor(props){
   super(props);
   this.state={
       user:{
            firstName:"",
            lastName:"",
            email:"",
            password:"",
            confirmPassword:""
       },
       validation:{
            firstName:{
                value:null,
                error:null
         },
            lastName:{
                value:null,
                error:null
        },
            email:{
                value:null,
                error:null
        },
            password:{
                value:null,
                error:null
        },
           confirmPassword:{
                value:null,
                error:null
        }

       },
       disabled:false
    

  }
}
handleEditUser=(editUser)=>{
    const {editUsers} = this.props;
    const {user} = this.state;
    const id= this.props.match.params.id;
    user.id = id;
    var today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    today = mm + '/' + dd + '/' + yyyy +' '+ hours + ':' + minutes;
    user.date= today;
    if(user.firstName == ''){
        user.firstName = editUser.firstName;
    } 
    if(user.lastName == ''){
        user.lastName = editUser.lastName;
    } 
    if(user.email == ''){
        user.email = editUser.email;
    }    
    if(user.password == ''){
        user.password = editUser.password;
    } 
    if(user.confirmPassword == ''){
        user.confirmPassword = editUser.confirmPassword;
    }   
    editUsers(user);
}
handleChange=(ev)=>{
ev.preventDefault();
const {user: {password},validation} = this.state;
var inputValue=ev.currentTarget.value;
const inputName=ev.currentTarget.name;
const newState = {...this.state};

if(inputName === 'firstName'){
    newState.user.firstName=inputValue;
    newState.validation.firstName.value= inputValue === "" ? "error" : "success" ;
    newState.validation.firstName.error= inputValue === "" ? "first name must be not empty" : "" ;
}
if(inputName === 'lastName'){
    newState.user.lastName=inputValue;
    newState.validation.lastName.value= inputValue === "" ? "error" : "success" ;
    newState.validation.lastName.error= inputValue === "" ? "Last name must be not empty" : "" ;
}
if(inputName === 'email'){
    newState.user.email=inputValue;
    const isValid=inputValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
    newState.validation.email.value= isValid ? "success" : "error" ;
    newState.validation.email.error= inputValue === '' ? "Please enter your email" : isValid ? "" : "Your email is not correct";
}
if(inputName === 'password'){
    newState.user.password=inputValue;
    const isValid=inputValue.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
    newState.validation.password.value= isValid ? "success" : "error" ;
    newState.validation.password.error= inputValue === '' ? "Please enter your password" : isValid ? "" : "Please enter minimum eight characters, at least one letter and one number";
}
if(inputName === 'confirmPassword'){
    newState.user.confirmPassword=inputValue;
    newState.validation.confirmPassword.value = inputValue === password ? "success" : "error";
    newState.validation.confirmPassword.error=  inputValue === password ? "" : "Password confirmation does not match";
}
newState.disabled = !Object.keys(validation).some(item => validation[item].value === "success");
this.setState(newState)
}

  render(){
      const {users} = this.props;
      const id= this.props.match.params.id;
      const editUsers = users.filter(user=>user.id == id);
      const  editUser=editUsers[0];    
      const {validation,disabled} = this.state;

  return(
    <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <form>
                    <FormGroup
                    controlId="firstName"
                    validationState={validation.firstName.value}
                    >
                    <ControlLabel  htmlFor="firstName">First Name</ControlLabel>
                    <FormControl
                       defaultValue={editUser.firstName}
                       value={this.state.value}
                        onChange={this.handleChange}
                        validationState={validation.firstName.value}
                        name='firstName'
                    />
                     <FormControl.Feedback />
                    <HelpBlock>{validation.firstName.error}</HelpBlock>
                    </FormGroup>
                    <FormGroup
                    controlId="lastName"
                    validationState={validation.lastName.value}
                    >
                    <ControlLabel  htmlFor="lastName">Last Name</ControlLabel>
                    <FormControl
                       defaultValue={editUser.lastName}
                       value={this.state.value}
                        onChange={this.handleChange}
                        validationState={validation.email.value}
                        name='lastName'
                    />
                     <FormControl.Feedback />
                    <HelpBlock>{validation.lastName.error}</HelpBlock>
                    </FormGroup>
                    <FormGroup
                    controlId="email"
                    validationState={validation.email.value}
                    >
                    <ControlLabel  htmlFor="email">Email</ControlLabel>
                    <FormControl
                        type='email'
                        name='email'
                        defaultValue={editUser.email}
                        value={this.state.value}
                        onChange={this.handleChange}
                     
                    />
                     <FormControl.Feedback />
                    <HelpBlock>{validation.email.error}</HelpBlock>
                    </FormGroup>
                    <FormGroup
                    controlId="password"
                    validationState={validation.password.value}
                    >
                    <ControlLabel  htmlFor="password">Password</ControlLabel>
                    <FormControl
                        type='password'
                        name='password'
                        defaultValue={editUser.password}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                     <FormControl.Feedback />
                    <HelpBlock>{validation.password.error}</HelpBlock>
                    </FormGroup>
                    <FormGroup
                    controlId="confirmPassword"
                    validationState={validation.confirmPassword.value}
                    >
                    <ControlLabel  htmlFor="confirmPassword">Confirm password</ControlLabel>
                    <FormControl
                        type='password'
                        name='confirmPassword'
                        defaultValue={editUser.confirmPassword}
                        value={this.state.value}
                        onChange={this.handleChange}
                    />
                     <FormControl.Feedback />
                    <HelpBlock>{validation.confirmPassword.error}</HelpBlock>
                    </FormGroup>
                    <Link to='/'> <Button
                                bsStyle="info"
                                disabled={disabled}
                                onClick={()=>this.handleEditUser(editUser)}>
                            Edit </Button> </Link>
                    <Link to='/'><Button>Cancel</Button></Link>
                </form>
            </div>       
        </div>  
    </div>
  )
  }

}
const mapStateToProps = state => {
    return state ;
  }
  const mapDispatchToProps = dispatch => {
    return {
        editUsers: user => {
          dispatch(editUser(user))
        }
    }
}

export default   connect(mapStateToProps,mapDispatchToProps)(EditUser);