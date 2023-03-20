import css from './App.module.css';
import React, { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';

export class App extends Component {
  state = {
    picName: '',
  };

  handleFormSubmit = picName => {
    this.setState({ picName });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery picName={this.state.picName} />
      </div>
    );
  }
}
