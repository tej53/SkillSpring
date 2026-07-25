import React, { Component } from 'react';

// LAB REQUIREMENT: Class Component with ComponentDidMount() lifecycle method
// to fetch data from https://api.randomuser.me/ REST API
class Getuser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      firstname: '',
      image: '',
      email: '',
      phone: '',
      loading: true,
      error: null,
    };
  }

  // Asynchronous ComponentDidMount lifecycle method to invoke the URL using fetch
  async componentDidMount() {
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const user = data.results[0];

      this.setState({
        title: user.name.title,
        firstname: user.name.first,
        lastname: user.name.last,
        image: user.picture.large,
        email: user.email,
        phone: user.phone,
        location: `${user.location.city}, ${user.location.country}`,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: 'Failed to fetch user data. Please try again.',
        loading: false,
      });
    }
  }

  // Handler to fetch a new random user
  fetchNewUser = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch('https://randomuser.me/api/');
      const data = await response.json();
      const user = data.results[0];

      this.setState({
        title: user.name.title,
        firstname: user.name.first,
        lastname: user.name.last,
        image: user.picture.large,
        email: user.email,
        phone: user.phone,
        location: `${user.location.city}, ${user.location.country}`,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: 'Failed to fetch user data. Please try again.',
        loading: false,
      });
    }
  };

  // Render method to display the response data
  render() {
    const { title, firstname, lastname, image, email, phone, location, loading, error } = this.state;

    if (loading) {
      return (
        <div className="card loading-card">
          <div className="spinner"></div>
          <p>Fetching random user from REST API...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="card error-card">
          <p className="error-text">❌ {error}</p>
          <button className="btn btn-retry" onClick={this.fetchNewUser}>
            🔄 Retry
          </button>
        </div>
      );
    }

    return (
      <div className="card user-card">
        <div className="card-header">
          <div className="badge-pill">REST API Response</div>
          <h2>Random User Profile</h2>
          <p className="card-subtitle">
            Data fetched from <code>https://randomuser.me/api/</code> using <code>fetch()</code> in <code>componentDidMount()</code>.
          </p>
        </div>

        <div className="profile-section">
          <div className="avatar-wrapper">
            <img
              src={image}
              alt={`${title} ${firstname}`}
              className="user-avatar"
            />
          </div>

          <div className="user-info">
            <h3 className="user-full-name">
              {title}. {firstname} {lastname}
            </h3>

            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Title</span>
                <span className="info-value">{title}</span>
              </div>
              <div className="info-item">
                <span className="info-label">First Name</span>
                <span className="info-value">{firstname}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email</span>
                <span className="info-value">{email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Phone</span>
                <span className="info-value">{phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Location</span>
                <span className="info-value">{location}</span>
              </div>
            </div>
          </div>
        </div>

        <button className="btn btn-fetch" onClick={this.fetchNewUser}>
          🔄 Fetch Another Random User
        </button>
      </div>
    );
  }
}

export default Getuser;
