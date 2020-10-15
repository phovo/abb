import React from 'react';
import $ from 'jquery';

window.jQuery = $;
window.$ = $;
global.jQuery = $;


const SKUList = React.lazy(() => import('../screens/sku/SKUList'));
const CreateSKU = React.lazy(()=> import ('../screens/sku/CreateSKU'));
const Product = React.lazy(() => import('../screens/product/Product'));
const ProductList = React.lazy(()=> import('../screens/product/ProductList'))
const ProductEdit = React.lazy(()=> import('../screens/product/ProductEdit'))

const routes = [
    { path: '/sku', exact: true, name: 'Documentation', component: SKUList },
    { path: '/product', exact: true, name: 'Documentation', component: Product },
    { path: '/createsku',exact:true,name:'Documentation',component:CreateSKU},
    { path: '/productlist', exact :true,name:'Documentation',component: ProductList},
    { path: '/productedit', exact :true,name:'Documentation',component: ProductEdit}
];

export default routes;