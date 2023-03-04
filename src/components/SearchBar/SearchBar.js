import { Component } from 'react';
import {
  Searchbar,
  Form,
  FormBtn,
  FormLabel,
  FormInput,
} from './SearchBar.styled';

class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ value });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    this.props.onSearch(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <Searchbar>
        <Form onSubmit={this.handleSubmit}>
          <FormBtn type="submit">
            <FormLabel>Search</FormLabel>
          </FormBtn>
          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </Form>
      </Searchbar>
    );
  }
}

export default SearchBar;
