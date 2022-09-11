import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTime = 'videoplayer - current - time';

player.on(
  'timeupdate',
  throttle(e => {
    localStorage.setItem(currentTime, e.seconds);
  }, 1000)
);

player
  .setCurrentTime(localStorage.getItem(currentTime))
  .catch(function (error) {
    console.error(error);
  });
