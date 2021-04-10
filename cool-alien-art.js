const canvas = document.createElement('canvas');

let pattern = '((x - 128) * 64) % (y - 128)';
let isColor = true;

function draw() {
  const width = (canvas.width = window.innerWidth);
  const height = (canvas.height = window.innerHeight);

  const ctx = canvas.getContext('2d');

  for (let x = 0; x < 256; x++) {
    for (let y = 0; y < 256; y++) {
      if (eval(pattern)) {
        ctx.fillStyle = isColor ? `hsl(${y}, 100%, 50%)` : '';
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

  initUI();
});

window.addEventListener('resize', () => {
  draw();
});

function initUI() {
  draggable(document.querySelector('aside'));

  const textarea = document.querySelector('textarea');
  const drawButton = document.querySelector('#draw');
  const downloadButton = document.querySelector('#download');
  const color = document.querySelector('#color');

  textarea.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });

  // draw
  drawButton.addEventListener('click', () => {
    pattern = textarea.value;
    draw();
  });

  // download
  downloadButton.addEventListener('click', () => {
    const a = document.createElement('a');

    a.download = 'cool-alien-art.png';
    a.href = canvas.toDataURL();
    a.target = '_blank';

    a.click();
  });

  // color
  color.addEventListener('click', (e) => {
    isColor = e.target.checked;
    draw();
  });
}

/**
 * Makes an element draggable.
 *
 * https://gist.github.com/remarkablemark/5002d27442600510d454a5aeba370579
 *
 * @param {HTMLElement} element - The element.
 */
function draggable(element) {
  var isMouseDown = false;

  // initial mouse X and Y for `mousedown`
  var mouseX;
  var mouseY;

  // element X and Y before and after move
  var elementX = 0;
  var elementY = 0;

  // mouse button down over the element
  element.addEventListener('mousedown', onMouseDown);

  /**
   * Listens to `mousedown` event.
   *
   * @param {Object} event - The event.
   */
  function onMouseDown(event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
    isMouseDown = true;
  }

  // mouse button released
  element.addEventListener('mouseup', onMouseUp);

  /**
   * Listens to `mouseup` event.
   *
   * @param {Object} event - The event.
   */
  function onMouseUp(event) {
    isMouseDown = false;
    elementX = parseInt(element.style.left) || 0;
    elementY = parseInt(element.style.top) || 0;
  }

  // need to attach to the entire document
  // in order to take full width and height
  // this ensures the element keeps up with the mouse
  document.addEventListener('mousemove', onMouseMove);

  /**
   * Listens to `mousemove` event.
   *
   * @param {Object} event - The event.
   */
  function onMouseMove(event) {
    if (!isMouseDown) return;
    var deltaX = event.clientX - mouseX;
    var deltaY = event.clientY - mouseY;
    element.style.left = elementX + deltaX + 'px';
    element.style.top = elementY + deltaY + 'px';
  }
}
