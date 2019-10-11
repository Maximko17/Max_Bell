import React, { Component } from "react";
import Slider from "../slider/slider";
import Map from "../map/map";
import { Button } from "reactstrap";

export default class Landing extends Component {
  state = {
    user_latitude: "",
    user_longitude: ""
  };

  getUserLocation = () => {
    var error = document.getElementById("location-error");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          user_latitude: position.coords.latitude,
          user_longitude: position.coords.longitude
        });
      });
    } else {
      error.innerHTML = "Unable to determine geolocation in this browser";
    }
  };

  render() {
    const { user_latitude, user_longitude } = this.state;
    return (
      <div>
        <Slider />
        <div className="container-fluid container-width">
          <div className="row justify-content-center mt-4">
            <div className="col-lg-4">
              <div className="add-title">Location of offices</div>
              <div className="address">
                <h5>
                  <b>Main office</b>
                </h5>
                <u>Address:</u> <i> Kostomarovskaya naberezhnaya, 29</i>
              </div>
              <div className="address">
                <h5>
                  <b>Shop №1</b>
                </h5>
                <u>Address:</u> <i> Akademika Koroleva st., 11 </i>
              </div>
              <div className="address">
                <h5>
                  <b>Shop №2</b>
                </h5>
                <u>Address:</u> <i> Fadeyeva st., 5 </i>
              </div>
              <div className="address">
                <h5>
                  <b>Shop №3</b>
                </h5>
                <u>Address:</u> <i> Bol'shaya Tatarskaya st., 42 </i>
              </div>
              <div className="address">
                <h5>
                  <b>Shop №4</b>
                </h5>
                <u>Address:</u> <i> Masterkova st., 6А</i>
              </div>
              <div className="user-location">
                <Button color="info" size="lg" onClick={this.getUserLocation}>
                  Get to know your location
                </Button>
                <p id="location-error" />
              </div>
            </div>
            <div className="map-size col-lg-8">
              <Map lat={user_latitude} lng={user_longitude} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
