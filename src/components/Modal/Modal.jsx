import css from './Modal.module.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

export class Modal extends Component {
  // static propTypes = {second: third}

  render() {
    return (
      <div className={css.Overlay}>
        <div className={css.Modal}>
          <img src="" alt="" />
        </div>
      </div>
    );
  }
}
