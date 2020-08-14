import React, { Component, useRef } from 'react'
import {Link} from 'react-router-dom';
import css from './Menu.module.css'



export default function Menu() {

    const homeLink = useRef(null);
    const aboutLink = useRef(null);
    const whoLink = useRef(null);
    const clientsLink = useRef(null);
    const geniusLink = useRef(null);

    const linkClickHandler = (e) => {
        clearAllActiveMenuItems();
        e.target.classList.add(css.active);
    }

    const clearAllActiveMenuItems = () => {
        homeLink.current.classList.remove(css.active);
        aboutLink.current.classList.remove(css.active);
        whoLink.current.classList.remove(css.active);
        clientsLink.current.classList.remove(css.active);
        geniusLink.current.classList.remove(css.active);
    }

    return (
        <div>
            <nav className={css.Menu}>
                <Link onClick={linkClickHandler} to='/' ref={homeLink}>Home</Link>
                <Link onClick={linkClickHandler} to='/about' ref={aboutLink}>About</Link>
                <Link onClick={linkClickHandler} to='/who-we-are' ref={whoLink}>Who we are</Link>
                <Link onClick={linkClickHandler} to='/clients' ref={clientsLink}>Clients</Link>
                <Link onClick={linkClickHandler} to='/genius' ref={geniusLink}>Genius</Link>
            </nav>
        </div>
    )
}


// export default class Menu extends Component {

//     constructor(props) {
//         super(props);

//         this.homeLink = createRef();
//         this.aboutLink = createRef();
//         this.whoLink = createRef();
//         this.clientsLink = createRef();
//         this.geniusLink = createRef();
//     }
    

//     linkClickHandler = () => {
//         this.homeLink.current.classList.add('nono')
//     }

//     render() {
//         return (
//             <div>
//                 <nav className={css.Menu}>
//                     <Link onClick={this.linkClickHandler} to='/home' ref={this.homeLink}>Home</Link>
//                     <Link onClick={this.linkClickHandler} to='/about' ref={this.aboutLink}>About</Link>
//                     <Link onClick={this.linkClickHandler} to='/who-we-are' ref={this.whoLink}>Who we are</Link>
//                     <Link onClick={this.linkClickHandler} to='/clients' ref={this.clientsLink}>Clients</Link>
//                     <Link onClick={this.linkClickHandler} to='/genius' ref={this.geniusLink}>Genius</Link>
//                 </nav>
//             </div>
//         )
//     }
// }
