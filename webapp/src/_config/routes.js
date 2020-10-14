import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;


const SKUList = React.lazy(() => import('../screens/sku/SKUList'));
const CreateSKU = React.lazy(()=> import ('../screens/sku/CreateSKU'));
const Product = React.lazy(() => import('../screens/product/Product'));

const routes = [
    { path: '/sku', exact: true, name: 'Documentation', component: SKUList },
    { path: '/product', exact: true, name: 'Documentation', component: Product },
    { path: '/createsku',exact:true,name:'Documentation',component:CreateSKU}
];

export default routes;