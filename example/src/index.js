import React, { PropTypes } from 'react';
const ReactDOM = require('react-dom');
import { Simple, LinkEditor } from 'nocms-editor';
import events from 'nocms-events';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      simple: '',
      linkeditor: '',
    };

    events.listenTo('nocms.value-changed', (scope, value) => {
      const state = {};
      state[scope] = value;
      this.setState(state);
    });
  }

  render() {
    return (<div>
      <Simple scope="simple" text={this.state.simple} />
      <LinkEditor scope="linkeditor" text={this.state.linkeditor} />
    </div>);
  }
}

App.propTypes = {
  simple: PropTypes.string,
  linkeditor: PropTypes.string,
};

ReactDOM.render(<App />, document.getElementById('app'));
