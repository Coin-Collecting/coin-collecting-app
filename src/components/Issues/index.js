import React from 'react';
import { NavLink } from 'react-router-dom';
import './style.scss';
import IssueImage from '../IssueImage/index'

class Issues extends React.Component {
  render() {
    const { match: { params }} = this.props;
    return (
      <div className="issues-container">
        <nav>
          <ul>
            <li>
                <details >
                  <summary>Half Cent</summary>
                  <NavLink to="/collection/1+2+3+4+5">Half Cent</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>1 Cent</summary>
                  <NavLink to="/collection/6+7+8+9+10+11+12">Large Cent</NavLink>
                  <NavLink to="/collection/13+14+15+16">Indian Head Cent</NavLink>
                  <NavLink to="/collection/17+18+19+20+21+22+23+24+25+26+27">Lincoln Cent</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>2 Cent</summary>
                  <NavLink to="/collection/28">2 Piece Cent</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>3 Cent</summary>
                  <NavLink to="/collection/29+30+31">3 Piece Cent (Silver)</NavLink>
                  <NavLink to="/collection/32">3 Piece Cent (Copper)</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>5 Cents</summary>
                  <NavLink to="/collection/33+34+35+36">Older Nickels</NavLink>
                  <NavLink to="/collection/37+38+39+40+41+42+43">Seated Liberty Nickels</NavLink>
                  <NavLink to="/collection/44+45">Shield Nickels</NavLink>
                  <NavLink to="/collection/46+47">Libery (V) Nickels</NavLink>
                  <NavLink to="/collection/48+49">Buffalo Nickels</NavLink>
                  <NavLink to="/collection/50+51+52+53+54+55+56+57">Jefferson Nickels</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>Dimes</summary>
                  <NavLink to="/collection/58+59+60+61">Older Dimes</NavLink>
                  <NavLink to="/collection/62+63+64+65+66+67+68+69">Seated Liberty Dimes</NavLink>
                  <NavLink to="/collection/70">Barber Dimes</NavLink>
                  <NavLink to="/collection/71">Mercury Dimes</NavLink>
                  <NavLink to="/collection/72+73">Roosevelt Dimes</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>20 Cent</summary>
                  <NavLink to="/collection/74">20 Cent Piece</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>Quarters</summary>
                  <NavLink to="/collection/75+76+77+78">Older Quarters</NavLink>
                  <NavLink to="/collection/79+80+81+82+83+84+85+86">Seated Liberty Quarters</NavLink>
                  <NavLink to="/collection/87">Barber Quarters</NavLink>
                  <NavLink to="/collection/88+89">Standing Liberty Quarters</NavLink>
                  <NavLink to="/collection/90+91+92+93">Washington Quarters</NavLink>
                  <NavLink to="/collection/94+95+96+97+98+99+100+101+102+103+104+105+106+107+108+109+110+111+112+113+114+115+116+117+118+119+120+121+122+123+124+125+126+127+128+129+130+131+132+133+134+135+136+137+138+139+140+141+142+143+144+145+146+147+148+149">Statehood Quarters</NavLink>
                  <NavLink to="/collection/150+151+152+153+154+155+156+157+158+159+160+161+162+163+164+165+166+167+168+169+170+171+172+173+174+175+176+177+178+179+180+181+182+183+184+185+186+187+188+189+190">National Park Quarters</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>Half Dollars</summary>
                  <NavLink to="/collection/191+192+193+194+195">Older Half Dollars</NavLink>
                  <NavLink to="/collection/196+197+198+199+200+201+202+203">Seated Liberty Half Dollar</NavLink>
                  <NavLink to="/collection/204">Barber Half Dollar</NavLink>
                  <NavLink to="/collection/205+206">Walking Liberty Half Dollar</NavLink>
                  <NavLink to="/collection/207">Franklin Half Dollar</NavLink>
                  <NavLink to="/collection/208+209+210+211+212">Kennedy Half Dollar</NavLink>
                </details>
            </li>

            <li>
                <details >
                  <summary>Dollars</summary>
                  <NavLink to="/collection/213+214+215+216+217">Early Dollars</NavLink>
                  <NavLink to="/collection/218+219">Seated Liberty Dollar</NavLink>
                  <NavLink to="/collection/220">Trade Dollar</NavLink>
                  <NavLink to="/collection/221">Morgan Dollar</NavLink>
                  <NavLink to="/collection/222">Peace Dollar</NavLink>
                  <NavLink to="/collection/223+224+225+226">Eisenhower Dollar</NavLink>
                  <NavLink to="/collection/227">Susan B. Anthony Dollar</NavLink>
                  <NavLink to="/collection/228+237+242+247+252+257+262+267+272+276">Sacagawea Dollar</NavLink>
                  <NavLink to="/collection/229+230+231+232+233+234+235+236+238+239+240+241+243+244+245+246+248+249+250+251+253+254+255+256+258+259+260+261+263+264+265+266+268+269+270+271+273+274+275">Presidential Dollar</NavLink>
                </details>
            </li>
          </ul>
        </nav>
        <IssueImage issueId={params.issueId} />
      </div>
    );
  }
}

export default Issues;
