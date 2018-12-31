import React, { Component } from 'react';
import { TextField, Grid, Button } from '@material-ui/core';
import PropTypes from 'prop-types';

class PostForm extends Component {
  static propTypes = {
    post: PropTypes.object,
    cancel: PropTypes.func,
    saveComment: PropTypes.func.isRequired,
  };

  state = {
    title: this.props.post ? this.props.post.title : '',
    author: this.props.post ? this.props.post.author : '',
    body: this.props.post ? this.props.post.body : '',
  }

  handleTitleChange = title => this.setState({ title });
  handleAuthorChange = author => this.setState({ author });
  handleBodyChange = body => this.setState({ body });

  onSubmit = event => {
    event.preventDefault();
    if(!!this.state.title && !!this.state.author && !!this.state.body) {
      this.props.savePost(this.state)
        .then(() => this.setState({
          title: '',
          author: '',
          body: '',
        }));
    }
  }

  render() {
    const { title, author, body } = this.state;
    const { post, cancel } = this.props;
    return (
      <form noValidate autoComplete="off" onSubmit={this.onSubmit}>
        <Grid container direction="column" spacing={8}>
          <Grid item>
            <Grid container spacing={8}>
              <Grid item xs>
                <TextField
                  label="Title"
                  value={title}
                  onChange={event => this.handleTitleChange(event.target.value)}
                  fullWidth
                />
              </Grid>
              {!post && (
                <Grid item xs>
                  <TextField
                    label="Author"
                    value={author}
                    onChange={event => this.handleAuthorChange(event.target.value)}
                    fullWidth
                  />
                </Grid>
              )}
            </Grid>
          </Grid>
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
                  <Button type="submit" variant="contained">{post ? 'Update Post' : 'Add Post'}</Button>
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

export default PostForm;
