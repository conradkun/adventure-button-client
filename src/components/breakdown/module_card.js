import React, { Component } from 'react'
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Drag from 'grommet/components/icons/base/Drag';
import Close from 'grommet/components/icons/base/Close';
import Value from 'grommet/components/Value';
import Label from 'grommet/components/Label';
import AppSettings from '../../utils/app_settings'
import currencyFormatter from 'currency-formatter';

import {
    SortableElement,
    SortableHandle
  } from 'react-sortable-hoc';


const DragHandle = SortableHandle(() => <Anchor icon={<Drag />}/>);

export class ModuleCard extends Component {
    render () {
        let module = this.props.module
        return(
          <Box responsive={false} margin='medium' pad='small' direction='row' align='center' justify='between' className="drop-shadow" colorIndex='light-1'>
            <DragHandle />
            <Label>{module.label}</Label>
            <Value value={currencyFormatter.format(module.value, AppSettings.currencyOptionFormater)}
                units='€'
                size='small'
                colorIndex={module.value > 0 ? 'neutral-1' : 'ok'} />
            <Anchor icon={<Close />}
              onClick={()=>{
                this.props.onDeleteItem(module.id);
              }}
              />
          </Box>
        )
    }
}

export default SortableElement(ModuleCard)
