import Spiner from 'components/Loader/Loader';
import { Component } from 'react';
import { getImages } from 'services/ApiService';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageItem';
import { ImageGallery } from './ImagesGallery.styled';

class ImagesGallery extends Component {
  state = {
    fotos: null,
    error: null,
    status: 'idle',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.value !== this.props.value ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: 'pending' });

      getImages(this.props.value)
        .then(response => response.json())
        .then(data => {
          //   if (fotos.status !== 'ok') {
          //     return Promise.reject(fotos.error);
          //   }
          this.setState({ fotos: data.hits, status: 'resolved' });
        })
        .catch(error => {
          this.setState({ error, status: 'rejected' });
        });
    }
  }

  render() {
    const { status, fotos, error } = this.state;
    if (this.state.status === 'pending') {
      return <Spiner />;
    }

    if (status === 'resolved') {
      return (
        <ImageGallery>
          {fotos &&
            fotos.map(photo => (
              <ImageGalleryItem
                key={photo.id}
                src={photo.webformatURL}
                alt={photo.tags}
                onClick={this.props.onImageClick}
              />
            ))}
        </ImageGallery>
      );
    }

    if (status === 'rejected') {
      return <h2>{error}</h2>;
    }
  }
}
export default ImagesGallery;
