import React from 'react'
import Box from 'grommet/components/Box';
import ButtonGroup from './button_group';

class RegionSelect extends React.Component {
  render () {
    return(
    <Box flex={true} align='center'>
      <ButtonGroup options={[
          {
            label: "Wallonie",
            value: "wallonie"
          },
          {
            label: "Flandre",
            value: "flandre"
          },
          {
            label: "Bruxelles",
            value: "bruxelles"
          }
        ]}
        small={this.props.small}
        xsmall={this.props.xsmall}
        defaultValue={this.props.client.get('preferredRegion')}
        onSelect={(v)=>{
          this.props.onSelect(v);
          this.props.client.set('preferredRegion', v);
          window.localStorage.setItem('preferredRegion', v);
        }}
      />
  </Box>)
  }
}

export default RegionSelect;
