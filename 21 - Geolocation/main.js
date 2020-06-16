const direction = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

navigator.geolocation.watchPosition(
  locationData => {
    speed.textContent = (locationData.coords.speed).toFixed(2);
    direction.style.transform = `rotate(${locationData.coords.heading}deg)`;
  },
  err => {
    console.log(err);
  }
)