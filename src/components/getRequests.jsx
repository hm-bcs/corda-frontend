import React, {Component} from 'react';
import http from 'http';

import ViewMe from './viewMe';
import ViewPeers from './viewPeers';
import ViewVault from './viewVault';
import MakeIssuance from './makeIssuance';

class GetRequests extends Component {
    // https://nodejs.org/api/http.html#http_http_get_options_callback
    makeRequest(url, stateChanger) {
        http.get(url, (res) => {
            const { statusCode } = res;
            const contentType = res.headers['content-type'];
          
            // Error checking
            let error;
            if (statusCode !== 200) {
              error = new Error('Request Failed.\n' +
                                `Status Code: ${statusCode}`);
            } else if (!/^application\/json/.test(contentType)) {
              error = new Error('Invalid content-type.\n' +
                                `Expected application/json but received ${contentType}`);
            }
            if (error) {
              console.error(error.message);
              res.resume();
              return;
            }


            // Reading response
            res.setEncoding('utf8');
            let rawData = '';
            
            res.on('data', (chunk) => {
                rawData += chunk;
            });
            res.on('end', () => {
                try {
                    const response = JSON.parse(rawData);
                    // changing state to hold the response
                    stateChanger(response);
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
    }
    render() {

        return (
            <div>
                {/* CHANGE ME -> Just UI */}
                <h1>/template</h1>
                <ViewMe request={this.makeRequest}/>
                <ViewPeers request={this.makeRequest}/>
                <ViewVault request={this.makeRequest}/>
                <MakeIssuance request={this.makeRequest}/>
            </div>
        );
    }

}

export default GetRequests;