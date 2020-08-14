import React, {Component} from 'react';
import Logo from './Logo/Logo';
import Menu from './Menu/Menu';

export default class Header extends Component {
    render() {
        return(
            <div>
                <Logo />
                <Menu />
            </div>
        );
    }
}