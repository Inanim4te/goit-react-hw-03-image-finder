import css from './ImageGallery.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import axios from 'axios';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  state = {
    pictures: [],
    showModal: false,
    currentPage: 0,
  };
  // static propTypes = {second: third}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.picName !== this.props.picName) {
      this.setState({ currentPage: 1, pictures: [] });
    }
    if (prevState.currentPage !== this.state.currentPage) {
      axios('https://pixabay.com/api/', {
        params: {
          key: '33649719-b7fecbfe979c6e7e0b54f5aa7',
          q: this.props.picName,
          image_type: 'photo',
          orientation: 'horizontal',
          safesearch: 'true',
          page: this.state.currentPage,
          per_page: 12,
        },
      }).then(res =>
        this.setState({ pictures: [...this.state.pictures, ...res.data.hits] })
      );
    }
  }

  changePageHandler = () => {
    this.setState(prevState => {
      return { currentPage: prevState.currentPage + 1 };
    });
  };

  handleModalToggle = e => {};

  render() {
    return (
      <>
        <ul className={css.ImageGallery}>
          {this.state.pictures
            ? this.state.pictures.map(el => {
                return (
                  <ImageGalleryItem
                    key={el.id}
                    webformatURL={el.webformatURL}
                    largeImageURL={el.largeImageURL}
                    tags={el.tags}
                  />
                );
              })
            : null}
        </ul>
        <button type="button" onClick={this.changePageHandler}>
          Find more
        </button>
      </>
    );
  }
}
