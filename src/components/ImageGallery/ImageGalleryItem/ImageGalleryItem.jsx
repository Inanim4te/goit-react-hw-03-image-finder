import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class ImageGalleryItem extends Component {
  // static propTypes = {second: third}

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <li className={css.ImageGalleryItem}>
        <img
          src={webformatURL}
          alt={tags}
          className={css.ImageGalleryItemImage}
        />
      </li>
    );
  }
}
