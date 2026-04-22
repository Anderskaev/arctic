// src/components/functions.test.js

import { formatLatitude, formatLongitude, formatPop, getTempColor } from './functions';

// ─── formatLatitude ───────────────────────────────────────────────────────────

describe('formatLatitude', () => {

  test('обычные значения', () => {
    expect(formatLatitude(68.9585)).toBe("68°58′ N");
    expect(formatLatitude(90)).toBe("90°0′ N");
    expect(formatLatitude(0)).toBe("0°0′ N");
  });

  test('южное полушарие', () => {
    expect(formatLatitude(-45.5)).toBe("45°30′ S");
  });

  test('overflow минут → градусы', () => {
    // 68.9999° → минуты = 59.994 → round = 60 → должно стать 69°0′, не 68°60′
    expect(formatLatitude(68.9999)).toBe("69°0′ N");
  });

});

// ─── formatLongitude ──────────────────────────────────────────────────────────

describe('formatLongitude', () => {

  test('восточная долгота', () => {
    expect(formatLongitude(33.0827)).toBe("33°5′ E");
  });

  test('западная долгота', () => {
    expect(formatLongitude(-62.3481)).toBe("62°21′ W");
  });

});

// ─── formatPop ────────────────────────────────────────────────────────────────

describe('formatPop', () => {

  test('маленькие числа — без форматирования', () => {
    expect(formatPop(5)).toBe("5");
    expect(formatPop(99)).toBe("99");
  });

  test('тысячи', () => {
    expect(formatPop(1000)).toBe("1K");
    expect(formatPop(77203)).toBe("77K");
    expect(formatPop(999999)).toBe("1000K"); // интересный граничный случай
  });

  test('миллионы', () => {
    expect(formatPop(1500000)).toBe("1.5M");
    expect(formatPop(295374)).toBe("295K");
  });

});

// ─── getTempColor ─────────────────────────────────────────────────────────────

describe('getTempColor', () => {

  test('экстремальный холод', () => {
    expect(getTempColor(-70)).toBe('var(--arctic-900)');
    expect(getTempColor(-75)).toBe('var(--arctic-900)');
  });

  test('градации', () => {
    expect(getTempColor(-65)).toBe('var(--arctic-800)');
    expect(getTempColor(-55)).toBe('var(--arctic-700)');
    expect(getTempColor(-45)).toBe('var(--arctic-600)');
    expect(getTempColor(-35)).toBe('var(--arctic-500)');
    expect(getTempColor(-25)).toBe('var(--arctic-400)');
  });

  test('⚠️ выше -20 — функция возвращает undefined', () => {
    // Этот тест упадёт — и это правильно, это реальный баг
    expect(getTempColor(-10)).toBeDefined();
    expect(getTempColor(0)).toBeDefined();
  });

});