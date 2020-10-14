import React from 'react';

const Login = React.lazy(() => import('../screens/login/Login'));
const route = [
    { path: '/login', exact: true, name: 'Login', component: Login }
];

export default route;