import React, { Component } from "react";
import "./footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div>
        <div className="container-fluid footer-bg1 pt-3">
          <div className="row justify-content-md-center">
            <div className="col-xl-5 left">
              <p>
                <b>Служба поддержки</b>
              </p>
              <b>---</b>
              <p>
                Почта: maxim06122000@mail.ru <br />
                Работаем с 9:00 до 21:00 ежедневно. В выходные и праздничные дни
                служба поддержки не работает
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
                Доставка по России осуществляется службами доставки:«Почта
                России». «Почта России» осуществляет доставку до почтового
                отделения, индекс которого вы укажете при оформлении заказа.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
