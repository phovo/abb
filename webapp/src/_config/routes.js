import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;


const SKUList = React.lazy(() => import('../screens/sku/SKUList'));
const Product = React.lazy(() => import('../screens/product/Product'));

const routes = [
    { path: '/sku', exact: true, name: 'Documentation', component: SKUList },
    { path: '/product', exact: true, name: 'Documentation', component: Product },
];

export default routes;