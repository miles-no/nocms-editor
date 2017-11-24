import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { triggerGlobal } from 'nocms-events';

class Simple extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    triggerGlobal('nocms.value-changed', this.props.scope, event.target.value);
  }

  render() {
    const {
      placeholder,
      text,
    } = this.props;
    return <input placeholder={placeholder} value={text} onChange={this.onChange} />;
  }
}

Simple.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  scope: PropTypes.string,
};

Simple.defaultProps = {
  text: '',
  placeholder: 'Add text...',
};

export default Simple;
