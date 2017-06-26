import React from 'react'

class ButtonGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.defaultValue
    }
  }
  render () {
    let buttons = this.props.options.map((o)=>{
      let classes = "btngroup--btn";
      if(this.props.small){
        classes += " btngroup--btn--small";
      }
      if(this.state.selected === o.value){
        classes = classes + " btngroup--btn--active";
      }
      return(
        <div key={o.value} className={classes} onClick={(e)=>{
          e.cancelBubble = true;
          if (e.stopPropagation) e.stopPropagation();
          this.setState({
            selected: o.value
          });
          this.props.onSelect(o.value);
        }}>{o.label}</div>
      )
    });
    return(
      <span className="btngroup">
        {buttons}
      </span>
    );
  }
}

export default ButtonGroup;
