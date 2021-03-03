import React from "react";
import ImageGalleryItem from "./imageGalleryItem/imageGalletyItem";
import PropTypes from "prop-types";
const ImageGallery = ({ images, openModal }) => {
  return (
    <ul className="ImageGallery">
      <ImageGalleryItem images={images} openModal={openModal} />
    </ul>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
};
export default ImageGallery;
