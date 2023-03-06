import React, { Component } from 'react';
import { GlobalStyle } from 'GlobalStyle';
import { Layout } from './Layout';
import ImageGallery from './ImageGallery/ImagesList';
import Button from './Button';
import Modal from './Modal';
import SearchBar from './SearchBar';

class App extends Component {
  state = {
    searchValue: '',
    page: 1,
    showModal: false,
    url: {
      srcLarge: '',
      altLarge: '',
    },
    fotos: false,
  };

  toggleModal = event => {
    if (event !== null) {
      this.setState({
        url: {
          srcLarge: event.target.currentSrc,
          altLarge: event.target.alt,
        },
      });
    }

    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  loadMoreImages = () => {
    this.setState({ page: this.state.page + 1 });
    this.setState(prevState => ({ searchValue: prevState.searchValue }));
  };

  toggleFotos = () => {
    this.setState({ fotos: true });
  };

  render() {
    const { searchValue, page, showModal, url, fotos } = this.state;

    return (
      <Layout>
        <GlobalStyle />
        <SearchBar onSubmit={this.handleFormSubmit} />

        <ImageGallery
          searchValue={searchValue}
          page={page}
          onImageClick={this.toggleModal}
          onAddFotos={this.toggleFotos}
        />

        {fotos && <Button onLoadMoreClick={this.loadMoreImages} />}

        {showModal && (
          <Modal
            srcLarge={url.srcLarge}
            altLarge={url.altLarge}
            onModalClick={this.toggleModal}
          />
        )}
      </Layout>
    );
  }
}

export default App;
