import React, { PureComponent } from 'react';
import Spinner from '../spinner/spinner';

const withData = (View) => {
  return class extends PureComponent {

    state = {
      data: null
    };

    updateData = () => {
      this.props.getData().then((data) => {
        this.setState({
          data
        });
      });
    };
  
    componentDidMount() {
      this.updateData();
    };

    componentDidUpdate(prevProps) {
      if(this.props.getData !== prevProps.getData) {
        this.updateData();
      }
    }

    render() {

      const { data } = this.state;

      if(!data) {
        return <Spinner />;
      }

      return (
        <View {...this.props} data={data} />
      );
    }
  };
};

export default withData;