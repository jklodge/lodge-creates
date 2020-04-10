import React, { Component } from "react";
import "./SwipeSection.scss";
import Slider from "./Slider";

class SwipeSection extends Component {
  state = {
    slider: [
      "Want to improve your life, but unsure how? Don’t worry we’ve got you covered. We understand that life can be overwhelming, so we want to help you take control and manage it in a better way.",
      "second",
      "third",
      "fourth"
    ],
    activeIndex: 1,
    left: 0,
    sliderWidth: 350
  };

  componentDidMount() {}

  prevSlide = () => {
    this.setState({
      activeIndex: this.state.activeIndex - 1,
      left: this.state.left + this.state.sliderWidth // this.props.sliderWidth not working for some reason
    });
    if (this.state.activeIndex === 1) {
      this.setState({
        activeIndex: this.state.activeIndex + this.state.slider.length - 1,
        left:
          this.state.left -
          this.state.sliderWidth * (this.state.slider.length - 1)
      });
    }
  };

  nextSlide = () => {
    this.setState({
      activeIndex: this.state.activeIndex + 1,
      left: this.state.left - this.state.sliderWidth
    });
    if (this.state.activeIndex === this.state.slider.length) {
      this.setState({
        activeIndex: this.state.activeIndex - this.state.slider.length + 1,
        left: 0
      });
    }
  };
  clickIndicator = e => {
    this.setState({
      activeIndex: parseInt(e.target.textContent),
      left:
        this.state.sliderWidth -
        parseInt(e.target.textContent) * this.state.sliderWidth
    });
  };

  render() {
    let bgImage =
      this.state.activeIndex === 2
        ? "checkImage"
        : this.state.activeIndex === 3
        ? "thinkImage"
        : this.state.activeIndex === 4
        ? "canImage"
        : "";

    return (
      <div className="SwipeSection">
        <div className={bgImage}></div>
        {/* {this.state.activeIndex === 1 && (
          <React.Fragment>
            <div className="headContainer">
              <h1>The COL Philosphy</h1>
            </div>
          </React.Fragment>
        )} */}
        <Slider
          prevSlide={this.prevSlide}
          clickIndicator={this.clickIndicator}
          nextSlide={this.nextSlide}
          slider={this.state.slider}
          activeIndex={this.state.activeIndex}
          sliderWidth={this.state.sliderWidth}
          left={this.state.left}
        />
      </div>
    );
  }
}

export default SwipeSection;
