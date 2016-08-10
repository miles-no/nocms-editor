import React from 'react';
import ReactDOM from 'react-dom';
import { Editor, EditorState, Entity, CompositeDecorator, RichUtils } from 'draft-js';
import linkStrategy from './helpers/linkStrategy.js';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import Link from './atoms/Link';
import FormattingControls from './atoms/FormattingControls';
import events from 'nocms-events';

class LinkEditor extends React.Component {
  constructor(props) {
    super(props);

    this.decorator = new CompositeDecorator([
      {
        strategy: linkStrategy,
        component: Link,
      },
    ]);
    const convertedText = stateFromHTML(props.text);
    this.state = {
      editorState: EditorState.createWithContent(convertedText, this.decorator),
      showURLInput: false,
      showToolbar: false,
      urlValue: '',
      styleObj: {},
      disableAdd: true,
    };

    this.focus = () => this.refs.editor.focus();
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.promptForLink = this.promptForLink.bind(this);
    this.onURLChange = (e) => this.setState({ urlValue: e.target.value });
    this.confirmLink = this.confirmLink.bind(this);
    this.onLinkInputKeyDown = this.onLinkInputKeyDown.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
  }

  componentWillReceiveProps(props) {
    if (this.state.showURLInput) {
      return;
    }

    const convertedText = stateFromHTML(props.text);
    this.setState({ editorState: EditorState.createWithContent(convertedText, this.decorator) });
  }

  onLinkInputKeyDown(e) {
    if (e.which === 13) {
      this.confirmLink(e);
    }
  }

  onChange(editorState) {
    const selection = editorState.getSelection();

    if (selection.isCollapsed()) {
      this.setState({ editorState, disableAdd: true });
    } else {
      this.setState({ editorState, disableAdd: false });
    }
  }

  onBlur() {
    if (this.state.showURLInput) {
      return;
    }

    const html = stateToHTML(this.state.editorState.getCurrentContent());

    events.trigger('nocms.value-changed', this.props.scope, html);

    this.setState({ showToolbar: false });
  }

  onFocus() {
    this.setState({ showToolbar: true });
  }

  getSelectedClientRect = () => {
    const selection = window.getSelection();
    const oRange = selection.getRangeAt(0);
    return oRange.getBoundingClientRect();
  };

  getSelectedBlockElement = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    let node = selection.getRangeAt(0).startContainer;
    do {
      if (node.getAttribute && node.getAttribute('data-block') == 'true') {
        return node;
      }
      node = node.parentNode;
    } while (node != null)
    return null;
  };

  getSelectionRect(selected) {
    if (!selected || !selected.rangeCount || selected.isCollapsed) return null;

    const _rect = selected.getRangeAt(0).getBoundingClientRect();
    let rect = _rect && _rect.top ? _rect : selected.getRangeAt(0).getClientRects()[0];
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

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  promptForLink(e) {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (selection.isCollapsed()) {
      return;
    }
    const block = editorState
        .getCurrentContent()
        .getBlockForKey(editorState.getSelection().getStartKey());
    if (this.active(block, editorState)) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    } else {
      const positionObj = this.getSelectedClientRect();
      const leftSpace = this.refs.textEditor.getBoundingClientRect().left;
      const calculatedLeft = positionObj.left + positionObj.width / 2 - 200 - leftSpace;

      this.setState({
        styleObj: { left: calculatedLeft },
        showURLInput: true,
        urlValue: '',
      }, () => {
        setTimeout(() => this.refs.url.focus(), 0);
      });
    }
  }

  confirmLink(e) {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const entityKey = Entity.create('LINK', 'MUTABLE', { url: urlValue });
    this.setState({
      editorState: RichUtils.toggleLink(
        editorState,
        editorState.getSelection(),
        entityKey
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => this.refs.editor.focus(), 0);
    });
  }

  active(block, editorState) {
    let active;
    const selection = editorState.getSelection();
    block.findEntityRanges(
      (character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && Entity.get(entityKey).getType() === 'LINK';
      },

      (start, end) => {
        if (block.getKey() === selection.anchorKey && selection.anchorKey === selection.focusKey) {
          if (selection.anchorOffset >= start && selection.focusOffset <= end) {
            active = true;
          }
        }
      }
    );
    return active;
  }

  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        (<div className="text-editor__link-url" style={this.state.styleObj}>
          <div>
            <label htmlFor="url" >URL</label>
            <input
              id="url"
              onChange={this.onURLChange}
              ref="url"
              type="text"
              value={this.state.urlValue}
              onKeyDown={this.onLinkInputKeyDown}
            />
            <button onMouseDown={this.confirmLink} className="button button_secondary">
              OK
            </button>
          </div>
        </div>);
    }

    return (
      <div className="text-editor" ref="textEditor">
        <div className="text-editor__controls" style={{ visibility: this.state.showToolbar ? 'visible' : 'hidden' }}>
          <FormattingControls editorState={this.state.editorState} onToggle={this.toggleInlineStyle} />
          <button onMouseDown={this.promptForLink} className="button button_icon" disabled={this.state.disableAdd}>
            <i className="material-icons">insert_link</i>
          </button>
        </div>
        <div className="text-editor__body">
          {urlInput}
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            placeholder={this.props.placeholder}
            ref="editor"
          />
        </div>
      </div>
    );
  }
}

LinkEditor.propTypes = {
  text: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  scope: React.PropTypes.string,
};

LinkEditor.defaultProps = {
  text: '',
  placeholder: 'Add text...',
};

export default LinkEditor;
