import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CanvasJSReact from "../../../../../../assets/canvasjs.react";
import { getLast10DaysPriceStat } from "../../../../../../action/admin-actions";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

var dataPoints = [];
class Canvas3 extends Component {
  componentDidMount() {
    this.props.getLast10DaysPriceStat();
  }
  render() {
    const { day_price } = this.props;
    if (day_price[0] == undefined) {
      console.log("");
    } else {
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 4; j++) {
          if (day_price[i][0] == null) {
            continue;
          }
          dataPoints.push({
            x: new Date(day_price[i][3], day_price[i][2] - 1, day_price[i][1]),
            y: day_price[i][0]
          });
        }
      }
    }

    const options = {
      theme: "light2",
      title: {
        text: "Сумма продаж за последнии 10 дней"
      },
      axisY: {
        title: "Цена в рублях",
        prefix: "₽",
        includeZero: false
      },
      data: [
        {
          type: "line",
          xValueFormatString: "MMM YYYY",
          yValueFormatString: "₽#,##0.00",
          dataPoints: dataPoints
        }
      ]
    };
    return (
      <div className="mt-5">
        <CanvasJSChart options={options} onRef={ref => (this.chart = ref)} />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

Canvas3.propTypes = {
  day_price: PropTypes.array.isRequired,
  getLast10DaysPriceStat: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  day_price: state.admin.day_price
});

export default connect(
  mapStateToProps,
  { getLast10DaysPriceStat }
)(Canvas3);
