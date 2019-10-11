import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CanvasJSReact from "../../../../../../assets/canvasjs.react";
import {
  getTopClothesNames,
  getTopClothesLikes
} from "../../../../../../action/admin-actions";
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Canvas1 extends Component {
  componentDidMount() {
    this.props.getTopClothesLikes();
    this.props.getTopClothesNames();
  }
  render() {
    const { top_names, top_likes } = this.props;
    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", //"light1", "dark1", "dark2"
      title: {
        text: "Самые популярные вещи"
      },
      data: [
        {
          type: "column", //change type to bar, line, area, pie, etc
          //indexLabel: "{y}", //Shows y value on all Data Points
          indexLabelFontColor: "#5A5757",
          indexLabelPlacement: "outside",
          dataPoints: [
            { label: top_names[0], y: top_likes[0] },
            { label: top_names[1], y: top_likes[1] },
            { label: top_names[2], y: top_likes[2] },
            { label: top_names[3], y: top_likes[3] }
          ]
        }
      ]
    };

    return (
      <div>
        <CanvasJSChart
          options={options}
          // onRef={ref => (this.chart = ref)}
        />
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    );
  }
}

Canvas1.propTypes = {
  top_names: PropTypes.array.isRequired,
  top_likes: PropTypes.array.isRequired,
  getTopClothesLikes: PropTypes.func.isRequired,
  getTopClothesNames: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  top_names: state.admin.top_names,
  top_likes: state.admin.top_likes
});

export default connect(
  mapStateToProps,
  { getTopClothesNames, getTopClothesLikes }
)(Canvas1);
