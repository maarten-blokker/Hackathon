import React, { PureComponent } from 'react'
import Search from '../components/Search';
import Carousel from '../components/Carousel'
import openSocket from 'socket.io-client';
import George from '../components/George';
import { Example } from '../components/Recorder';

const socket = openSocket('http://localhost:4000');

class VoiceSearch extends PureComponent {
    state = {
        products: null,
        loadGeorge: false,
        recordVoice: false,
    }

    componentDidMount() {
      socket.on('newProducts', (data) => this.setState({ products: data.products, loadGeorge: false }))
      socket.on('georgeTalking', () => this.setState({ loadGeorge: true }))
      socket.on('userTalking', () => this.setState({ loadGeorge: false, recordVoice: true }))
    }

    emitStart() {
      socket.emit('startRecording', { userName: 'Chen' })
    }

    render() {
        return (
          <React.Fragment>
            <Search onClick={ this.emitStart }/>
            { this.state.products && <Carousel />}
            { this.state.loadGeorge && <George /> }
            { this.state.userTalking && <Example /> }
          </React.Fragment>
        )
    }
}

export default VoiceSearch
