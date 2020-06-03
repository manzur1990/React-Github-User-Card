import React from 'react';
import axios from 'axios';
import './App.css';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      profile: [],
      following: [],

    }
  }

  componentDidMount() {
    axios.get("https://api.github.com/users/manzur1990")
      .then(res => {
        this.setState({
          profile: res.data
        })
      })
    axios.get(`https://api.github.com/users/manzur1990/following`)
      .then(res => {
        this.setState({
          following: res.data
        })
      })
      .catch(error => {
        console.log("the data was not returned", error)
      })
  }


  render() {

    return (
      <div className="container">
        <div className="header">
          <h1>My Github Profile</h1>
        </div>
        <div className="card">
          <img src={this.state.profile.avatar_url} alt={this.state.profile.id} />
          <div className="content">
            <h3 className="name">{this.state.profile.name}</h3>
            <p className="username">{this.state.profile.login}</p>
            <p>Bio: {this.state.profile.bio}</p>
            <p>Location: {this.state.profile.location}</p>
            <p>Checkout my profile:
                <a href={this.state.profile.html_url}>{this.state.profile.html_url}</a>
            </p>
          </div>
        </div>

        <div className="following">
          {this.state.following.map(user => (
            <div key={user.id}>
              <div className="card">
                <img src={user.avatar_url} alt={user.id} />
                <div className="content">
                  <h3 className="name">{user.name}</h3>
                  <p className="username">{user.login}</p>
                  <p>Profile:
                <a href={user.html_url}>{user.html_url}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default App;