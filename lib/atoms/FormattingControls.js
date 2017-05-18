'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _FormattingButton = require('./FormattingButton');

var _FormattingButton2 = _interopRequireDefault(_FormattingButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var INLINE_STYLES = [{ label: 'B', style: 'BOLD' }, { label: 'I', style: 'ITALIC' }, { label: 'U', style: 'UNDERLINE' }];

var FormattingControls = function FormattingControls(props) {
  var currentStyle = props.editorState.getCurrentInlineStyle();
  return _react2.default.createElement(
    'span',
    { className: 'text-editor__formatting' },
    INLINE_STYLES.map(function (type) {
      return _react2.default.createElement(_FormattingButton2.default, {
        key: type.label,
        active: currentStyle.has(type.style),
        label: type.label,
        onToggle: props.onToggle,
        style: type.style
      });
    })
  );
};

FormattingControls.propTypes = {
  editorState: _propTypes2.default.object,
  onToggle: _propTypes2.default.func
};

module.exports = FormattingControls;
//# sourceMappingURL=FormattingControls.js.map