import React, { PureComponent } from 'react'
import Search from '../components/Search';
import Carousel from '../components/Carousel'
import openSocket from 'socket.io-client';

const socket = openSocket('http://localhost:4000');

class VoiceSearch extends PureComponent {
    state = {
        products: null,
    }
    componentDidMount() {
      socket.on('newProducts', (data) => this.setState({ products: data.products }))
    }
    emitStart() {
      socket.emit('startRecording', { userName: 'Chen' })
    }

    render() {
        return (
          <React.Fragment>
            <Search onClick={ this.emitStart }/>
            { this.state.products && <Carousel />}
          </React.Fragment>
        )
    }
}

export default VoiceSearch
