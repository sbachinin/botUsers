import React from "react";
import api from "../api";
import { Link } from "react-router-dom";
import BackArrow from "svg-react-loader?name=Icon!./ic_arrow_back.svg";

export default class User extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };
  }

  componentWillMount() {
    api
      .getUser(this.props.match.params.userId)
      .then(user => this.setState({ user }))
      .catch(error => this.setState({ user: null, error: error.message }));
  }

  changeName(e) {
    this.setState({
      user: { ...this.state.user, name: e.target.value }
    });
  }

  handleKeyDown(e) {
    if (e.which === 13 && this.state.user.name) {
      this.refs.input.blur();
      api.updateUserName(this.state.user);
    }
  }

  render() {
    const error =
      typeof this.state.error === "string" ? this.state.error : "No such user";
    return (
      <div>
        <Link to="/">
          <BackArrow className="backArrow" />
        </Link>
        {this.state.user
          ? [
              <img key={1} src={this.state.user.avatarUrl} alt="" />,
              <br key={2} />,
              <input
                key={3}
                type="text"
                ref="input"
                required
                value={this.state.user.name || ""}
                onChange={this.changeName.bind(this)}
                onKeyDown={this.handleKeyDown.bind(this)}
              />
            ]
          : error}
      </div>
    );
  }
}
