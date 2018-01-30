import React, {Component} from 'react';
import ReactJson from 'react-json-view';

class ViewPeers extends Component {
    constructor(props) {
        super(props);
        this.state = {peers: {}};

        // CHANGE ME
        this.props.request('http://nepnep.southeastasia.cloudapp.azure.com:8080/template/getPeers', this.updateState.bind(this));
    }
    updateState(newMe) {
        this.setState({peers: newMe});
    }
    render () {
        let peers = this.state.peers.peers;
        
        return(
            <div>
                {/* CHANGE ME -> Just UI */}
                <h3>GET /getPeers</h3>
                <ReactJson src={peers} name="peers" theme="monokai" enableClipboard={false} collapsed={true} />
            </div>
        );
    }
}

export default ViewPeers;