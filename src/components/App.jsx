import { Component } from 'react';
import { Layout } from './Layout';
import { GlobalStyle } from 'GlobalStyle';
import Button from './Button/Button';
import ImagesGallery from './ImageGallery/ImagesList';
import SearchBar from './SearchBar/SearchBar';

export class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
  };

  handleSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  loadMore = () => {};

  render() {
    return (
      <Layout>
        <GlobalStyle />
        <SearchBar onSearch={this.handleSubmit} />
        <ImagesGallery value={this.state.searchQuery} />
        <Button onLoadMoreClick={this.loadMore} />
      </Layout>
    );
  }
}
