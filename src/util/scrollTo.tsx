const easeInOutCubic = (t: number, b: number, c: number, d: number) => (t /= d / 2) < 1 ? c / 2 * t * t * t + b : c / 2 * ((t -= 2) * t * t + 2) + b;

export function scrollTo(scrollTo: number, duration: number = 333): Promise<boolean> {
  const start = (window.pageYOffset || document.documentElement.scrollTop)  - (document.documentElement.clientTop || 0);
  const change = scrollTo - start;
  let previousTime = window.performance.now();
  let currentTime = 0;

  const ret: Promise<boolean> = new Promise((resolve, _reject) => {
    const animateScroll = function animateScroll() {
      const time = window.performance.now();
      const increment = time - previousTime;
      previousTime = time;
      currentTime += increment;
      (document.scrollingElement || window).scrollTo(0, easeInOutCubic(currentTime, start, change, duration));

      if (currentTime < duration) {
        return window.requestAnimationFrame(animateScroll);
      }
      resolve(true);
    };
    animateScroll();
  });

  return ret;
};
