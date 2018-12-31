import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, Typography, CardContent, withStyles, Grid, IconButton, CardActionArea } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Edit, Delete } from '@material-ui/icons';
import { connect } from 'react-redux';
import { upVotePost, downVotePost, editPost, removePost } from '../actions/posts';
import PostForm from './PostForm';

const styles = theme => ({
  voteScore: {
    margin: theme.spacing.unit,
  },
});

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
  };

  state = {
    edit: false,
  };

  toggleEdit = () => this.setState(state => ({ edit: !state.edit }));

  editPost = post => {
    const { editPost } = this.props;
    return editPost({ id: this.props.post.id, title: post.title, body: post.body })
      .then(() => this.toggleEdit());
  }

  deletePost = () => {
    const { post, removePost } = this.props;
    return removePost(post);
  }

  render() {
    const { edit } = this.state;
    const { post, classes, upVotePost, downVotePost, goToPost } = this.props;
    return (
      <Card>
        {edit ? (
          <CardContent>
            <PostForm
              savePost={this.editPost}
              cancel={this.toggleEdit}
              post={post}
            />
          </CardContent>
        ) : (
          <Grid container alignItems="center">
            <Grid item>
              <Grid container direction="column" alignItems="center" justify="space-around" alignContent="center">
                <Grid item>
                  <IconButton onClick={() => upVotePost(post)}><ArrowDropUp /></IconButton>
                </Grid>
                <Grid item className={classes.voteScore}>
                  {post.voteScore}
                </Grid>
                <Grid item>
                  <IconButton onClick={() => downVotePost(post)}><ArrowDropDown /></IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <CardActionArea onClick={goToPost} disabled={!goToPost}>
                <CardContent>
                  <Typography variant="caption">@{post.author} - {post.category}</Typography>
                  <Typography gutterBottom variant="h6">{post.title}</Typography>
                  <Typography gutterBottom variant="body1">{post.body}</Typography>
                  <Typography gutterBottom variant="body2">{post.commentCount} comments</Typography>
                </CardContent>
              </CardActionArea>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <IconButton onClick={this.toggleEdit}><Edit /></IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={this.deletePost}><Delete /></IconButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Card>
    );
  }
}

const mapDispatchToProps = {
  upVotePost,
  downVotePost,
  editPost,
  removePost,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Post));
