import React from 'react';
import ReactDOM from 'react-dom';
import { Simple, LinkEditor, SimpleMultiline, PlainTextEditor } from 'nocms-editor';
import { listenToGlobal } from 'nocms-events';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      simple: '',
      linkeditor: '',
      multiline: '',
      plaintext: '',
    };

    listenToGlobal('nocms.value-changed', (scope, value) => {
      const state = {};
      state[scope] = value;
      this.setState(state);
    });
  }

  render() {
    return (
      <div>
        <Simple scope="simple" text={this.state.simple} />
        <LinkEditor scope="linkeditor" text={this.state.linkeditor} />
        <SimpleMultiline scope="multiline" text={this.state.multiline} />
        <PlainTextEditor scope="plaintext" text={this.state.plaintext} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
