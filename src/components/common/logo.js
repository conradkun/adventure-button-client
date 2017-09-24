import React, {Component} from 'react';
import Box from "grommet/components/Box";
import Title from "grommet/components/Title";

export default class Logo extends Component {
  render() {
    /**
        return (
        <div className="logo-svg-wrapper">
            <svg height="60" width="220" xmlns="http://www.w3.org/2000/svg">
                <rect className="logo-shape" height="60" width="220" />

            </svg>
            <div className="logo-text">BAREMIO</div>
        </div>
        )
      **/
    let text = this.props.text || false;
    let title = undefined;
    if(text) {
      title = "Easy Scale"
    }
    let color = this.props.color || "#0A64A0";
    let margin = this.props.margin || "20px";
    let multiplier = this.props.multiplier || 1;
    let height = multiplier * 350;
    let width = multiplier * 300;
    return (
    <Box align='center'>
      <svg viewBox="0 0 600.44 693.33331" height={height} width={width} id="svg2" version="1.1">
        <g transform="matrix(1.3333333,0,0,-1.3333333,0,693.33333)" id="g10">
          <g transform="scale(0.1)" id="g12"><path id="path14" style={{fill: color, fillOpacity: "1", fillRule: "nonzero", stroke: "none"}} d="M 3285.64,3351.59 4101.52,3822.65 2251.65,4890.69 401.797,3822.65 1217.68,3351.64 2251.65,3948.61 Z M 1351.59,3119.65 v -881.2 l 900.06,535.11 900.09,-535.11 v 881.2 l -900.09,519.65 z m 131.01,-1114.96 769.05,-444 769.09,444 -769.09,457.26 z M 267.852,1454.64 2251.65,309.309 4235.47,1454.64 V 3590.63 L 3419.59,3119.61 V 1925.69 l -1167.94,-674.3 -1167.91,674.3 V 3119.61 L 267.852,3590.63 Z M 0,1299.98 v 2600 L 2251.65,5200 4503.32,3899.98 v -2600 L 2251.65,0 0,1299.98"/></g>
        </g>"20px";
      </svg>
      {text ? <h2 style={{
        margin: margin,
        textTransform: "uppercase"
      }}>{title}</h2> : undefined}
    </Box>
    )
  }
}
