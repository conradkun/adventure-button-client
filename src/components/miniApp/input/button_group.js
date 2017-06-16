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
      if(this.state.selected === o.value){
        classes = classes + " btngroup--btn--active";
      }
      return(
        <div className={classes} onClick={()=>{
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
