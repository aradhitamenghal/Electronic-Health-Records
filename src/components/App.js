
import React, { Component } from 'react';
import '../loginStyle.css';
import LoginForm from './LoginForm';
import SecondFile from './SecondFile';
import Middle from './Middle';

export class App extends Component {

  state={
    name:'',
    age:1,
    step:1,
    role:'',
    hash:''
  }

  nextStep = () => {
   const { step } = this.state;
   this.setState({
     step: step + 1
   });
 };

docnextStep = () => {
  const { step } = this.state;
  this.setState({
    step: step + 2
  });
};

 handleChange = input => e => {
  this.setState({ [input]: e.target.value });
};

  render() {

    const { step } = this.state;
    const { name } = this.state;
    const values = { name  };

    switch (step) {
      case 1:
        return (
          <LoginForm
            nextStep={this.nextStep}
            docnextStep={this.docnextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
      case 2:
        return (
          <SecondFile
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            docnextStep={this.docnextStep}
            handleChange={this.handleChange}
            values={values}
          />
        );
        case 3:
          return (
            <Middle
              nextStep={this.nextStep}
              prevStep={this.prevStep}
              handleChange={this.handleChange}
              values={values}
            />
          );



  }
}

}

export default App;
