import ReactDOM from 'react-dom/client';
import React from 'react';

const root = ReactDOM.createRoot(
    // @ts-ignore (Argument of type 'HTMLElement | null' is not assignable)
    document.getElementById('main')
);
root.render(<Hello username="Einstein" />)

function Hello(prop: {username: string}) {
    return (<h1>Hello, {prop.username}</h1>);
}
