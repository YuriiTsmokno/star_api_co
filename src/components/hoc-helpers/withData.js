import React, { PureComponent } from 'react';
import Spinner from '../spinner/spinner';
import ErrorIndicator from '../error-indicator/error-indicator';

const withData = (View) => {
  return class extends PureComponent {

    state = {
      data: null,
      loading: true,
      error: false
    };

    componentDidMount() {
      this.updateData();
    };

    componentDidUpdate(prevProps) {
      if(this.props.getData !== prevProps.getData) {
        this.updateData();
      }
    };

    updateData = () => {
      this.props.getData()
        .then((data) => {
          this.setState({
            data,
            loading: false
          });
        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false
          });
        });
    };
  
    render() {
      const { data, loading, error } = this.state;

      const errMsg = error ? <ErrorIndicator /> : null;
      const spinner = loading ? <Spinner /> : null;
      const hasData = !(loading || error);
      const view = hasData ? <View {...this.props} data={data} /> : null;

      return(
        <>
          {errMsg}
          {spinner}
          {view}
        </>
      );
    }
  };
};

export default withData;