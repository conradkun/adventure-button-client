import React, {Component} from 'react';
import Box from 'grommet/components/Box';
import Header from 'grommet/components/Header';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import AppSettings from '../utils/app_settings';
import Spinner from 'react-spinkit';
import MenuIcon from 'grommet/components/icons/base/Menu';
import Search from 'grommet/components/Search';
import {
  SortableContainer,
  SortableElement,
  SortableHandle,
  arrayMove,
} from 'react-sortable-hoc';


const DragHandle = SortableHandle(() => <span>::</span>); // This can be any component you want

const SortableItem = SortableElement(({value}) => {
  return (
    <Box margin='medium' className="drop-shadow" colorIndex='light-1'>
      <DragHandle />
      {value}
    </Box>
  );
});

const SortableList = SortableContainer(({items}) => {
  return (
    <ul>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value} />
      ))}
    </ul>
  );
});

class SortableComponent extends Component {
  state = {
    items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6'],
  };
  onSortEnd = ({oldIndex, newIndex}) => {
    let {items} = this.state;

    this.setState({
      items: arrayMove(items, oldIndex, newIndex),
    });
  };
  render() {
    let {items} = this.state;

    return <SortableList lockAxis='y' items={items} onSortEnd={this.onSortEnd} useDragHandle={true} />;
  }
}


class Breakdown extends Component {

    constructor(props) {
        super(props);

        this._load = this._load.bind(this);

        this.state = {
          isLoading: false,
        }
    }

    componentDidMount() {
      this._load();
    }

    _load() {
    }

    _renderContent() {
      return (
          <Box basis='full' margin='large'>
            <SortableComponent/>
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
      let search;
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
      search = (<Search inline={true} fill={true} size='medium' placeHolder='Rechercher' defaultValue={this.state.searchString} dropAlign={{
        "right": "right"
      }} onDOMChange={(e) => {
        this.setState({searchString: e.target.value})
      }}/>);
      return (
        <Header size='small' className="drop-shadow-bottom" colorIndex={colorIndex} fixed={true}>
          {appLogo}
          <Box flex={true} justify={justify} pad="small" direction='row' responsive={false}>
            {title}
            {mobileButton}
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
