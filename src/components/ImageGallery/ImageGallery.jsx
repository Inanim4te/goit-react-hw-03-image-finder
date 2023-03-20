import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import Button from 'components/Button/Button';
import Loader from 'components/Loader/Loader';

export class ImageGallery extends Component {
  state = {
    pictures: [],
    currentPage: 1,
    error: null,
    isLoading: false,
  };

  static propTypes = { picName: PropTypes.string.isRequired };

  async componentDidUpdate(prevProps, prevState) {
    const { picName } = this.props;
    const { currentPage } = this.state;

    if (prevProps.picName !== picName) {
      this.setState({ pictures: [] });
      this.fetchImages(picName, 1);
    }

    if (
      prevState.currentPage !== currentPage &&
      prevProps.picName === picName
    ) {
      this.fetchImages(picName, currentPage);
    }
  }

  fetchImages = async (picName, page) => {
    this.setState({ isLoading: true });

    try {
      const res = await axios('https://pixabay.com/api/', {
        params: {
          key: '33649719-b7fecbfe979c6e7e0b54f5aa7',
          q: picName,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: page,
          per_page: 12,
        },
      });

      this.setState({
        pictures: [...this.state.pictures, ...res.data.hits],
      });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  changePageHandler = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  render() {
    const { pictures, isLoading } = this.state;
    return (
      <>
        {pictures.length ? (
          <ul className={css.ImageGallery}>
            {pictures.map(el => (
              <ImageGalleryItem
                key={el.id}
                webformatURL={el.webformatURL}
                largeImageURL={el.largeImageURL}
                tags={el.tags}
              />
            ))}
          </ul>
        ) : null}
        {isLoading && <Loader />}
        {pictures.length ? (
          <Button title="Load more" onClick={this.changePageHandler} />
        ) : null}
      </>
    );
  }
}
