import { useAppSelector } from '../../hooks';
import { useEthers } from '@usedapp/core';
import { Container } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';
import ShortAddress from '../ShortAddress';
import classes from './NavBar.module.css';
import logo from '../../assets/logo.svg';
import testnetNoun from '../../assets/testnet-noun.png';
import NavBarItem from './NavBarItem';
import NavBarLink from './NavBarLink';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const activeAccount = useAppSelector(state => state.account.activeAccount);
  const { activateBrowserWallet } = useEthers();

  const testnetContent = (
    <NavBarItem className={classes.testnet}>
      <img className={classes.testnetImg} src={testnetNoun} alt="testnet noun" />
      <span>TESTNET</span>
    </NavBarItem>
  );

  const connectedContent = (
    <>
      <NavBarItem>
        <a href="/playground" className={classes.playground} target="_blank" rel="noreferrer">
          PLAYGROUND
        </a>
      </NavBarItem>
      <NavBarItem className={classes.connectedBtn}>
        <ShortAddress>{activeAccount}</ShortAddress>
        <span className={classes.greenStatusCircle} />
      </NavBarItem>
    </>
  );

  const disconnectedContent = (
    <NavBarItem className={classes.connectBtn} onClick={() => activateBrowserWallet()}>
      Connect Wallet
    </NavBarItem>
  );

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/" className={classes.navBarBrand}>
          <img
            src={logo}
            width="70"
            height="70"
            className="d-inline-block align-middle"
            alt="Nouns DAO logo"
          />
        </Navbar.Brand>
        {testnetContent}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <NavBarLink to="/vote">GOVERNANCE</NavBarLink>
          {activeAccount ? connectedContent : disconnectedContent}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;