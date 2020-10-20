import React, { Component } from 'react';
import Spinner from './Spinner/Spinner';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import ErrorNotification from './ErrorNotification/ErrorNotification';
import pixabayApi from '../services/pixabayApi';
import Button from './Button/Button';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    images: [],
    loading: false,
    error: null,
    searchQuery: '',
    page: 1,
    largeImageUrl: null,
    tags: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.fetchImages();
    }

    if (
      this.state.page > 2 &&
      prevProps.page !== prevState.page &&
      this.state.largeImageUrl === null
    ) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  fetchImages = () => {
    const { searchQuery, page } = this.state;

    this.setState({ loading: true });

    pixabayApi
      .fetchImagesWithQuery(searchQuery, page)
      .then(images =>
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
        })),
      )
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  handleSearchFormSubmit = query => {
    this.setState({ searchQuery: query, page: 1, images: [] });
  };

  setLargeImage = (url, tags) => {
    this.setState({ largeImageUrl: url, tags: tags });
  };

  render() {
    const { images, loading, error, largeImageUrl, tags } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchFormSubmit} />

        {error && <ErrorNotification />}

        {images.length > 0 && (
          <ImageGallery>
            <ImageGalleryItem
              images={this.state.images}
              largeImage={this.setLargeImage}
            />
          </ImageGallery>
        )}

        {loading && <Spinner />}

        {images.length > 0 && !loading && (
          <Button fetchImages={this.fetchImages} />
        )}

        {largeImageUrl && (
          <Modal onClose={this.setLargeImage}>
            <img src={largeImageUrl} alt={tags} />
          </Modal>
        )}
      </>
    );
  }
}
