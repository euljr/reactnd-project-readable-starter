import React, { Component } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

class CommentForm extends Component {
  static propTypes = {
    comment: PropTypes.object,
    cancel: PropTypes.func,
    saveComment: PropTypes.func.isRequired,
  };

  state = {
    author: this.props.comment ? this.props.comment.author : '',
    body: this.props.comment ? this.props.comment.body : '',
  }

  handleAuthorChange = author => this.setState({ author });
  handleBodyChange = body => this.setState({ body });

  onSubmit = event => {
    event.preventDefault();
    if(!!this.state.author && !!this.state.body) {
      this.props.saveComment(this.state)
        .then(() => this.setState({
          author: '',
          body: '',
        }));
    }
  }

  render() {
    const { author, body } = this.state;
    const { comment, cancel } = this.props;
    return (
      <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <Grid container direction="column" spacing={8}>
          {!comment && (
            <Grid item>
              <TextField
                label="Author"
                value={author}
                onChange={event => this.handleAuthorChange(event.target.value)}
                fullWidth
              />
            </Grid>
          )}
          <Grid item>
            <TextField
              multiline
              rows="4"
              rowsMax="4"
              label="Body"
              value={body}
              onChange={event => this.handleBodyChange(event.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item>
            <Grid container spacing={8}>
              <Grid item>
                <Button type="submit" variant="contained">{comment ? 'Update Comment' : 'Add Comment'}</Button>
              </Grid>
              {cancel && (
                <Grid item>
                  <Button variant="contained" onClick={cancel}>Cancel</Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default CommentForm;
