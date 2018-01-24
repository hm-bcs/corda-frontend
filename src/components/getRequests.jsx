import React, {Component} from 'react';
import http from 'http';
import ViewMe from './viewMe';

class GetRequests extends Component {
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
                <ViewMe/>
            </div>
        );
    }

}

export default GetRequests;