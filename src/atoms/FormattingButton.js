import React from 'react';

class FormattingButton extends React.Component {
  constructor() {
    super();
    this.onToggle = (e) => {
      e.preventDefault();
      this.props.onToggle(this.props.style);
    };
  }

  render() {
    let className = 'button icon formatting-button';
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
  label: React.PropTypes.string,
  onToggle: React.PropTypes.func,
  active: React.PropTypes.bool,
  style: React.PropTypes.string,
};

module.exports = FormattingButton;
