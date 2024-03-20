export interface sponsorInterface {
  img: string,
  title: string,
  desc: string,
  link: string,
  width: number,
  height: number,
}

export interface partnerInterface {
  img: string,
  title: string,
  desc: string,
  link: string,
  width: number,
  height: number,
  benefits?: string,
}

export interface collaboratorsInterface {
  sponsors: sponsorInterface[],
  partners: partnerInterface[]
}

const colabList: collaboratorsInterface = {
  sponsors: [
    {
      img: '/images/sponsors/1c.png',
      title: 'SYSTEMY ZABEZPIECZEŃ',
      desc: '',
      link: 'http://tprzybylski.pl/',
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
    {
      img: '/images/sponsors/13c.png',
      title: 'Tańsze Media',
      desc: '',
      link: 'https://tanszemedia.pl/',
      width: 300,
      height: 200,
    },
  ],
  partners: [
    {
      img: '/images/sponsors/11c.png',
      title: 'Peaky Blades Barbershop',
      desc: '',
      link: 'https://booksy.com/pl-pl/192329_peaky-blades-barber-shop-zablocie_barber-shop_8820_krakow',
      width: 170,
      height: 163,
      benefits: "Na hasło BEZPIECZNASZKOLAZAGOLA rabat 20%",
    },
    {
      img: '/images/sponsors/12c.png',
      title: 'Krakowska Palarnia Kawy',
      desc: '',
      link: 'https://www.krakowskapalarniakawy.pl',
      width: 200,
      height: 200,
      benefits: "Kupon iaPiBP20 daje rabat 20% na zakupy w sklepie.",
    },
  ]
};

export function GET_COLAB(): collaboratorsInterface {
  return colabList;
}