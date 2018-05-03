import React from 'react';
import ReactDOM from 'react-dom';
import { Simple, LinkEditor, SimpleMultiline, PlainTextEditor } from 'nocms-editor'; // eslint-disable-line
import { listenToGlobal } from 'nocms-events';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      simple: '',
      linkeditor: 'Heisann, vi har forhåndsdefinerte data!!',
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
        <h2> Simple</h2>
        <Simple scope="simple" text={this.state.simple} />
        <h2>LinkEditor</h2>
        <LinkEditor scope="linkeditor" text={this.state.linkeditor} />
        <h2>SimpleMultiline</h2>
        <SimpleMultiline scope="multiline" text={this.state.multiline} />
        <h2>PlainTextEditor</h2>
        <PlainTextEditor scope="plaintext" text={this.state.plaintext} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
