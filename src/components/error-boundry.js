import React, { PureComponent } from 'react';
import ErrorIncator from './error-indicator/error-indicator';

export default class ErrorBoundry extends PureComponent {

    state = {
      hasError: false
    }
  
    componentDidCatch() {
      this.setState({
        hasError: true
      });
    };
  
    render() {
      if(this.state.hasError) {
        return <ErrorIncator />;
      }
  
      return this.props.children;
    };
  };