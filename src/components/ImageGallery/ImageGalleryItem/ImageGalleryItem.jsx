import css from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  static propTypes = {
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  };

  handleModalToggle = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { webformatURL, tags, largeImageURL } = this.props;
    return (
      <>
        <li className={css.ImageGalleryItem}>
          <img
            src={webformatURL}
            alt={tags}
            className={css.ImageGalleryItemImage}
            onClick={this.handleModalToggle}
          />
        </li>
        {this.state.showModal && (
          <Modal
            largeImage={largeImageURL}
            tags={tags}
            onClose={this.handleModalToggle}
          />
        )}
      </>
    );
  }
}
