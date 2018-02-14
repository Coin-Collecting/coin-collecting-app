import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { S3_URL } from '../../constants';

const largeCent1 = 'img/issues/large-cent.jpg';
const largeCent2 = 'img/issues/large-cent-002.jpg';
const halfCent = 'img/issues/half-cent.jpg';
const indianHead = 'img/issues/indian-head.jpg';
const indianHead2 = 'img/issues/indian-head-002.jpg';
const lincoln = 'img/issues/lincoln-001.jpg';
const lincoln2 = 'img/issues/lincoln-002.jpg';
const twoPiece = 'img/issues/2-cent.jpg';
const threeCent = 'img/issues/3-cent.jpg';
const threeCent2 = 'img/issues/3-cent-002.jpg';
const halfDime = 'img/issues/half-dime.jpg';
const halfDime2 = 'img/issues/half-dime2.jpg';
const shieldNickel = 'img/issues/shield-nickel.jpg';
const vNickel = 'img/issues/v-nickel.jpg';
const buffaloNickel = 'img/issues/buffalo-nickel.jpg';
const jeffersonNickel = 'img/issues/jefferson.jpg';
const jeffersonNickel2 = 'img/issues/jefferson2.jpg';
const oldDime = 'img/issues/old-dime.jpg';
const dimeSeatedLiberty = 'img/issues/dime-seated-liberty.jpg';
const barberDime = 'img/issues/dime-barber.jpg';
const mercuryDime = 'img/issues/dime-mercury.jpg';
const rooseveltDime = 'img/issues/dime-roosevelt.jpg';
const twentyCent = 'img/issues/20-cent.jpg';
const cappedBustQuarter = 'img/issues/cappedBustQuarter.jpg';
const seatedLibertyQuarter = 'img/issues/libertySeatedQuarter.jpg';
const barberQuarter = 'img/issues/barberQuarter.jpg';
const standingLibertyQuarter = 'img/issues/standingLibertyQuarter.jpg';
const washingtonQuarter = 'img/issues/washingtonQuarter.jpg';
const stateQuarter = 'img/issues/stateQuarter.jpg'
const barberHalf = 'img/issues/barberHalf.jpg';
const walkingHalf = 'img/issues/walkingLibertyHalf.jpg';
const franklinHalf = 'img/issues/franklinHalf.jpg';
const kennedyHalf = 'img/issues/kennedyHalf.jpg';
const morganDollar = 'img/issues/morganDollar.jpg';
const peaceDollar = 'img/issues/peaceDollar.jpg';
const eisenhowerDollar = 'img/issues/eisenhowerDollar.jpg';
const susanDollar = 'img/issues/susanDollar.jpg';
const sacagaweaDollar = 'img/issues/sacagaweaDollar.jpg';

const images = {
  '6+7+8+9+10+11+12': [largeCent1, largeCent2],
  '1+2+3+4+5': [halfCent],
  '13+14+15+16': [indianHead, indianHead2],
  '17+18+19+20+21+22+23+24+25+26+27': [lincoln, lincoln2],
  '28': [twoPiece],
  '29+30+31': [threeCent],
  '32': [threeCent2],
  '33+34+35+36': [halfDime, halfDime2],
  '37+38+39+40+41+42+43': [halfDime, halfDime2],
  '44+45': [shieldNickel],
  '46+47': [vNickel],
  '48+49': [buffaloNickel],
  '50+51+52+53+54+55+56+57': [jeffersonNickel, jeffersonNickel2],
  '58+59+60+61': [oldDime],
  '62+63+64+65+66+67+68+69': [dimeSeatedLiberty],
  '70': [barberDime],
  '71': [mercuryDime],
  '72+73': [rooseveltDime],
  '74': [twentyCent],
  '75+76+77+78': [cappedBustQuarter],
  '79+80+81+82+83+84+85+86': [seatedLibertyQuarter],
  '87': [barberQuarter],
  '88+89': [standingLibertyQuarter],
  '90+91+92+93': [washingtonQuarter],
  '94+95+96+97+98+99+100+101+102+103+104+105+106+107+108+109+110+111+112+113+114+115+116+117+118+119+120+121+122+123+124+125+126+127+128+129+130+131+132+133+134+135+136+137+138+139+140+141+142+143+144+145+146+147+148+149': [stateQuarter],
  '204': [barberHalf],
  '205+206': [walkingHalf],
  '207': [franklinHalf],
  '208+209+210+211+212': [kennedyHalf],
  '221': [morganDollar],
  '222': [peaceDollar],
  '223+224+225+226': [eisenhowerDollar],
  '227': [susanDollar],
  '228+237+242+247+252+257+262+267+272+276': [sacagaweaDollar]
};

class IssueImage extends React.Component {
  render() {
    const { issueId } = this.props;
    if (!images[issueId]) return null;
    return (
      <div className="issue-image-container">
        <div className="content">
          { images[issueId].map((img, index) => (
            <img key={index} src={S3_URL + img} />
          ))}
        </div>
      </div>
    );
  }
}

IssueImage.propTypes = {
  issueId: PropTypes.string.isRequired,
};

export default IssueImage;
