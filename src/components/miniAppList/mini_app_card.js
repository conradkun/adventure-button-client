import React from 'react'
import Card from 'grommet/components/Card';
import AppSettings from '../../utils/app_settings';
import {withRouter} from "react-router-dom";

const MiniAppCard = (props) => {
  let link = `app/b/${props.miniApp.code}`;
  let basis = 'medium';
  let margin = {
    top: 'large'
  }
  if(props.responsive === 'single'){
    basis = 'full'
    margin = {
      ...margin,
      horizontal: 'large'
    }
  }
  return (
        <Card
              margin={margin}
              basis={basis}
              responsive={false}
              key={props.miniApp.name}
              className="better_card"
              heading={props.miniApp.name}
              colorIndex={AppSettings.cardColor}
              onClick={()=>{
                props.history.push(link);
              }}
        />

  );
}

export default withRouter(MiniAppCard);
