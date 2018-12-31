import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardContent, Typography, withStyles, Grid, IconButton } from '@material-ui/core';
import { ArrowDropDown, ArrowDropUp, Edit, Delete } from '@material-ui/icons';
import { connect } from 'react-redux';
import { upVoteComment, downVoteComment, editComment, removeComment } from '../actions/comments';
import CommentForm from './CommentForm';

const styles = theme => ({
  comments: {
    margin: theme.spacing.unit,
  },
  commentIcon: {
    marginRight: theme.spacing.unit,
  },
  voteScore: {
    margin: theme.spacing.unit,
  },
});

class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
  };

  state = {
    edit: false,
  };

  toggleEdit = () => this.setState(state => ({ edit: !state.edit }));

  editComment = comment => {
    const { editComment } = this.props;
    return editComment({ id: this.props.comment.id, body: comment.body })
      .then(() => this.toggleEdit());
  }

  deleteComment = () => {
    const { comment, removeComment } = this.props;
    return removeComment(comment);
  }

  render() {
    const { edit } = this.state;
    const { comment, classes, upVoteComment, downVoteComment } = this.props;
    return (
      <Card>
        {edit ? (
          <CardContent>
            <CommentForm
              saveComment={this.editComment}
              cancel={this.toggleEdit}
              comment={comment}
            />
          </CardContent>
        ) : (
          <Grid container alignItems="center">
            <Grid item className={classes.vote}>
              <Grid container direction="column" alignItems="center" justify="space-around" alignContent="center">
                <Grid item>
                  <IconButton onClick={() => upVoteComment(comment)}><ArrowDropUp /></IconButton>
                </Grid>
                <Grid item className={classes.voteScore}>
                  {comment.voteScore}
                </Grid>
                <Grid item>
                  <IconButton onClick={() => downVoteComment(comment)}><ArrowDropDown /></IconButton>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs>
              <Grid container>
                <Grid item xs={12}><Typography variant="caption">@{comment.author}</Typography></Grid>
                <Grid item xs={12}><Typography variant="body1">{comment.body}</Typography></Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item>
                  <IconButton onClick={this.toggleEdit}><Edit /></IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={this.deleteComment}><Delete /></IconButton>
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
  upVoteComment,
  downVoteComment,
  editComment,
  removeComment,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(Comment));
