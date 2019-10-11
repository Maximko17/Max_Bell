import React, { Component } from "react";
import "./landing.css";
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
      error.innerHTML = "Невозможно определить геолокацию в этом браузере";
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
              <div className="add-title">Расположение офисов</div>
              <div className="address">
                <h5>
                  <b>Главный офис</b>
                </h5>
                <u>Адрес:</u> <i> Костомаровская набережная, 29</i>
              </div>
              <div className="address">
                <h5>
                  <b>Магазин №1</b>
                </h5>
                <u>Адрес:</u> <i> Академика Королева ул., 11 </i>
              </div>
              <div className="address">
                <h5>
                  <b>Магазин №2</b>
                </h5>
                <u>Адрес:</u> <i> Фадеева ул., 5 </i>
              </div>
              <div className="address">
                <h5>
                  <b>Магазин №3</b>
                </h5>
                <u>Адрес:</u> <i> Большая Татарская ул., 42 </i>
              </div>
              <div className="address">
                <h5>
                  <b>Магазин №4</b>
                </h5>
                <u>Адрес:</u> <i> Мастеркова Ул., 6А, Москва</i>
              </div>
              <div className="user-location">
                <Button color="info" size="lg" onClick={this.getUserLocation}>
                  Узнать свое местоположение
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
