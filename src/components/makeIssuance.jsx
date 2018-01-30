import React, {Component} from 'react';
import http from 'http';
import ReactJson from 'react-json-view';

import {Form, FormGroup, FormControl, ControlLabel, Col, Button} from 'react-bootstrap/lib';


class MakeIssuance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            response: {},
            value: '',
            peers: [],
            selectedPeer: ''
        };

        // CHANGE ME
        this.props.request('http://nepnep.southeastasia.cloudapp.azure.com:8080/template/getPeers', this.changePeers.bind(this));
    }
    requestHarrisonIssuance(issuerNode, value) {
        const options = {
            // CHANGE ME
            hostname: 'nepnep.southeastasia.cloudapp.azure.com',
            port: 8080,
            // CHANGE ME
            path: `/template/issue-harrison?value=${value}&bank=${issuerNode}`,
            method: 'POST',

            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
          
        const req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            
            res.setEncoding('utf8');
            let rawData = '';

            res.on('data', (chunk) => {
              rawData += chunk;
            });
            res.on('end', () => {
                try {
                    const response = JSON.parse(rawData);
                    // changing state to hold the response
                    this.setState({response: response});
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
          
        req.on('error', (e) => {
            console.error(`problem with request: ${e.message}`);
        });
          
        // write data to request body
        req.end();
    }
    changePeers(peers) {
        this.setState({peers: peers});
    }
    changeSelectedPeer(event) {
        this.setState({selectedPeer: event.target.value });
    }
    changeValue(event) {
        this.setState({value: event.target.value});
    }
    submit() {
        console.log(`value: ${this.state.value}`);
        console.log(`selectedPeer: ${this.state.selectedPeer}`);

        if(this.state.selectedPeer !== "nep") {
            this.requestHarrisonIssuance(this.state.selectedPeer, this.state.value);
        } else {
            console.log('Pick a real option');
        }
    }
    render () {
        let response = this.state.response;

        let peerz = <option></option>;
        // CHANGE ME -> my response returns a peers JSON so I have to enter it to get individual peers.
        // The peers.peers
        if(this.state.peers.peers !== undefined) {
            peerz = this.state.peers.peers.map((elem, idx) => {
                const name = elem.x500Principal.name; // CHANGE ME -> only if structure of response is different.
                return(
                    <option value={name} key={idx}>{name}</option>
                );
            });
        }
        
        return(
            <div>
                {/* CHANGE ME -> Just UI */}
                <h3>POST /issue-harrison</h3>
                <Form horizontal>
                    <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                    Request Issuance From:
                    </Col>
                    <Col sm={4}>
                        <FormControl componentClass="select" placeholder="Peers" onChange={this.changeSelectedPeer.bind(this)}>
                            <option value={"nep"}></option>
                            {peerz}
                        </FormControl>
                    </Col>
                    <Col sm={3}>
                        <FormControl placeholder="Value" onChange={this.changeValue.bind(this)} />
                    </Col>
                    <Col sm={1}>
                        <Button onClick={this.submit.bind(this)}>Send</Button>
                    </Col>
                    </FormGroup>
                    <ReactJson src={response} name="response" theme="monokai" enableClipboard={false} collapsed={true} />
                </Form>
            </div>
        );
    }
}

export default MakeIssuance;