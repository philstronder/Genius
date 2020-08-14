import React, { Component } from 'react'
import css from './Footer.module.css'

export default class Footer extends Component {
    render() {
        return (
            <div className={css.Footer}>
                Copyright © 2020 Felipe Carvalho | Powered by React
            </div>
        )
    }
}
