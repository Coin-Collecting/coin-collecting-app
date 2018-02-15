export const coinQualities = [
  'AG',
  'G',
  'VG',
  'F',
  'VF',
  'XF',
  'AU',
  'PROOF',
  'MS68',
  'MINTSET',
  'Special',
  'Clip',
  'Not Graded',
];

export const S3_URL = 'http://s3.mycoin.store/';

export const getIssueIdsByName = issues => {
  switch (issues) {
    case 'half-cent':
      return "1+2+3+4+5";
    case 'large-cent':
      return "6+7+8+9+10+11+12";
    case 'indian-head-cent':
      return '13+14+15+16';
    case 'lincoln-cent':
      return '17+18+19+20+21+22+23+24+25+26+27';
    case 'two-cent':
      return '28';
    case 'three-cent-silver':
      return '29+30+31';
    case 'three-cent-copper':
      return '32';
    case 'older-nickels':
      return '33+34+35+36';
    case 'seated-liberty-nickels':
      return '37+38+39+40+41+42+43';
    case 'shield-nickels':
      return '44+45';
    case 'liberty-nickels':
      return '46+47';
    case 'buffalo-nickels':
      return '48+49';
    case 'jefferson-nickels':
      return '50+51+52+53+54+55+56+57';
    case 'older-dimes':
      return '58+59+60+61';
    case 'seated-liberty-dimes':
      return '62+63+64+65+66+67+68+69';
    case 'barber-dimes':
      return '70';
    case 'mercury-dimes':
      return '71';
    case 'roosevelt-dimes':
      return '72+73';
    case 'twenty-cent-piece':
      return '74';
    case 'older-quarters':
      return '75+76+77+78';
    case 'seated-liberty-quarters':
      return '79+80+81+82+83+84+85+86';
    case 'barber-quarters':
      return '87';
    case 'standing-liberty-quarters':
      return '88+89';
    case 'washington-quarters':
      return '90+91+92+93';
    case 'statehood-quarters':
      return '94+95+96+97+98+99+100+101+102+103+104+105+106+107+108+109+110+111+112+113+114+115+116+117+118+119+120+121+122+123+124+125+126+127+128+129+130+131+132+133+134+135+136+137+138+139+140+141+142+143+144+145+146+147+148+149';
    case 'national-park-quarters':
      return '150+151+152+153+154+155+156+157+158+159+160+161+162+163+164+165+166+167+168+169+170+171+172+173+174+175+176+177+178+179+180+181+182+183+184+185+186+187+188+189+190';
    case 'older-half-dollars':
      return '191+192+193+194+195';
    case 'seated-liberty-half-dollars':
      return '196+197+198+199+200+201+202+203';
    case 'barber-half-dollar':
      return '204';
    case 'walking-liberty-half-dollar':
      return '205+206';
    case 'franklin-half-dollar':
      return '207';
    case 'kennedy-half-dollar':
      return '208+209+210+211+212';
    case 'older-dollars':
      return '213+214+215+216+217';
    case 'seated-liberty-dollars':
      return '218+219';
    case 'trade-dollars':
      return '220';
    case 'morgan-dollars':
      return '221';
    case 'peace-dollars':
      return '222';
    case 'eisenhower-dollars':
      return '223+224+225+226';
    case 'susan-dollars':
      return '227';
    case 'sacagawea-dollars':
      return '228+237+242+247+252+257+262+267+272+276';
    case 'presidential-dollars':
      return '229+230+231+232+233+234+235+236+238+239+240+241+243+244+245+246+248+249+250+251+253+254+255+256+258+259+260+261+263+264+265+266+268+269+270+271+273+274+275';
    default:
      return issues;
  }
}