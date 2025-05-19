/**
 * @jest-environment jsdom
 */
import fs from 'fs';
import path from 'path';

const html = fs.readFileSync(path.resolve(__dirname, '../views/index.html'), 'utf8');

describe('🎧 Productivity Soundscapes', () => {
  let audio;

  beforeEach(() => {
    document.documentElement.innerHTML = html.toString();
    require('../script.js'); // Adjust path if needed
    audio = new Audio('/sounds/rain.mp3');
  });

  test('should play sound when "Play" button is clicked', () => {
    const playButton = document.querySelector('#playButton'); // Make sure this ID exists
    audio.play = jest.fn(); // mock play
    playButton.click();
    expect(audio.play).toHaveBeenCalled();
  });

  test('should loop audio', () => {
    expect(audio.loop).toBe(true);
  });

  test('should change sound when different option selected', () => {
    const dropdown = document.querySelector('#soundSelect');
    dropdown.value = 'forest';
    dropdown.dispatchEvent(new Event('change'));

    expect(audio.src.includes('forest')).toBe(true);
  });
});
