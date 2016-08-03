'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _draftJs = require('draft-js');

var _linkStrategy = require('./helpers/linkStrategy.js');

var _linkStrategy2 = _interopRequireDefault(_linkStrategy);

var _draftJsExportHtml = require('draft-js-export-html');

var _draftJsImportHtml = require('draft-js-import-html');

var _Link = require('./atoms/Link');

var _Link2 = _interopRequireDefault(_Link);

var _FormattingControls = require('./atoms/FormattingControls');

var _FormattingControls2 = _interopRequireDefault(_FormattingControls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LinkEditor = function (_React$Component) {
  _inherits(LinkEditor, _React$Component);

  function LinkEditor(props) {
    _classCallCheck(this, LinkEditor);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(LinkEditor).call(this, props));

    _this.getSelectedClientRect = function () {
      var selection = window.getSelection();
      var oRange = selection.getRangeAt(0);
      return oRange.getBoundingClientRect();
    };

    _this.getSelectedBlockElement = function () {
      var selection = window.getSelection();
      if (selection.rangeCount === 0) return null;
      var node = selection.getRangeAt(0).startContainer;
      do {
        if (node.getAttribute && node.getAttribute('data-block') == 'true') {
          return node;
        }
        node = node.parentNode;
      } while (node != null);
      return null;
    };

    var decorator = new _draftJs.CompositeDecorator([{
      strategy: _linkStrategy2.default,
      component: _Link2.default
    }]);
    var convertedText = (0, _draftJsImportHtml.stateFromHTML)(props.text);
    _this.state = {
      editorState: _draftJs.EditorState.createWithContent(convertedText, decorator),
      showURLInput: false,
      urlValue: '',
      styleObj: {},
      disableAdd: true
    };

    _this.focus = function () {
      return _this.refs.editor.focus();
    };
    _this.onChange = _this.onChange.bind(_this);
    _this.promptForLink = _this.promptForLink.bind(_this);
    _this.onURLChange = function (e) {
      return _this.setState({ urlValue: e.target.value });
    };
    _this.confirmLink = _this.confirmLink.bind(_this);
    _this.onLinkInputKeyDown = _this.onLinkInputKeyDown.bind(_this);
    _this.handleKeyCommand = _this.handleKeyCommand.bind(_this);
    _this.toggleInlineStyle = _this.toggleInlineStyle.bind(_this);
    return _this;
  }

  _createClass(LinkEditor, [{
    key: 'onLinkInputKeyDown',
    value: function onLinkInputKeyDown(e) {
      if (e.which === 13) {
        this.confirmLink(e);
      }
    }
  }, {
    key: 'onChange',
    value: function onChange(editorState) {
      var selection = editorState.getSelection();

      if (selection.isCollapsed()) {
        this.setState({ editorState: editorState, disableAdd: true });
      } else {
        this.setState({ editorState: editorState, disableAdd: false });
      }
    }
  }, {
    key: 'getSelectionRect',
    value: function getSelectionRect(selected) {
      if (!selected || !selected.rangeCount || selected.isCollapsed) return null;

      var _rect = selected.getRangeAt(0).getBoundingClientRect();
      var rect = _rect && _rect.top ? _rect : selected.getRangeAt(0).getClientRects()[0];
      if (!rect) {
        if (selected.anchorNode && selected.anchorNode.getBoundingClientRect) {
          rect = selected.anchorNode.getBoundingClientRect();
          rect.isEmptyline = true;
        } else {
          return null;
        }
      }
      return rect;
    }
  }, {
    key: 'handleKeyCommand',
    value: function handleKeyCommand(command) {
      var newState = _draftJs.RichUtils.handleKeyCommand(this.state.editorState, command);
      if (newState) {
        this.onChange(newState);
        return true;
      }
      return false;
    }
  }, {
    key: 'toggleInlineStyle',
    value: function toggleInlineStyle(inlineStyle) {
      this.onChange(_draftJs.RichUtils.toggleInlineStyle(this.state.editorState, inlineStyle));
    }
  }, {
    key: 'promptForLink',
    value: function promptForLink(e) {
      var _this2 = this;

      e.preventDefault();
      var editorState = this.state.editorState;

      var selection = editorState.getSelection();
      if (selection.isCollapsed()) {
        return;
      }
      var block = editorState.getCurrentContent().getBlockForKey(editorState.getSelection().getStartKey());
      if (this.active(block, editorState)) {
        this.setState({
          editorState: _draftJs.RichUtils.toggleLink(editorState, selection, null)
        });
      } else {
        var positionObj = this.getSelectedClientRect();
        var leftSpace = this.refs.textEditor.getBoundingClientRect().left;
        var calculatedLeft = positionObj.left + positionObj.width / 2 - 200 - leftSpace;

        this.setState({
          styleObj: { left: calculatedLeft },
          showURLInput: true,
          urlValue: ''
        }, function () {
          setTimeout(function () {
            return _this2.refs.url.focus();
          }, 0);
        });
      }
    }
  }, {
    key: 'confirmLink',
    value: function confirmLink(e) {
      var _this3 = this;

      e.preventDefault();
      var _state = this.state;
      var editorState = _state.editorState;
      var urlValue = _state.urlValue;

      var entityKey = _draftJs.Entity.create('LINK', 'MUTABLE', { url: urlValue });
      this.setState({
        editorState: _draftJs.RichUtils.toggleLink(editorState, editorState.getSelection(), entityKey),
        showURLInput: false,
        urlValue: ''
      }, function () {
        setTimeout(function () {
          return _this3.refs.editor.focus();
        }, 0);
      });
    }
  }, {
    key: 'active',
    value: function active(block, editorState) {
      var active = void 0;
      var selection = editorState.getSelection();
      block.findEntityRanges(function (character) {
        var entityKey = character.getEntity();
        return entityKey !== null && _draftJs.Entity.get(entityKey).getType() === 'LINK';
      }, function (start, end) {
        if (block.getKey() === selection.anchorKey && selection.anchorKey === selection.focusKey) {
          if (selection.anchorOffset >= start && selection.focusOffset <= end) {
            active = true;
          }
        }
      });
      return active;
    }
  }, {
    key: 'render',
    value: function render() {
      var urlInput = void 0;
      if (this.state.showURLInput) {
        urlInput = _react2.default.createElement(
          'div',
          { className: 'text-editor__link-url', style: this.state.styleObj },
          _react2.default.createElement(
            'div',
            null,
            _react2.default.createElement(
              'label',
              { htmlFor: 'url' },
              'URL'
            ),
            _react2.default.createElement('input', {
              id: 'url',
              onChange: this.onURLChange,
              ref: 'url',
              type: 'text',
              value: this.state.urlValue,
              onKeyDown: this.onLinkInputKeyDown
            }),
            _react2.default.createElement(
              'button',
              { onMouseDown: this.confirmLink, className: 'button secondary' },
              'OK'
            )
          )
        );
      }
      var html = (0, _draftJsExportHtml.stateToHTML)(this.state.editorState.getCurrentContent());
      return _react2.default.createElement(
        'div',
        { className: 'text-editor', ref: 'textEditor' },
        _react2.default.createElement(
          'div',
          { className: 'text-editor__controls' },
          _react2.default.createElement(_FormattingControls2.default, { editorState: this.state.editorState, onToggle: this.toggleInlineStyle }),
          _react2.default.createElement(
            'button',
            { onMouseDown: this.promptForLink, className: 'button icon', disabled: this.state.disableAdd },
            _react2.default.createElement(
              'i',
              { className: 'material-icons' },
              'insert_link'
            )
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'text-editor__body' },
          urlInput,
          _react2.default.createElement(_draftJs.Editor, {
            editorState: this.state.editorState,
            onChange: this.onChange,
            placeholder: this.props.placeholder,
            ref: 'editor'
          })
        ),
        _react2.default.createElement(
          'div',
          null,
          html
        )
      );
    }
  }]);

  return LinkEditor;
}(_react2.default.Component);

LinkEditor.propTypes = {
  text: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string
};

LinkEditor.defaultProps = {
  text: '',
  placeholder: 'Add text...'
};

exports.default = LinkEditor;
module.exports = exports['default'];
//# sourceMappingURL=LinkEditor.js.map