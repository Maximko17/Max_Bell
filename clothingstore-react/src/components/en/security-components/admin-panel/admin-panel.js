import React, { Component } from "react";
import Canvas1_en from "./graphics/canvas-1/canvas-1";
import Users_en from "./users/users";
import Orders_en from "./orders/orders";
import Clothes_en from "./clothes/clothes";
import Canvas2_en from "./graphics/canvas-2/canvas-2";
import Canvas3_en from "./graphics/canvas-3/canvas-3";
import Сanvas4_en from "./graphics/canvas-4/canvas-4";
import ReviewReports_en from "./review-reports/review-reports";

class AdminPanel_en extends Component {
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
                Site statistics
              </button>
              <button
                type="button"
                className={
                  active === 1 ? "list-group-item active" : "list-group-item "
                }
                onClick={() => this.onClick(1)}
              >
                User list
              </button>
              <button
                type="button"
                className={
                  active === 2 ? "list-group-item active" : "list-group-item "
                }
                onClick={() => this.onClick(2)}
              >
                Order list
              </button>
              <button
                type="button"
                className={
                  active === 3 ? "list-group-item active" : "list-group-item "
                }
                onClick={() => this.onClick(3)}
              >
                Clothing list
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
            {active === 0 ? <Canvas1_en /> : null}
            {active === 0 ? <Canvas2_en /> : null}
            {active === 0 ? <Canvas3_en /> : null}
            {active === 0 ? <Сanvas4_en /> : null}
            {active === 1 ? <Users_en /> : null}
            {active === 2 ? <Orders_en /> : null}
            {active === 3 ? <Clothes_en /> : null}
            {active === 4 ? <ReviewReports_en /> : null}
          </div>
        </div>
      </div>
    );
  }
}

export default AdminPanel_en;
