import React, { Component } from 'react';
import {
  SearchBar,
  Form,
  FormBtn,
  FormLabel,
  FormInput,
} from './SearchBar.styled';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleNameChange = event => {
    this.setState({ searchValue: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchValue.trim() === '') {
      return alert('Enter something!');
    }
    this.props.onSubmit(this.state.searchValue);
    this.setState({ searchValue: '' });
  };

  render() {
    return (
      <SearchBar>
        <Form onSubmit={this.handleSubmit}>
          <FormBtn type="submit">
            <FormLabel>Search</FormLabel>
          </FormBtn>

          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleNameChange}
          />
        </Form>
      </SearchBar>
    );
  }
}

export default Searchbar;
