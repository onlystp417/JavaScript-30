const bands = [
  'The Plot in You',
  'The Devil Wears Prada',
  'Pierce the Veil',
  'Norma Jean',
  'The Bled',
  'Say Anything',
  'The Midway State',
  'We Came as Romans',
  'Counterparts',
  'Oh, Sleeper',
  'A Skylit Drive',
  'Anywhere But Here',
  'An Old Dog'
];

const isAn = /^(An )/g;
const isThe = /^(The )/g;
const isA = /^(A )/g;

// const answer = 'An old man'.replace(isAn, '');
// console.log(answer);

const bandsNoArticle = bands.map(band => {
  if (isAn.test(band)) {
    return band.replace(isAn, '');
  } else if (isThe.test(band)) {
    return band.replace(isThe, '');
  } else if (isA.test(band)) {
    return band.replace(isA, '');
  } else {
    return band;
  }
});

bandsNoArticle.sort();
