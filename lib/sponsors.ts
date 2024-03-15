export interface sponsorInterface {
  img: string,
  title: string,
  desc: string,
  link: string,
  width: number,
  height: number
}

const sponsorsList: Array<sponsorInterface> = [
  {
    img: '/images/sponsors/1c.png',
    title: 'SYSTEMY ZABEZPIECZEŃ',
    desc: '',
    link: 'http://tprzybylski.pl',
    width: 260,
    height: 94
  },
  {
    img: '/images/sponsors/2c.png',
    title: 'Reklama na monitorach LCD w komunikacji miejskiej',
    desc: '',
    link: 'http://www.dv-box.pl/',
    width: 240, height: 85
  },
  {
    img: '/images/sponsors/9c.png',
    title: 'Klub piłkarski Wisła Kraków S.A.',
    desc: '',
    link: 'https://wislakrakow.com/',
    width: 117, height: 150
  },
  {
    img: '/images/sponsors/10c.png',
    title: 'Piłkarska liga dla firm',
    desc: '',
    link: 'http://www.biznesliga.com.pl',
    width: 300,
    height: 100
  },
];

export function GET_SPONSORS(): Array<sponsorInterface> {
  return sponsorsList;
}