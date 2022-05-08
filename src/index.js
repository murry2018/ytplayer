import ReactDOM from 'react-dom/client';
import React from 'react';

const root = ReactDOM.createRoot(
    document.getElementById('main')
);
root.render(<Hello username="Einstein" />)

function Hello(prop) {
    return (<h1>Hello, {prop.username}</h1>);
}
