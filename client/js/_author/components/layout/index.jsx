import React from 'react';

export default class Index extends React.Component {

  static propTypes = {
    children: React.PropTypes.node,
  };

  static defaultProps = {
    children: '',
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }

}
