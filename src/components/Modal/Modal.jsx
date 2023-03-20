import css from './Modal.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    largeImage: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeOnEscHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeOnEscHandler);
  }

  closeOnEscHandler = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={css.Overlay} onClick={this.handleBackdropClick}>
        <div className={css.Modal}>
          <img src={this.props.largeImage} alt={this.props.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}
