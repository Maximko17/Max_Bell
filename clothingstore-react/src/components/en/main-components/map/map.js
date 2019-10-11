import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

const Shop = ({ name }) => (
  <div
    style={{
      color: "white",
      background: "black",
      padding: "7px 5px",
      display: "inline-flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "100%",
      transform: "translate(-50%, -50%)"
    }}
  >
    {name}
  </div>
);

const User = () => (
  <div>
    <img
      src="https://img.icons8.com/ios-glyphs/26/000000/street-view.png"
      style={{ width: "35px", height: "35px" }}
    />
  </div>
);

export default class Map extends Component {
  static defaultProps = {
    center: { lat: 55.75033987, lng: 37.66816825 },
    zoom: 11
  };

  render() {
    const { lat, lng } = this.props;
    return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAC4zTx1mCKXhaUDp4TSlDDOIjcOXd7-6k" }}
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}
      >
        <Shop lat={55.75033987} lng={37.66816825} name={"Main office"} />
        <Shop lat={55.82059727} lng={37.62120545} name={"Shop 1"} />
        <Shop lat={55.77531187} lng={37.59699047} name={"Shop 2"} />
        <Shop lat={55.73704454} lng={37.6351288} name={"Shop 3"} />
        <Shop lat={55.70818263} lng={37.65710145} name={"Shop 4"} />
        {lat === "" ? null : <User lat={lat} lng={lng} />}
      </GoogleMapReact>
    );
  }
}
