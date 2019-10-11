import React, { Component } from "react";

const createCaptcha = set_valid_capctha => {
  //clear the contents of captcha div first
  document.getElementById("captcha").innerHTML = "";
  var charsArray =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
  var lengthOtp = 6;
  var captcha = [];
  for (var i = 0; i < lengthOtp; i++) {
    //below code will not allow Repetition of Characters
    var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
    if (captcha.indexOf(charsArray[index]) == -1)
      captcha.push(charsArray[index]);
    else i--;
  }
  var canv = document.createElement("canvas");
  canv.id = "captcha";
  canv.width = 180;
  canv.height = 40;
  var ctx = canv.getContext("2d");
  ctx.font = "40px Georgia";
  ctx.strokeText(captcha.join(""), 0, 30);
  //storing captcha so that can validate you can save it somewhere else according to your specific requirements
  set_valid_capctha(captcha.join(""));
  document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
};

export { createCaptcha };

export default class Captcha extends Component {
  componentDidMount() {
    createCaptcha(this.props.set_valid_capctha);
  }

  render() {
    return (
      <div>
        <div id="captcha" />
        <div className="input-group mb-3">
          <input
            type="text"
            name="captcha"
            className="form-control"
            placeholder="Enter the characters from the image"
            id="cpatchaTextBox"
            aria-describedby="refresh-button"
            onChange={this.props.set_current_captcha}
            value={this.props.currentCaptcha}
          />

          <div className="input-group-append">
            <button
              type="button"
              onClick={() => createCaptcha(this.props.set_valid_capctha)}
              id="refresh-button"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>
    );
  }
}
