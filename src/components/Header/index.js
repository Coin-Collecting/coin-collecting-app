import React from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Divider from 'material-ui/Divider';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import { NavLink } from 'react-router-dom';

import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

// eslint-disable-next-line react/prefer-stateless-function
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div className="global-header">
        <AppBar
          title="My Coin Store"
          zDepth={2}
          onLeftIconButtonClick={() => this.setState({open: !this.state.open})}
          iconElementRight={
            <IconMenu
              {...this.props}
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
              <Link to="/"><MenuItem primaryText="Dashboard" /></Link>
              <Link to="/collection/large-cent">
                <MenuItem primaryText="Collection" />
              </Link>
              <MenuItem primaryText="Settings" disabled={true}/>
              <MenuItem primaryText="Add Photos" disabled={true}/>
              <Divider />
              <Link to="/logout">
                <MenuItem primaryText="Log out" />
              </Link>
            </IconMenu>
          }
        />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <List>
            <Subheader>1/2 Cent</Subheader>
            <NavLink to={"/collection/half-cent"}>
              <ListItem primaryText="Half Cent" />
            </NavLink>
            <Subheader>1 Cent</Subheader>
            <NavLink to={"/collection/large-cent"}>
              <ListItem primaryText="Large Cent" />
            </NavLink>
            <NavLink to={"/collection/indian-head-cent"}>
              <ListItem primaryText="Indian Head Cent" />
            </NavLink>
            <NavLink to={"/collection/linc-cent"}>
              <ListItem primaryText="Lincoln Cent" />
            </NavLink>
            <Subheader>2 Cent</Subheader>
            <NavLink to={"/collection/two-cent"}>
              <ListItem primaryText="Two Cent" />
            </NavLink>
            <Subheader>3 Cent</Subheader>
            <NavLink to={"/collection/three-cent-silver"}>
              <ListItem primaryText="Three Cent Silver" />
            </NavLink>
            <NavLink to={"/collection/three-cent-copper"}>
              <ListItem primaryText="Three Cent Copper" />
            </NavLink>
            <Subheader>5 Cent</Subheader>

            <NavLink to="/collection/older-nickels">
              <ListItem primaryText="Older Nickels" />
            </NavLink>
            <NavLink to="/collection/seated-liberty-nickels">
              <ListItem primaryText="Seated Liberty Nickels" />
            </NavLink>
            <NavLink to="/collection/shield-nickels">
              <ListItem primaryText="Shield Nickels" />
            </NavLink>
            <NavLink to="/collection/liberty-nickels">
              <ListItem primaryText="Liberty (V) Nickels" />
            </NavLink>
            <NavLink to="/collection/buffalo-nickels">
              <ListItem primaryText="Buffalo Nickels" />
            </NavLink>
            <NavLink to="/collection/jefferson-nickels">
              <ListItem primaryText="Jefferson Nickels" />
            </NavLink>
            <Subheader>Dimes</Subheader>
            <NavLink to="/collection/older-dimes">
              <ListItem primaryText="Older Dimes" />
            </NavLink>
            <NavLink to="/collection/seated-liberty-dimes">
              <ListItem primaryText="Seated Liberty Dimes" />
            </NavLink>
            <NavLink to="/collection/barber-dimes">
              <ListItem primaryText="Barber Dimes" />
            </NavLink>
            <NavLink to="/collection/mercury-dimes">
              <ListItem primaryText="Mercury Dimes" />
            </NavLink>
            <NavLink to="/collection/roosevelt-dimes">
              <ListItem primaryText="Roosevelt Dimes" />
            </NavLink>

            <Subheader>20 Cent</Subheader>
            <NavLink to="/collection/twenty-cent-piece">
              <ListItem primaryText="Twenty Cent Piece" />
            </NavLink>

            <Subheader>Quarters</Subheader>
            <NavLink to="/collection/older-quarters">
              <ListItem primaryText="Older Quarters" />
            </NavLink>
            <NavLink to="/collection/seated-liberty-quarters">
              <ListItem primaryText="Seated Liberty Quarters" />
            </NavLink>
            <NavLink to="/collection/barber-quarters">
              <ListItem primaryText="Barber Quarters" />
            </NavLink>
            <NavLink to="/collection/standing-liberty-quarters">
              <ListItem primaryText="Standing Liberty Quarters" />
            </NavLink>
            <NavLink to="/collection/washington-quarters">
              <ListItem primaryText="Washington Quarters" />
            </NavLink>
            <NavLink to="/collection/statehood-quarters">
              <ListItem primaryText="Statehood Quarters" />
            </NavLink>
            <NavLink to="/collection/national-park-quarters">
              <ListItem primaryText="National Park Quarters" />
            </NavLink>

            <Subheader>Half Dollars</Subheader>
            <NavLink to="/collection/older-half-dollars">
              <ListItem primaryText="Older Half Dollars" />
            </NavLink>
            <NavLink to="/collection/seated-liberty-half-dollars">
              <ListItem primaryText="Seated Liberty Half Dollars" />
            </NavLink>
            <NavLink to="/collection/barber-half-dollar">
              <ListItem primaryText="Barber Half Dollars" />
            </NavLink>
            <NavLink to="/collection/walking-liberty-half-dollar">
              <ListItem primaryText="Walking Liberty Half Dollars" />
            </NavLink>
            <NavLink to="/collection/franklin-half-dollar">
              <ListItem primaryText="Franklin Half Dollars" />
            </NavLink>
            <NavLink to="/collection/kennedy-half-dollar">
              <ListItem primaryText="Kennedy Half Dollars" />
            </NavLink>

            <Subheader>Dollar Coins</Subheader>
            <NavLink to="/collection/older-dollars">
              <ListItem primaryText="Older Dollars" />
            </NavLink>
            <NavLink to="/collection/seated-liberty-dollars">
              <ListItem primaryText="Seated Liberty Dollars" />
            </NavLink>
            <NavLink to="/collection/trade-dollars">
              <ListItem primaryText="Trade Dollars" />
            </NavLink>
            <NavLink to="/collection/morgan-dollars">
              <ListItem primaryText="Morgan Dollars" />
            </NavLink>
            <NavLink to="/collection/peace-dollars">
              <ListItem primaryText="Peace Dollars" />
            </NavLink>
            <NavLink to="/collection/eisenhower-dollars">
              <ListItem primaryText="Eisenhower Dollars" />
            </NavLink>
            <NavLink to="/collection/susan-dollars">
              <ListItem primaryText="Susan B. Anthony Dollars" />
            </NavLink>
            <NavLink to="/collection/sacagawea-dollars">
              <ListItem primaryText="Sacagawea Dollars" />
            </NavLink>
            <NavLink to="/collection/presidential-dollars">
              <ListItem primaryText="Presidential Dollars" />
            </NavLink>
          </List>
        </Drawer>
      </div>
    );
  }
}

Header.propTypes = {};

export default Header;
