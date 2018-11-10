import React from 'react';
import {FormGroup,ControlLabel,FormControl,HelpBlock,Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

import {addUser} from '../actions';

class AddUser extends React.Component {
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
       disabled:true
    

  }
}
handleAddUser=()=>{
    const {addUser, users} = this.props;
    const {user} = this.state;
    user.id = users.length + 1;
    var today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    today = mm + '/' + dd + '/' + yyyy +' '+ hours + ':' + minutes;
    user.date= today;
    addUser(user);
}
handleChange=(ev)=>{
ev.preventDefault();
const {user: {password},validation} = this.state;
const inputValue=ev.currentTarget.value;
const inputName=ev.currentTarget.name;
const newState = {...this.state};

if(inputName === 'firstName'){
    newState.user.firstName=inputValue;
    newState.validation.firstName.value = inputValue === "" ? "error" : "success";
    newState.validation.firstName.error = inputValue === "" ? "First name must be not empty" : ""; 
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
newState.disabled = !Object.keys(validation).every(item => validation[item].value === "success");
this.setState(newState)
}

  render(){
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
                        value={this.state.value}
                        onChange={this.handleChange}
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
                        value={this.state.value} 
                        onChange={this.handleChange}
                    />
                     <FormControl.Feedback />
                    <HelpBlock>{validation.confirmPassword.error}</HelpBlock>
                    </FormGroup>
                    <Link to='/'> <Button
                                bsStyle="info"
                                disabled={disabled}
                                onClick={this.handleAddUser}
                            >Add user</Button> </Link>
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
        addUser: user => {
          dispatch(addUser(user))
        }
    }
    
}

export default   connect(mapStateToProps,mapDispatchToProps)(AddUser);