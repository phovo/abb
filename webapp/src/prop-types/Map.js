import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Map extends Component {
    static propTypes = {
        prop: PropTypes,
        lng: PropTypes.number.isRequired,
        zoom: PropTypes.number,
        place: PropTypes.object,
        markers: PropTypes.array,
        optional: PropTypes.oneOf([PropTypes.element, PropTypes.array])
    }

    render() {
        return (
            <div>
                
            </div>
        )
    }
}
