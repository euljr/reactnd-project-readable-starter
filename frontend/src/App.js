import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCategories } from './actions/categories';

class App extends Component {

  componentDidMount() {
    const { loadCategories } = this.props;
    loadCategories();
  }

  render() {
    return (
      <div className="App">
        Readable
      </div>
    );
  }
}

const mapDispatchToProps = {
  loadCategories,
}

export default connect(null, mapDispatchToProps)(App);
