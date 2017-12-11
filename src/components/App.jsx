import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import UserList from "./UserList";
import User from "./User";
import api from "../api";
import ErrorBoundary from "./ErrorBoundary";

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    if (!this.props.users) this.getPage();
  }

  getPage(url) {
    api
      .getPage(url)
      .then(resp => {
        this.setState({
          users: resp.result,
          previousPageUrl: resp.previousPageUrl,
          nextPageUrl: resp.nextPageUrl
        });
      })
      .catch(err => this.setState({ loadListError: err.message }));
  }

  switchPage(nextOrPrevious) {
    this.getPage(this.state[nextOrPrevious + "PageUrl"]);
  }

  render() {
    return (
      <ErrorBoundary>
        <div className="app">
          <Switch>
            <Route
              path="/"
              exact
              render={() =>
                this.state.loadListError ? (
                  "Could not load users"
                ) : (
                  <UserList
                    users={this.state.users}
                    previousPageUrl={this.state.previousPageUrl}
                    nextPageUrl={this.state.nextPageUrl}
                    switchPage={this.switchPage.bind(this)}
                  />
                )
              }
            />
            <Route path="/:userId" exact component={User} />
            <Redirect to="/" />
          </Switch>
        </div>
      </ErrorBoundary>
    );
  }
}
