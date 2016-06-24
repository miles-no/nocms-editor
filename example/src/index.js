const React = require('react');
const ReactDOM = require('react-dom');
import { Simple, LinkEditor } from 'nocms-editor';

const App = () => {
  return (
    <div>
      <Simple text="Hello, I'm simple" />
      <LinkEditor />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('app'));
