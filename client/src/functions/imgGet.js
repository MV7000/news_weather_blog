export const imgGet = name => {
  return new URL(`../uploads/${name}`, import.meta.url).href;
};

export const sourceImage = (arr, source) => {
  return arr.filter(elem => elem.name.includes(source))[0]?.url;
};
