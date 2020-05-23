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

function ignoreArticle(band) {
  const isArticle = /^(a |an |the )/i;
  return band.replace(isArticle, '').trim();
}

bands.sort((a, b) => (ignoreArticle(a) > ignoreArticle(b) ? 1 : -1));

const bandList = document.querySelector('#bands');

bandList.innerHTML = bands.map(band => `<li>${band}</li>`).join('');
