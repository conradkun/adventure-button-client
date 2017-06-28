import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import AppSettings from '../utils/app_settings';
import Spinner from 'react-spinkit';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Add from 'grommet/components/icons/base/Add';
import Close from 'grommet/components/icons/base/Close';
import Search from 'grommet/components/Search';
import Drag from 'grommet/components/icons/base/Drag';
import Robot from 'grommet/components/icons/base/Robot';
import FlipMove from 'react-flip-move';
import Pulse from 'grommet/components/icons/Pulse';
import Tip from 'grommet/components/Tip';


import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';


const DragHandle = SortableHandle(() => <Anchor icon={<Drag />}/>); // This can be any component you want

class SortableItemClass extends React.Component {
  render () {
    return(
      <Box responsive={false} margin='medium' pad='small' direction='row' align='center' justify='between' className="drop-shadow" colorIndex='light-1'>
        <DragHandle />
        {this.props.value}
        <Anchor icon={<Close />}
          onClick={()=>{
            this.props.onDeleteItem(this.props.value);
          }}
          />
      </Box>
    )
  }
}


const SortableItem = SortableElement(SortableItemClass);

const SortableList = SortableContainer(({items, onDeleteItem}) => {
  return (
    <div>
      <FlipMove staggerDelayBy={150} appearAnimation="accordionVertical" enterAnimation='fade' leaveAnimation={false} duration={750}
        easing="ease-out">
        {items.map((value, index) => (
          <SortableItem key={`item-${index}`} index={index} onDeleteItem={onDeleteItem} value={value} />
        ))}
      </FlipMove>
    </div>
  );
});

class Breakdown extends Component {

    constructor(props) {
        super(props);

        this._load = this._load.bind(this);

        this.state = {
          isLoading: false,
          items: ['Item 1', 'Item 2', 'Item 3'],
          i: 4
        }
    }

    componentDidMount() {
      this._load();
    }

    onSortEnd = ({oldIndex, newIndex}) => {
      let {items} = this.state;

      this.setState({
        items: arrayMove(items, oldIndex, newIndex),
      });
    };

    onDeleteItem = (id) => {
      this.setState({
        items: this.state.items.filter((i)=>{return i !== id}),

      })
    }

    _load() {
    }

    _renderContent() {
      let {items} = this.state;
      return (

            <Box size='full' margin='large' basis='full' direction='row' flex={true} justify='between'>
              <Box direction='column' basis='1/2' className='no-margin'>
                <SortableList lockAxis='y' items={items} onDeleteItem={this.onDeleteItem} onSortEnd={this.onSortEnd} lockToContainerEdges={true} useDragHandle={true} />
                <Box basis='full' align='center'>
                  <Button 
                    icon={<Add style={{stroke :'#FFF'}}/>}
                    className='better_button animate-all'
                    onClick={()=>{
                      let items = this.state.items;
                      items.push('Item ' + this.state.i)
                      this.setState({
                        items: items,
                        i: this.state.i + 1
                      })
                    }}
                    primary={true}
                    />
                </Box>
              </Box>
              <Box basis='1/2' margin='medium' className='drop-shadow' justify='center' align='center' colorIndex={AppSettings.cardColor}>Hey</Box>
            </Box>
      )
  }

    _renderHeader() {

      let appLogo;
      let title = (
        <Title pad='small' responsive={true}>
          <Box align='center' direction='row'>
            <span>Décompte</span>
          </Box>
        </Title>
      );
      let mobileButton;
      let colorIndex = 'light-1';
      let justify = 'between';
      if ('single' === this.props.responsive) {
        justify = 'end';
        appLogo = this.props.renderAppLogo();
        colorIndex = AppSettings.mainColor;
        mobileButton = (
          <Anchor icon={< MenuIcon />} onClick={this.props.onMenuOpen}></Anchor>
        );
      }
      return (
        <Header size='small' className="drop-shadow-bottom" colorIndex={colorIndex} fixed={true}>
          {appLogo}
          <Box flex={true} justify={justify} pad="small" margin={{right: 'medium'}} direction='row' responsive={false}>
            {title}
            {mobileButton}
            {this.state.hasTemplate && <Pulse id='actions' icon={<Robot style={{stroke: '#000'}}/>} />}
          </Box>
        </Header>
      );
    }

    render() {
      let loader = (
        <Box margin='large' direction='column' align='center' justify='center' alignContent='center'>
          <Spinner spinnerName="double-bounce"/>
        </Box>
      );
      return (
        <Box full='vertical' colorIndex={AppSettings.backgroundColor}>
          {this._renderHeader()}
          {this.state.isLoading
            ? loader
            : this._renderContent()}
        </Box>
      )
    }

}


export default Breakdown;
