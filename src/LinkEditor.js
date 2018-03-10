/* eslint no-underscore-dangle: off */
import React from 'react';
import PropTypes from 'prop-types';
import { Editor, EditorState, CompositeDecorator, RichUtils } from 'draft-js';
import { triggerGlobal } from 'nocms-events';
import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';
import linkStrategy from './helpers/linkStrategy';
import Link from './atoms/Link';
import FormattingControls from './atoms/FormattingControls';
import BlockStyleControls from './atoms/BlockStyleControls';

const active = (block, editorState) => {
  let isActive;
  const selection = editorState.getSelection();
  block.findEntityRanges(
    (character) => {
      const entityKey = character.getEntity();
      const contentState = editorState.getCurrentContent();
      return entityKey !== null && contentState.getEntity(entityKey).getType() === 'LINK';
    },

    (start, end) => {
      if (block.getKey() === selection.anchorKey && selection.anchorKey === selection.focusKey) {
        if (selection.anchorOffset >= start && selection.focusOffset <= end) {
          isActive = true;
        }
      }
    },
  );
  return isActive;
};

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
    /* eslint react/no-string-refs: off */
    // @TODO: rewrite
    this.focus = () => { return this.refs.editor.focus(); };
    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.promptForLink = this.promptForLink.bind(this);
    this.onURLChange = (e) => { return this.setState({ urlValue: e.target.value }); };
    this.confirmLink = this.confirmLink.bind(this);
    this.onLinkInputKeyDown = this.onLinkInputKeyDown.bind(this);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
    this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
    this.abortLink = this.abortLink.bind(this);
    this.onTab = this.onTab.bind(this);
    this.toggleBlockType = this.toggleBlockType.bind(this);
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
    } else if (e.which === 27) {
      this.abortLink(e);
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
    triggerGlobal('nocms.value-changed', this.props.scope, html);
    this.setState({ showToolbar: false });
  }

  onFocus() {
    this.setState({ showToolbar: true });
  }

  onTab(e) {
    const maxDepth = 4;
    this.onChange(RichUtils.onTab(e, this.state.editorState, maxDepth));
  }

  getSelectedBlockElement = () => {
    const selection = window.getSelection();
    if (selection.rangeCount === 0) return null;
    let node = selection.getRangeAt(0).startContainer;
    do {
      /* eslint eqeqeq: off */
      if (node.getAttribute && node.getAttribute('data-block') == 'true') {
        return node;
      }
      node = node.parentNode;
    } while (node != null);
    return null;
  };

  getSelectedClientRect = () => {
    const selection = window.getSelection();
    const oRange = selection.getRangeAt(0);
    return oRange.getBoundingClientRect();
  };

  handleKeyCommand(command) {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  toggleBlockType(blockType) {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType,
      ),
    );
  }

  toggleInlineStyle(inlineStyle) {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle,
      ),
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
    if (active(block, editorState)) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null),
      });
    } else {
      this.setState({
        showURLInput: true,
        urlValue: '',
      }, () => {
        setTimeout(() => { return this.refs.url.focus(); }, 0);
      });
    }
  }

  confirmLink(e) {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      'LINK',
      'MUTABLE',
      { url: urlValue },
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
    this.setState({
      editorState: RichUtils.toggleLink(
        newEditorState,
        editorState.getSelection(),
        entityKey,
      ),
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => { return this.refs.editor.focus(); }, 0);
    });
  }

  abortLink(e) {
    e.preventDefault();
    this.setState({
      showURLInput: false,
      urlValue: '',
    }, () => {
      setTimeout(() => { return this.refs.editor.focus(); }, 0);
    });
  }

  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput =
        (<div className="text-editor__link-url">
          <div>
            <span className="text-editor__link-header">Add link</span>
            <button className="admin-button admin-button__icon admin-button__icon-only" onClick={this.abortLink}>
              <span><i className="material-icons">close</i><span className="sr-only">close</span></span>
            </button>
          </div>
          <label htmlFor="url" >Link</label>
          <input
            id="url"
            onChange={this.onURLChange}
            ref="url"
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onLinkInputKeyDown}
          />
          <div className="admin-button-container"><button className="admin-button" onClick={this.confirmLink}>OK</button></div>
        </div>);
    }

    return (
      <div className="text-editor" ref="textEditor">
        <div className="text-editor__controls" style={{ visibility: this.state.showToolbar ? 'visible' : 'hidden' }}>
          <FormattingControls editorState={this.state.editorState} onToggle={this.toggleInlineStyle} />
          <BlockStyleControls editorState={this.state.editorState} onToggle={this.toggleBlockType} />
          <button onMouseDown={this.promptForLink} className={`admin-button admin-button_icon formatting-button ${this.state.disableAdd ? 'formatting-button--disabled' : null}`} >
            <i className="material-icons">insert_link</i>
          </button>
        </div>
        <div className="text-editor__body">
          {urlInput}
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            handleKeyCommand={this.handleKeyCommand}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
            onTab={this.onTab}
            placeholder={this.props.placeholder}
            ref="editor"
          />
        </div>
      </div>
    );
  }
}

LinkEditor.propTypes = {
  text: PropTypes.string,
  placeholder: PropTypes.string,
  scope: PropTypes.string,
};

LinkEditor.defaultProps = {
  text: '',
};

export default LinkEditor;
