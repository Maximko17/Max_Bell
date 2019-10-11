import React, { Component } from "react";

export default class Footer_en extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid footer-bg1 pt-3">
          <div className="row justify-content-md-center">
            <div className="col-xl-5 left">
              <p>
                <b>Support</b>
              </p>
              <b>---</b>
              <p>
                Email: maxim06122000@mail.ru <br />
                We work from 9:00 to 21:00 daily. Weekends and holidays support
                service is not working
              </p>
              <p>
                <a href="https://vk.com/id156594073">
                  <i className="fab fa-vk fa-2x" />
                </a>
                <a href="https://www.instagram.com/maxim_sukhodolets/">
                  <i className="fab fa-instagram fa-2x" />
                </a>
              </p>
            </div>
            <div className="col-xl-5 right">
              <p>
                Delivery in Russia is carried out by delivery services: “Post of
                Russia". "Post of Russia delivers to the postaloffices, the
                index of which you specify when ordering.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
