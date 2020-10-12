import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Product from '../product/Product'
import { products } from '../../seed/product'
export default class ProductList extends Component {
    constructor(props) {
        super(props)

        this.state = {
            productList: []
        }
    }

    static propTypes = {
        prop: PropTypes
    }

    handleUpVote = (id) => {
        const nextProducts = this.state.productList.map(product => {
            if (product.id === id) {
                return Object.assign({}, product, { votes: product.votes + 1 });
            } else {
                return product
            }
        })

        this.setState({
            productList: nextProducts
        })
    }

    componentDidMount() {
        this.setState({
            productList: products
        })
    }

    render() {
        return (
            this.state.productList.map(product => (
                <div className='ui unstackable items'>
                    <Product
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        url={product.url}
                        votes={product.votes}
                        submitterAvatarUrl={product.submitterAvatarUrl}
                        productImageUrl={product.productImageUrl}
                        onVote={this.handleUpVote}
                    />
                </div>
            ))

        )
    }
}
