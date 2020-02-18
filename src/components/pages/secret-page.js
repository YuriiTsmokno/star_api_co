import React from 'react';
import { Redirect } from 'react-router-dom';

const SecretPage = ({ isLoggedIn, onExit }) => {
    if(isLoggedIn) {
        return(
            <div className="jumbotron text-center">
                <h3>This page is full of secrets!!!</h3>
                <button className="btn btn-primary" onClick={onExit}>
                    Exit
                </button>
            </div>
        );
    }

    return <Redirect to="/login/" />;
}

export default SecretPage;