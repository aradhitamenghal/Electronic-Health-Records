

import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import '../loginStyle.css';

export class LoginForm extends Component {


  continue = e => {
    e.preventDefault();
    this.props.nextStep();

  };

  Doccontinue = e => {
    e.preventDefault();
    this.props.docnextStep();
  };

  state={
    name:''
  }
  changeText(event){
         this.setState(
             {name : event.target.value}
         );
     }

  render(){

    const { values, handleChange } = this.props;
    return (
      <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Doctor</h3>
                    <form >
                    <div className="form-group">
                    <TextField className="form-group" placeholder="Enter Name" label="Your Name" onChange={handleChange('name')}
                              defaultValue={values.name}
                              margin="normal"
                              fullWidth/>

                    </div>
                        <div className="form-group" >
                            <input type="submit" className="btnSubmit" value="Login" onClick={this.Doccontinue}  />
                        </div>

                    </form>
                </div>
                <div className="col-md-6 login-form-2">
                    <h3>Patient</h3>

                    <form>
                        <div className="form-group">
                        <TextField className="form-group" placeholder="Enter Your Name" label="Your Name" onChange={handleChange('name')}
                                  defaultValue={values.name}
                                  margin="normal"
                                  fullWidth/>
                        </div>
                        <div className="form-group">
                        <TextField className="form-group" placeholder="Enter Age" label="Your Age" onChange={handleChange('age')}
                                  defaultValue={values.age}
                                  margin="normal"
                                  fullWidth/>

                        </div>
                        <div className="form-group">
                            <input type="submit" className="btnSubmit" value="Login" onClick={this.continue}   />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    }
  }



export default LoginForm;
