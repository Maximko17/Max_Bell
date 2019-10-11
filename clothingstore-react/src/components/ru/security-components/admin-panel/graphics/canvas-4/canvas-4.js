import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CanvasJSReact from "../../../../../../assets/canvasjs.react";
import { getWeekOnline } from "../../../../../../action/admin-actions";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Canvas4 extends Component {
  componentDidMount() {
    this.props.getWeekOnline();
  }
  render() {
    const { week_online } = this.props;
    const dataPoints = [];
    if (week_online[0] == undefined) {
    } else {
      dataPoints.push(
        { label: "Mon", y: week_online[0] },
        { label: "Tue", y: week_online[1] },
        { label: "Wed", y: week_online[2] },
        { label: "Thu", y: week_online[3] },
        { label: "Fri", y: week_online[4] },
        { label: "Sat", y: week_online[5] },
        { label: "Sun", y: week_online[6] }
      );
    }
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", //"light1", "dark1", "dark2"
      title: {
        text: "Онлайн за неделю"
      },
      data: [
        {
          type: "column", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: dataPoints
        }
      ]
    };

    return (
      <div className="mt-5">
        <CanvasJSChart
          options={options}
          // onRef={ref => (this.chart = ref)}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

Canvas4.propTypes = {
  week_online: PropTypes.array.isRequired,
  getWeekOnline: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  week_online: state.admin.week_online
});

export default connect(
  mapStateToProps,
  { getWeekOnline }
)(Canvas4);
