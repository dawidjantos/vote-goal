const settings = {
  voting: {
    etap1: false,
    etap2: {
      start: new Date(2024,3,10,12,0,0),
      end: new Date(2024,4,8,12,0,0),
    }
  }
}

export const GET_SETTINGS = () => {
  return settings;
}
