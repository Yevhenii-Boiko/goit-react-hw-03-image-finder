import React, { Component } from 'react';
import imagesApi from 'services/ApiService';
import { ImagesGallery, Message } from './ImagesGallery.styled';
import Spiner from 'components/Loader/Loader';
import ImageGalleryItem from 'components/ImageGalleryItem/ImageItem';

class ImageGallery extends Component {
  state = {
    fotos: null,
    error: null,
    status: 'idle',
  };

  async componentDidUpdate(prevProps, prevState) {
    const searchValue = this.props.searchValue;
    const pageNumber = this.props.page;

    if (prevProps.searchValue !== this.props.searchValue) {
      this.setState({ status: 'pending' });

      imagesApi
        .fetchImages(searchValue, pageNumber)
        .then(data => this.setState({ fotos: data.hits, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }));

      this.props.onAddFotos();
    }

    if (
      prevProps.searchValue === this.props.searchValue &&
      this.props.page !== prevProps.page
    ) {
      this.setState({ status: 'pending' });

      await imagesApi
        .fetchImages(searchValue, pageNumber)
        .then(data =>
          this.setState({
            fotos: [...prevState.fotos, ...data.hits],
            status: 'resolved',
          })
        )
        .catch(error => this.setState({ error, status: 'rejected' }));

      this.props.onAddFotos();
    }
  }

  render() {
    const { error, fotos, status } = this.state;

    if (status === 'pending') {
      return <Spiner />;
    }

    if (status === 'rejected') {
      return <h2>{error.message}</h2>;
    }

    if (status === 'resolved') {
      return (
        <div>
          <div>
            {fotos < 1 && (
              <Message>
                Can not find images with name {this.props.searchValue}...
              </Message>
            )}
          </div>
          <ImagesGallery>
            {fotos &&
              fotos.map(photo => (
                <ImageGalleryItem
                  key={photo.id}
                  src={photo.largeImageURL}
                  alt={photo.id}
                  onClick={this.props.onImageClick}
                />
              ))}
          </ImagesGallery>
        </div>
      );
    }
  }
}

export default ImageGallery;
