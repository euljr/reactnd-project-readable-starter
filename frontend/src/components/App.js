import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadCategories } from '../actions/categories';
import { loadPosts } from '../actions/posts';
import LoadingBar, { showLoading, hideLoading } from 'react-redux-loading-bar';
import { Link, Route, withRouter, Switch, Redirect } from 'react-router-dom';
import PostList from './PostList';
import { withStyles, Drawer, List, ListItem } from '@material-ui/core';
import PostPage from './PostPage';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 240,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  active: {
    backgroundColor: theme.palette.action.selected
  },
});

class App extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    const { loadCategories, loadPosts, showLoading, hideLoading } = this.props;
    showLoading()
    Promise.resolve()
      .then(() => (new Promise(r => setTimeout(() => r(), 1000))))
      .then(() => loadCategories())
      .then(() => loadPosts())
      .then(() => hideLoading())
      .catch(() => hideLoading())
      .then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state;
    const { categories, classes, location } = this.props;
    const { pathname } = location;
    const categoriesPathFilter = categories.map(category => category.name).join('|');
    return (
      <div className={classes.root}>
        <LoadingBar />
        <Drawer variant="permanent" anchor="left" className={classes.drawer} classes={{paper:classes.drawerPaper}}>
          <List>
            <ListItem button component={Link} to='/' selected={pathname === '/'}>Home</ListItem>
            {categories.map(category => (
              <ListItem button component={Link} to={`/${category.path}`}  selected={pathname === `/${category.path}`} key={category.name}>
                {category.name}
              </ListItem>
            ))}
          </List>
        </Drawer>
        {!loading && <div className={classes.content}>
          <Switch>
            <Route exact path='/' component={PostList}/>
            <Route
              path={`/:category(${categoriesPathFilter})/:postId`}
              component={({ match }) => <PostPage id={match.params.postId} />}
            />
            <Route
              path={`/:category(${categoriesPathFilter})`}
              component={({ match }) => <PostList category={match.params.category} />}
            />
            <Route path='/404' component={() => <div>404</div>} />
            <Redirect to='/404' />
          </Switch>
        </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
  };
}

const mapDispatchToProps = {
  loadCategories,
  loadPosts,
  showLoading,
  hideLoading,
}

export default withStyles(styles)(withRouter(connect(mapStateToProps, mapDispatchToProps)(App)));
