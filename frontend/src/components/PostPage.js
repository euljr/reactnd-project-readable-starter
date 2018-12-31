import React, { Component } from 'react';
import Post from './Post';
import { connect } from 'react-redux';
import { loadComments, addComment } from '../actions/comments';
import { Grid, Button, withStyles } from '@material-ui/core';
import { Sort } from '@material-ui/icons';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { Redirect } from 'react-router';

const styles = theme => ({
  sortIconAsc: {
    marginLeft: 10,
    transform: 'scaleY(-1)'
  },
  sortIconDesc: {
    marginLeft: 10,
  },
});

class PostPage extends Component {
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

  componentDidMount() {
    const { loadComments, id } = this.props;
    loadComments(id);
  }

  render() {
    const { post, comments, classes, addComment } = this.props;
    const { orderBy, orderDir } = this.state;
    const sortedComments = comments.sort((a, b) => {
      if(orderBy === 'date') {
        return orderDir === 'desc' ? b.timestamp - a.timestamp : a.timestamp - b.timestamp;
      } else {
        return orderDir === 'desc' ? b.voteScore - a.voteScore : a.voteScore - b.voteScore;
      }
    });
    if(!post) {
      return <Redirect to="/404" />;
    }
    return (
      <Grid container direction="column" spacing={16}>
        <Grid item>
          <Post post={post} />
        </Grid>
        <Grid item>
          <CommentForm saveComment={commentData => addComment({ ...commentData, parentId: post.id })} />
        </Grid>
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
            {sortedComments.map(comment =>
              <Grid item key={comment.id}>
                <Comment comment={comment} />
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps(state, props) {
  const post = state.posts.byId[props.id];
  return {
    post,
    comments: Object.values(state.comments.byId)
      .filter(comment => comment.parentId === props.id),
  };
}

const mapDispatchToProps = {
  loadComments,
  addComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(PostPage));
