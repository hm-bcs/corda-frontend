import React, {Component} from 'react';
import ReactJson from 'react-json-view';

class ViewVault extends Component {
    constructor(props) {
        super(props);
        this.state = {vault: {}};

        // CHANGE ME
        this.props.request('http://nepnep.southeastasia.cloudapp.azure.com:8080/template/harrisons', this.updateState.bind(this));
    }
    updateState(newMe) {
        this.setState({vault: newMe});
    }
    render () {
        let vault = this.state.vault;
        
        return(
            <div>
                {/* CHANGE ME -> Just UI */}
                <h3>GET /harrisons</h3>
                <ReactJson src={vault} name="vault" theme="monokai" enableClipboard={false} collapsed={true} />
            </div>
        );
    }
}

export default ViewVault;