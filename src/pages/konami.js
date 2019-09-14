(function konami() {
  // http://stackoverflow.com/a/9849276
  function contains(a, b) {
    // eslint-disable-next-line no-bitwise
    return !!~a.indexOf(b);
  }

  const konamiCode = {
    init() {
      this.KEY_LEFT = 37;
      this.KEY_UP = 38;
      this.KEY_RIGHT = 39;
      this.KEY_DOWN = 40;
      this.KEY_A = 65;
      this.KEY_B = 66;
      this.CODE_SEQUENCE = '38384040373937396665'; // ⬆ ⬆ ⬇ ⬇ ⬅ ➡ ⬅ ➡ b a
      this.maxDelay = 1500;

      this.bindListener();

      return this;
    },
    bindListener() {
      let buffer = '';
      let lastDate = new Date();
      const konamiCodeEvent = new Event('konamiCode');
      const validKeys = [
        this.KEY_LEFT,
        this.KEY_UP,
        this.KEY_RIGHT,
        this.KEY_DOWN,
        this.KEY_A,
        this.KEY_B,
      ];

      document.addEventListener(
        'keyup',
        function enableKonami(ev) {
          if (
            contains(validKeys, ev.keyCode) &&
            new Date() - lastDate <= this.maxDelay
          ) {
            lastDate = new Date();
            buffer += ev.keyCode;

            if (contains(buffer, this.CODE_SEQUENCE)) {
              document.dispatchEvent(konamiCodeEvent);
              buffer = '';
            }
          } else {
            lastDate = new Date();
            buffer = '';
          }
        }.bind(this)
      );
    },
  };

  return konamiCode.init();
})();
