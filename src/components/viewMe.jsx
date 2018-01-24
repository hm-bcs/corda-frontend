import React, {Component} from 'react';
import http from 'http';

class ViewMe extends Component {
    constructor(props) {
        super(props);
        this.state = {me: ''}; // state to hold what '/me' enpoint is

        this.getMe();
    }
    getMe() {
        http.get('http://localhost:8080/template/me', (res) => {
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
                    this.setState((prevState, props) => {
                        return {me: response};
                    });
                } catch (e) {
                    console.error(e.message);
                }
            });
        });
    }
    render () {
        let name = '';
        if(this.state.me !== '') {
            name = this.state.me.me.x500Principal.name;
        }
        
        return(
            <div>
                <h3>GET /me</h3>
                <p>{name}</p>
            </div>
        );
    }
}

export default ViewMe;