import React, { PureComponent } from 'react';
import ErrorButton from './error-button';

const Record = ({item, field, label }) => (
  <li className="list-group-item">
    <span className="term">{label}</span>
    <span>{item[field]}</span>
  </li>
);

export { Record };


export default class ItemDetails extends PureComponent {

  state = {
    item: {},
    image: null,
  };

  onItemLoaded = (item, getImageUrl) => {
    this.setState({
      item,
      image: getImageUrl(item)
    });
  };

  updateItem = () => {
    const { itemId, getData, getImageUrl } = this.props;
    if(!itemId) {
      return;
    };
    getData(itemId)
        .then((item) => {
          return this.onItemLoaded(item, getImageUrl);
        });
  };

  componentDidMount() {
    this.updateItem();
  };

  componentDidUpdate(prevProps) {
    if(this.props.itemId !== prevProps.itemId) {
      this.updatePerson();
    }
  }

  render() {
    const { item, image } = this.state;

    const view = (
      <>
        <img className="item-image"
          src={image}
          alt="person" />
        <div className="card-body">
          <h4>{item.name}</h4>
          <ul className="list-group list-group-flush">
            {
              React.Children.map(this.props.children, (child, idx) => {
                return React.cloneElement(child, { item });
              })
            }
          </ul>
          <ErrorButton />
        </div>
      </>
    );

    return (
      <div className="item-details card">
        {view}
      </div>
    );
  };
};
