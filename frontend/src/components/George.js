import React, { Component } from 'react'
import George1 from '../images/logoface.png'
import George2 from '../images/logoface_open.png'

class George extends Component {
  state = {
      src: George1,
  };

  getImage() {
    setTimeout(() => {
        const src = this.state.src === George1 ? George2 : George1;
        this.setState({ src }, () => this.getImage)
    }, 500);
    return this.state.src;
  }

  render() {
    return (
      <div className="george">
        <img src={ this.getImage() } />
      </div>
    )
  }
}

export default George
