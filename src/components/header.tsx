import { Link } from 'gatsby';
import React from 'react';
import logo from '../images/logo.svg';
import './header.scss';


const Header = () => (
	<header className="main-header">
		<nav className="nav">
			<ul className="ui-styles">
				<li>
					<Link to="/" style={{ display: 'block' }}>
						<img src={logo} alt="Node.js" className="nav__logo" />
					</Link>
				</li>
				<li className="nav__tabs">
					<a target="_blank" href="https://nodejs.org/en/download/">
						Download
					</a>
				</li>
				<li className="nav__tabs">
					<a target="_blank" href="https://nodejs.org/en/docs/">
						API Docs
					</a>
				</li>
				<li className="nav__tabs">
					<a target="_blank" href="https://github.com/nodejs/nodejs.dev">
						GitHub
					</a>
				</li>
			</ul>
		</nav>
	</header>
);

export default Header;
