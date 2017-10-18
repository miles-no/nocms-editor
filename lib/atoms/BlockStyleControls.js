'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _FormattingButton = require('./FormattingButton');

var _FormattingButton2 = _interopRequireDefault(_FormattingButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BLOCK_TYPES = [{ label: 'UL', style: 'unordered-list-item' }, { label: 'OL', style: 'ordered-list-item' }];

var BlockStyleControls = function BlockStyleControls(props) {
  var editorState = props.editorState;

  var selection = editorState.getSelection();
  var blockType = editorState.getCurrentContent().getBlockForKey(selection.getStartKey()).getType();
  return _react2.default.createElement(
    'span',
    { className: 'text-editor__formatting' },
    BLOCK_TYPES.map(function (type) {
      return _react2.default.createElement(_FormattingButton2.default, {
        key: type.label,
        active: type.style === blockType,
        label: type.label,
        onToggle: props.onToggle,
        style: type.style
      });
    })
  );
};

BlockStyleControls.propTypes = {
  editorState: _propTypes2.default.object,
  onToggle: _propTypes2.default.func
};

module.exports = BlockStyleControls;
//# sourceMappingURL=BlockStyleControls.js.map