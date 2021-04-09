const canvas = document.createElement('canvas');

function draw() {
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const ctx = canvas.getContext('2d');

  for (let x = 0; x < 256; x++) {
    for (let y = 0; y < 256; y++) {
      if (((x - 128) * 64) % (y - 128)) {
        ctx.fillStyle = `hsl(${y}, 100%, 50%)`;
        ctx.fillRect(
          x * 4 * (width / 1024),
          y * 4 * (height / 1024),
          4 * (width / 1024),
          4 * (height / 1024)
        );
      }
    }
  }

  document.body.style.background = `url(${canvas.toDataURL()}) no-repeat fixed center/cover`;
}

window.addEventListener('DOMContentLoaded', () => {
  draw();
});

window.addEventListener('resize', () => {
  draw();
});
