import React, { Component } from "react";
import "./admin-panel.css";
import Canvas1 from "./graphics/canvas-1/canvas-1";
import Users from "./users/users";
import Orders from "./orders/orders";
import Clothes from "./clothes/clothes";
import Canvas2 from "./graphics/canvas-2/canvas-2";
import Canvas3 from "./graphics/canvas-3/canvas-3";
import Сanvas4 from "./graphics/canvas-4/canvas-4";
import ReviewReports from "./review-reports/review-reports";

class AdminPanel extends Component {
  state = {
    active: 0
  };

  onClick = numb => {
    this.setState({
      active: numb
    });
  };
  render() {
    const { active } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-2 admin-buttons">
            <div className="list-group">
              <button
                type="button"
                className={
                  active === 0 ? "list-group-item active" : "list-group-item "
                }
                onClick={() => this.onClick(0)}
              >
                Статистика сайта
              </button>
              <button
                type="button"
                className={
                  active === 1 ? "list-group-item active" : "list-group-item "
                }
                onClick={() => this.onClick(1)}
              >
                Список пользователей
              </button>
              <button
                type="button"
                className={
                  active === 2 ? "list-group-item active" : "list-group-item "
                }
                onClick={() => this.onClick(2)}
              >
                Список заказов
              </button>
              <button
                type="button"
                className={
                  active === 3 ? "list-group-item active" : "list-group-item "
                }
                onClick={() => this.onClick(3)}
              >
                Список одежды
              </button>
              <button
                type="button"
                className={
                  active === 4 ? "list-group-item active" : "list-group-item "
                }
                onClick={() => this.onClick(4)}
              >
                Жалобные отзывы
              </button>
            </div>
          </div>
          <div className="col-xl-7 col-lg-10 content">
            {active === 0 ? <Canvas1 /> : null}
            {active === 0 ? <Canvas2 /> : null}
            {active === 0 ? <Canvas3 /> : null}
            {active === 0 ? <Сanvas4 /> : null}
            {active === 1 ? <Users /> : null}
            {active === 2 ? <Orders /> : null}
            {active === 3 ? <Clothes /> : null}
            {active === 4 ? <ReviewReports /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPanel;
