'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(props) {
  var _Entity$get$getData = _draftJs.Entity.get(props.entityKey).getData();

  var url = _Entity$get$getData.url;

  return _react2.default.createElement(
    'a',
    { href: url, className: 'editor-link', title: url },
    props.children
  );
};

Link.propTypes = {
  entityKey: _react2.default.PropTypes.string,
  children: _react2.default.PropTypes.node
};

module.exports = Link;
//# sourceMappingURL=Link.js.map