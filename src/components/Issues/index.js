import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';
import IssueImage from '../IssueImage/index'

class Issues extends React.Component {
  render() {
    const { issueId } = this.props;
    return (
      <div className="issues-container">
        <nav>
          <ul>
            <li>
                <details >
                  <summary>Half Cent</summary>
                  <NavLink to={"/collection/half-cent"}>Half Cent</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>1 Cent</summary>
                  <NavLink to="/collection/large-cent">Large Cent</NavLink>
                  <NavLink to="/collection/indian-head-cent">Indian Head Cent</NavLink>
                  <NavLink to="/collection/lincoln-cent">Lincoln Cent</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>2 Cent</summary>
                  <NavLink to="/collection/two-cent">2 Piece Cent</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>3 Cent</summary>
                  <NavLink to="/collection/three-cent-silver">3 Piece Cent (Silver)</NavLink>
                  <NavLink to="/collection/three-cent-copper">3 Piece Cent (Copper)</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>5 Cents</summary>
                  <NavLink to="/collection/older-nickels">Older Nickels</NavLink>
                  <NavLink to="/collection/seated-liberty-nickels">Seated Liberty Nickels</NavLink>
                  <NavLink to="/collection/shield-nickels">Shield Nickels</NavLink>
                  <NavLink to="/collection/liberty-nickels">Libery (V) Nickels</NavLink>
                  <NavLink to="/collection/buffalo-nickels">Buffalo Nickels</NavLink>
                  <NavLink to="/collection/jefferson-nickels">Jefferson Nickels</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>Dimes</summary>
                  <NavLink to="/collection/older-dimes">Older Dimes</NavLink>
                  <NavLink to="/collection/seated-liberty-dimes">Seated Liberty Dimes</NavLink>
                  <NavLink to="/collection/barber-dimes">Barber Dimes</NavLink>
                  <NavLink to="/collection/mercury-dimes">Mercury Dimes</NavLink>
                  <NavLink to="/collection/roosevelt-dimes">Roosevelt Dimes</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>20 Cent</summary>
                  <NavLink to="/collection/twenty-cent-piece">20 Cent Piece</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>Quarters</summary>
                  <NavLink to="/collection/older-quarters">Older Quarters</NavLink>
                  <NavLink to="/collection/seated-liberty-quarters">Seated Liberty Quarters</NavLink>
                  <NavLink to="/collection/barber-quarters">Barber Quarters</NavLink>
                  <NavLink to="/collection/standing-liberty-quarters">Standing Liberty Quarters</NavLink>
                  <NavLink to="/collection/washington-quarters">Washington Quarters</NavLink>
                  <NavLink to="/collection/statehood-quarters">Statehood Quarters</NavLink>
                  <NavLink to="/collection/national-park-quarters">National Park Quarters</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>Half Dollars</summary>
                  <NavLink to="/collection/older-half-dollars">Older Half Dollars</NavLink>
                  <NavLink to="/collection/seated-liberty-half-dollars">Seated Liberty Half Dollar</NavLink>
                  <NavLink to="/collection/barber-half-dollar">Barber Half Dollar</NavLink>
                  <NavLink to="/collection/walking-liberty-half-dollar">Walking Liberty Half Dollar</NavLink>
                  <NavLink to="/collection/franklin-half-dollar">Franklin Half Dollar</NavLink>
                  <NavLink to="/collection/kennedy-half-dollar">Kennedy Half Dollar</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>Dollars</summary>
                  <NavLink to="/collection/older-dollars">Early Dollars</NavLink>
                  <NavLink to="/collection/seated-liberty-dollars">Seated Liberty Dollar</NavLink>
                  <NavLink to="/collection/trade-dollars">Trade Dollar</NavLink>
                  <NavLink to="/collection/morgan-dollars">Morgan Dollar</NavLink>
                  <NavLink to="/collection/peace-dollars">Peace Dollar</NavLink>
                  <NavLink to="/collection/eisenhower-dollars">Eisenhower Dollar</NavLink>
                  <NavLink to="/collection/susan-dollars">Susan B. Anthony Dollar</NavLink>
                  <NavLink to="/collection/sacagawea-dollars">Sacagawea Dollar</NavLink>
                  <NavLink to="/collection/presidential-dollars">Presidential Dollar</NavLink>
                </details>
            </li>
          </ul>
        </nav>
        <IssueImage issueId={issueId} />
      </div>
    );
  }
}

export default Issues;
