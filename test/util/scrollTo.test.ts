import { calcNavScrollParams } from '../../src/util/scrollTo';

describe('Tests for calcNavScrollParams', () => {
  const mockHTMLElement = document.createElement('nav');
  const height = 100; // arbritrary
  it('scrollWindow is set null for mobile devices', () => {
    window.innerWidth = 720;
    const { scrollWindow } = calcNavScrollParams(height, mockHTMLElement);
    expect(scrollWindow).toBeValid();
  });
});
