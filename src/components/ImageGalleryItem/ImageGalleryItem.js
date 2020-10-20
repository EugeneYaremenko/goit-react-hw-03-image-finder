import React from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ images, largeImage }) => {
  return images.map(({ id, previewURL, tags, largeImageURL }) => (
    <li
      key={id}
      className={styles.ImageGalleryItem}
      onClick={() => largeImage(largeImageURL, tags)}
    >
      <img
        src={previewURL}
        alt={tags}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  ));
};

ImageGalleryItem.defaultProps = {
  previewURL:
    'https://blog.rahulbhutani.com/wp-content/uploads/2020/05/Screenshot-2018-12-16-at-21.06.29.png',
};

ImageGalleryItem.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      previewURL: PropTypes.string,
      tags: PropTypes.string.isRequired,
    }),
  ),
};

export default ImageGalleryItem;
