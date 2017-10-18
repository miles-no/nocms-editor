import React from 'react';
import PropTypes from 'prop-types';

class FormattingButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'button button_icon formatting-button';
    if (this.props.active) {
      className += ' formatting-button_active';
    }

    return (
      <button className={className} onMouseDown={this.onToggle}>
        {this.props.label}
      </button>
    );
  }
}

FormattingButton.propTypes = {
  label: PropTypes.string,
  onToggle: PropTypes.func,
  active: PropTypes.bool,
  style: PropTypes.string,
};

module.exports = FormattingButton;
