import React, { Component } from "react";
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import Header from "grommet/components/Header";
import Anchor from "grommet/components/Anchor";
import Title from "grommet/components/Title";
import AppSettings from "../utils/app_settings";
import Spinner from "react-spinkit";
import MenuIcon from "grommet/components/icons/base/Menu";
import Add from "grommet/components/icons/base/Add";
import Close from "grommet/components/icons/base/Close";
import Search from "grommet/components/Search";
import Drag from "grommet/components/icons/base/Drag";
import Robot from "grommet/components/icons/base/Robot";
import FlipMove from "react-flip-move";
import Pulse from "grommet/components/icons/Pulse";
import Tip from "grommet/components/Tip";
import ModuleCard from "../components/breakdown/module_card";
import { miniApps } from "../miniApps";

import { SortableContainer, arrayMove } from "react-sortable-hoc";

const ModulesList = SortableContainer(({ moduleCards, onDeleteItem }) => {
  return (
    <div>
      <FlipMove
        staggerDelayBy={150}
        appearAnimation="accordionVertical"
        enterAnimation="fade"
        leaveAnimation={false}
        duration={750}
        easing="ease-out"
      >
        {moduleCards.map((module, index) => (
          <ModuleCard
            key={`item-${index}`}
            index={index}
            onDeleteItem={onDeleteItem}
            module={module}
          />
        ))}
      </FlipMove>
    </div>
  );
});

class Breakdown extends Component {
  constructor(props) {
    super(props);

    this.client = this.props.client;
    this.savesClient = this.client.service("saves");

    this._load = this._load.bind(this);
    this._generateModuleCards = this._generateModuleCards.bind(this);

    this.state = {
      isLoading: false,
      modules: [
        {
          type: "static",
          saveId: undefined,
          label: "Succesion",
          value: 25000
        },
        {
          type: "dynamic",
          saveId: "iX3oGImEPTN7HdFO",
          label: "Damn",
          value: 25000
        }
      ],
      moduleCards: [],
      hasTemplate: false
    };
  }

  componentDidMount() {
    this._load();
  }

  _getMiniApp(code) {
    let miniApp = undefined;
    miniApps.forEach(ma => {
      if (ma.code === code) {
        miniApp = ma;
      }
    });
    return miniApp;
  }

  _computeModuleSum(series) {
    let sum = 0;
    series.forEach(s => {
      sum += s.value;
    });
    return sum;
  }

  _generateModuleCards() {
    let { modules } = this.state;
    let promises = modules.map(module => {
      if (module.type === "static") {
        return new Promise(function(resolve, reject) {
          resolve({
            id: `${module.label}-${module.value}`,
            label: module.label,
            value: module.value
          });
        });
      } else if (module.type === "dynamic" && module.saveId) {
        return this.savesClient.get(module.saveId).then(response => {
          let save = response;
          return {
            id: `${module.label}-${module.saveId}`,
            label: this._getMiniApp(save.miniAppCode).name,
            value: this._computeModuleSum(save.result)
          };
        });
      }
    });
    Promise.all(promises)
    .then((data) => {
      this.setState({
        moduleCards: data
      });
    })
  }

  _onSortEnd = ({ oldIndex, newIndex }) => {
    let { modules, moduleCards } = this.state;

    this.setState({
      modules: arrayMove(modules, oldIndex, newIndex),
      moduleCards: arrayMove(moduleCards, oldIndex, newIndex)
    });
  };

  onDeleteItem = id => {
    this.setState({
      moduleCards: this.state.moduleCards.filter(i => {
        return i !== id;
      })
    });
  };

  _load() {
    this._generateModuleCards();
  }

  _renderContent() {
    let { moduleCards } = this.state;
    return (
      <Box
        size="full"
        margin="small"
        basis="full"
        direction="row"
        flex={true}
        justify="between"
      >
        <Box direction="column" basis="1/2" className="no-margin">
          <ModulesList
            lockAxis="y"
            moduleCards={moduleCards}
            onDeleteItem={this.onDeleteItem}
            onSortEnd={this._onSortEnd}
            lockToContainerEdges={true}
            useDragHandle={true}
          />
          <Box basis="full" align="center">
            <Button
              icon={<Add style={{ stroke: "#FFF" }} />}
              className="better_button animate-all"
              onClick={() => {
                let moduleCards = this.state.moduleCards;
                moduleCards.push("Item " + this.state.i);
                this.setState({
                  moduleCards: moduleCards,
                  i: this.state.i + 1
                });
              }}
              primary={true}
            />
          </Box>
        </Box>
        <Box
          basis="1/2"
          margin="medium"
          className="drop-shadow"
          justify="center"
          align="center"
          colorIndex={AppSettings.cardColor}
        >
          Hey
        </Box>
      </Box>
    );
  }

  _renderHeader() {
    let appLogo;
    let title = (
      <Title pad="small" responsive={true}>
        <Box align="center" direction="row">
          <span>Décompte</span>
        </Box>
      </Title>
    );
    let mobileButton;
    let colorIndex = "light-1";
    let justify = "between";
    if ("single" === this.props.responsive) {
      justify = "end";
      appLogo = this.props.renderAppLogo();
      colorIndex = AppSettings.mainColor;
      mobileButton = (
        <Anchor icon={<MenuIcon />} onClick={this.props.onMenuOpen} />
      );
    }
    return (
      <Header
        size="small"
        className="drop-shadow-bottom"
        colorIndex={colorIndex}
        fixed={true}
      >
        {appLogo}
        <Box
          flex={true}
          justify={justify}
          pad="small"
          margin={{ right: "medium" }}
          direction="row"
          responsive={false}
        >
          {title}
          {mobileButton}
          {this.state.hasTemplate && (
            <Pulse id="actions" icon={<Robot style={{ stroke: "#000" }} />} />
          )}
        </Box>
      </Header>
    );
  }

  render() {
    let loader = (
      <Box
        margin="large"
        direction="column"
        align="center"
        justify="center"
        alignContent="center"
      >
        <Spinner spinnerName="double-bounce" />
      </Box>
    );
    return (
      <Box full="vertical" colorIndex={AppSettings.backgroundColor}>
        {this._renderHeader()}
        {this.state.isLoading ? loader : this._renderContent()}
      </Box>
    );
  }
}

export default Breakdown;
