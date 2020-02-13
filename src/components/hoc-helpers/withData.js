import React, { PureComponent } from 'react';
import Spinner from '../spinner/spinner';

const withData = (View, getData) => {
  return class extends PureComponent {

    state = {
      data: null
    };
  
    componentDidMount() {
      getData().then((data) => {
        this.setState({
          data
        });
      });
    };

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