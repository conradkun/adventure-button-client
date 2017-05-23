import React, {Component} from 'react';

export default class Logo extends Component{
    render(){
        return (
        <div className="logo-svg-wrapper">
            <svg height="60" width="320" xmlns="http://www.w3.org/2000/svg">
                <rect className="logo-shape" height="60" width="320" />

            </svg>
            <div className="logo-text">Projet Barème</div>
        </div>
        )
    }
}