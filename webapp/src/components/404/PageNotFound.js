import React, { Component } from 'react';
import './PageNotFound.css';

class PageNotFound extends Component {
    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="error-template">
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div class="error-details">
                                Sorry, an error has occured, Requested page not found!
                            </div>
                            <div class="error-actions">
                                <a href="/" class="btn btn-primary btn-lg">
                                    Take Me Home </a>
                                <a href="http://www.jquery2dotnet.com" class="btn btn-default btn-lg">
                                     Contact Support </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageNotFound;