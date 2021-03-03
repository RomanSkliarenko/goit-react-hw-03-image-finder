import React, { Component } from "react";
import "./App.css";
import Loader from "react-loader-spinner";
import axios from "axios";
import Searchbar from "./Components/Searchbar/searchbar";
import ImageGallery from "./Components/ImageGallery/imageGallery";
import Button from "./Components/Button/button";
import Modal from "./Components/Modal/modal";

export class App extends Component {
  state = {
    images: [],
    searchQuery: "",
    page: 2,
    modalIsOpen: false,
    modalImage: "",
    isLoad: false,
  };
  componentDidMount() {
    this.setState({ isLoad: true });

    axios
      .get(
        "https://pixabay.com/api/?q=&page=1&key=20177896-1cf321c1d71fc21c86755b502&image_type=photo&orientation=horizontal&per_page=12"
      )
      .then((res) => {
        this.setState({ images: res.data.hits });
      })
      .finally(() => this.setState({ isLoad: false }));
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }
  searchImageHandler = (searchQuery) => {
    this.setState({ isLoad: true });
    axios
      .get(
        `https://pixabay.com/api/?q=${searchQuery}&page=1&key=20177896-1cf321c1d71fc21c86755b502&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then((res) => {
        this.setState({ images: res.data.hits, searchQuery, page: 2 });
      })
      .finally(() => this.setState({ isLoad: false }));
  };
  loadMoreBtn = () => {
    this.setState({ isLoad: true });

    axios
      .get(
        `https://pixabay.com/api/?q=${this.state.searchQuery}&page=${this.state.page}&key=20177896-1cf321c1d71fc21c86755b502&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then((res) => {
        this.setState((prevState) => {
          return {
            images: [...prevState.images, ...res.data.hits],
            page: prevState.page + 1,
          };
        });
      })
      .finally(() => this.setState({ isLoad: false }));
  };
  openModal = (modalImage) => {
    this.setState({
      modalIsOpen: true,
      modalImage: modalImage,
    });
  };
  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <Searchbar searchImageHandler={this.searchImageHandler} />
        {this.state.isLoad ? (
          <Loader
            type="TailSpin"
            color="#ff0000"
            className="Loader"
            height={80}
            width={80}
          />
        ) : null}
        <ImageGallery images={this.state.images} openModal={this.openModal} />
        {this.state.images.length > 0 ? (
          <Button loadMoreBtn={this.loadMoreBtn} />
        ) : null}

        {this.state.modalIsOpen ? (
          <Modal img={this.state.modalImage} closeModal={this.closeModal} />
        ) : null}
      </div>
    );
  }
}

export default App;
// comments: 239
// downloads: 314960
// favorites: 1522
// id: 2083492
// imageHeight: 3008
// imageSize: 4130948
// imageWidth: 4928
// largeImageURL: "https://pixabay.com/get/g84f6a2c06e787fd4048916d6ff8fd66ed8957426d9d10e2f1f162c3f0033f98d961daef67e591c159ac9af8bb391c0652700a5359310bd6b739eafdf4e90b1d0_1280.jpg"
// likes: 1739
// pageURL: "https://pixabay.com/photos/cat-young-animal-curious-wildcat-2083492/"
// previewHeight: 91
// previewURL: "https://cdn.pixabay.com/photo/2017/02/20/18/03/cat-2083492_150.jpg"
// previewWidth: 150
// tags: "cat, young animal, curious"
// type: "photo"
// user: "susannp4"
// userImageURL: "https://cdn.pixabay.com/user/2015/12/16/17-56-55-832_250x250.jpg"
// user_id: 1777190
// views: 613346
// webformatHeight: 390
// webformatURL: "https://pixabay.com/get/g1b3902ede70787d5ca36d0577878f4815ba9d89d267c48fadacf9a8bb093f2de3dadd889e5e74cb2d123360d85cbc607294ae8061a29556d9678279312b993e1_640.jpg"
// webformatWidth: 640
