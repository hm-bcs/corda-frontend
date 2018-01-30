import React, {Component} from 'react';

class ViewMe extends Component {
    constructor(props) {
        super(props);
        this.state = {me: ''}; // state to hold what '/me' enpoint is

        // CHANGE ME
        this.props.request('http://nepnep.southeastasia.cloudapp.azure.com:8080/template/me', this.updateState.bind(this));
    }
    updateState(newMe) {
        this.setState({me: newMe});
    }
    render () {
        let name = '';
        if(this.state.me !== '') {
            // CHANGE ME -> structure of response
            name = this.state.me.me.x500Principal.name;
        }
        
        return(
            <div>
                {/* CHANGE ME -> Just UI */}
                <h3>GET /me</h3>
                <p>{name}</p>
            </div>
        );
    }
}

export default ViewMe;