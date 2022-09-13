import Player from '@vimeo/player';
import Throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
// сделали переменную для ключа
const timeKey = 'videoplayer-current-time';
// создали функцию, с помощью деструктаризации вытащили секунды собьекта тайм апдейт(записали в локальное хранилище)
function durationSaveToStorage({ seconds }) {
  localStorage.setItem(timeKey, seconds);
}
// при перезагрузки страницы перезагружался плеер
window.addEventListener('load', newStart);
player.on('timeupdate', Throttle(durationSaveToStorage, 1000));
// функция которая ловит ивент лоад, если в локальном хранилище есть запись, достань их
function newStart() {
  if (!localStorage.getItem(timeKey)) {
    return;
  }
  const currentVideoTime = localStorage.getItem(timeKey);

  player
    .setCurrentTime(currentVideoTime)
    .then(() => {
      player.play();
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
// ===================================== 2 способ ======================
// player.on(
//   'timeupdate',
//   throttle(e => {
//     localStorage.setItem(CURRENT_TIME, e.seconds);
//   }, 1000)
// );

// player
//   .setCurrentTime(localStorage.getItem(CURRENT_TIME))
//   .catch(function (error) {
//     console.error(error);
//   });
