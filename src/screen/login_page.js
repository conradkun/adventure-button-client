import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "../components/login/login_form";
import Box from "grommet/components/Box";
import Layer from "grommet/components/Layer";
import Image from "grommet/components/Image";
import Logo from "../components/common/logo";
import Fade from "react-fade";
import backgroundImg from "../ressources/background.jpeg";
import Responsive from "grommet/utils/Responsive";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this._onResponsive = this._onResponsive.bind(this);
    this.state = {
      errors: [],
      mobile: false
    };
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this._onResponsive.stop();
  }

  _onResponsive(mobile) {
    this.setState({ mobile });
  }

  componentDidMount() {
    this._onResponsive = Responsive.start(this._onResponsive);

    if (this.props.offline) {
      this.setState({
        errors: [
          "Vous êtes Offline, connectez vous au moins une fois pour accéder à l'application"
        ]
      });
    }
  }

  _handleSubmit(info) {
    if (!this.props.offline) {
      const client = this.props.client;
      client
        .authenticate({
          strategy: "local",
          email: info.username,
          password: info.password
        })
        .then(response => {
          return client.passport.getJWT();
        })
        .then(token => {
          return client.passport.verifyJWT(token);
        })
        .then(payload => {
          return client.service("users").get(payload.userId);
        })
        .then(user => {
          client.set("user", user);
          let preferredRegion = window.localStorage.getItem("preferredRegion");
          if (!preferredRegion) {
            //DEFAULT PREFERRED REGION
            preferredRegion = "wallonie";
          }
          client.set("preferredRegion", preferredRegion);
          //Save user to localStorage
          let userParsed = JSON.stringify(user);
          window.localStorage.setItem("user", userParsed);
          if (user.role !== "admin") {
            const organisation = client.service("organisation");
            organisation.get(user.organisation).then(o => {
              client.set("organisation", o);
              //Save organisation to localStorage
              let organisationParsed = JSON.stringify(o);
              window.localStorage.setItem("organisation", organisationParsed);
              this.props.history.push("/app");
            });
          } else {
            this.props.history.push("/app/admin");
          }
        })
        .catch(error => {
          if (error.code === 404) {
            client.logout();
            this.setState({
              errors: ["Cet utilisateur n'existe pas (ou plus)"]
            });
          } else {
            this.setState({
              errors: [
                "Une erreur est survenue, veuillez vérifier vos informations de connection"
              ]
            });
          }
        });
    }
  }

  render() {
    return (
      <Box
        size="full"
        basis="full"
        direction="row"
        flex={true}
        justify="between"
      >
        {!this.state.mobile ? (
          <Box direction="row" basis="2/3" className="no-margin">
            <Image
              style={{
                width: "auto",
                height: "auto",
                minWidth: "100%",
                minHeight: "100%",
                objectFit: "cover"
              }}
              src={backgroundImg}
            />
          </Box>
        ) : null}
        <Box
          direction="row"
          basis="1/3"
          className="no-margin"
          justify="center"
          align="center"
        >
          <LoginForm
            logo={<Logo multiplier={0.5} text={true} />}
            align="center"
            errors={this.state.errors}
            onSubmit={this._handleSubmit.bind(this)}
          />
        </Box>
      </Box>
    );
  }
}
export default withRouter(LoginPage);
