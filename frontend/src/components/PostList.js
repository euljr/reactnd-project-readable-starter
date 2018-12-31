import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Post from './Post';
import { Grid, Button, withStyles } from '@material-ui/core';
import PostForm from './PostForm';
import { addPost } from '../actions/posts';
import { Sort } from '@material-ui/icons';
import { withRouter } from 'react-router-dom';

const styles = theme => ({
  sortIconAsc: {
    marginLeft: 10,
    transform: 'scaleY(-1)'
  },
  sortIconDesc: {
    marginLeft: 10,
  },
});

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PropTypes.object).isRequired,
    category: PropTypes.string,
  };

  state = {
    orderBy: 'date',
    orderDir: 'desc',
  };

  toggleOrder = orderBy => () => {
    this.setState(state => ({
      orderBy,
      orderDir: state.orderDir === 'asc' ? 'desc' : 'asc'
    }));
  };

  goToPost = post => () => {
    const { history } = this.props;
    history.push(`/${post.category}/${post.id}`);
  }

  render() {
    const { posts, category, addPost, classes } = this.props;
    const { orderBy, orderDir } = this.state;
    const sortedPosts = posts.sort((a, b) => {
      if(orderBy === 'date') {
        return orderDir === 'desc' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
      } else {
        return orderDir === 'desc' ? b.voteScore - a.voteScore : a.voteScore - b.voteScore;
      }
    });
    return (
      <div>
        <h1>{category || 'Home'}</h1>
        <Grid container direction="column" spacing={16}>
          {category && <Grid item>
            <PostForm savePost={postData => addPost({...postData, category})} />
          </Grid>}
          <Grid item>
            <Grid container justify="flex-end" alignItems="center" spacing={8}>
              <Grid item>
                Order by:
              </Grid>
              <Button onClick={this.toggleOrder('score')}>
                Score
                {orderBy === 'score' && (
                  <Sort className={orderDir === 'desc' ? classes.sortIconDesc : classes.sortIconAsc} />
                )}
              </Button>
              <Button onClick={this.toggleOrder('date')}>
                Date
                {orderBy === 'date' && (
                  <Sort className={orderDir === 'desc' ? classes.sortIconDesc : classes.sortIconAsc} />
                )}
              </Button>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container direction='column' spacing={8}>
              {sortedPosts.map(post => <Grid key={post.id} item><Post post={post} goToPost={this.goToPost(post)} /></Grid>)}
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const { category } = props;
  const posts = !category
    ? Object.values(state.posts.byId)
    : Object.values(state.posts.byId).filter(post => post.category === category);
  return { posts };
}

const mapDispatchToProps = {
  addPost,
};

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(withRouter(PostList)));
