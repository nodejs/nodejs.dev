import { calcNavScrollParams } from '../../src/util/scrollTo';

describe('Tests for calcNavScrollParams', () => {
  const dummyHTMLElement = document.createElement('nav');
  const height = 100; // arbritrary
  it('scrollWindow is set null for mobile devices', () => {
    // @ts-ignore
    window.innerWidth = 720;
    const { newScrollPos, scrollWindow, scrollTime } = calcNavScrollParams(
      height,
      dummyHTMLElement
    );
    expect(scrollWindow).toBeNull();
  });
});
