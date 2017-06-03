import React, {Component} from 'react';

export default class Logo extends Component{
    render(){
        return (
        <div className="logo-svg-wrapper">
            <svg height="60" width="220" xmlns="http://www.w3.org/2000/svg">
                <rect className="logo-shape" height="60" width="220" />

            </svg>
            <div className="logo-text">BAREMIO</div>
        </div>
        )
    }
}
