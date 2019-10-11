import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CanvasJSReact from "../../../../../../assets/canvasjs.react";
import { getTopClothesTypes } from "../../../../../../action/admin-actions";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Canvas2_en extends Component {
  componentDidMount() {
    this.props.getTopClothesTypes();
  }
  render() {
    const { top_types } = this.props;
    const dataPoints = [];
    if (top_types[0] == undefined) {
    } else {
      dataPoints.push(
        { label: top_types[0].split(",")[0], y: +top_types[0].split(",")[1] },
        { label: top_types[1].split(",")[0], y: +top_types[1].split(",")[1] }
        // { label: top_types[2].split(",")[0], y: top_types[2].split(",")[1] },
        // { label: top_types[3].split(",")[0], y: top_types[3].split(",")[1] }
      );
    }
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", //"light1", "dark1", "dark2"
      title: {
        text: "The most popular clothes types"
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

Canvas2_en.propTypes = {
  top_types: PropTypes.array.isRequired,
  getTopClothesTypes: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  top_types: state.admin.top_types
});

export default connect(
  mapStateToProps,
  { getTopClothesTypes }
)(Canvas2_en);
