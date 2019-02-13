import React from 'react';
import BpkText from 'bpk-component-text';

class Loading extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.isLoading === true ? <BpkText tagName="p">Loading flights...</BpkText> : null
    );
  }
}

export default Loading;

