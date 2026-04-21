import { useState, useEffect } from 'react';

export function useMediaQuery(query) {
  // Инициализируем состояние текущим значением (важно для клиентского рендеринга)
  const [matches, setMatches] = useState(() => {
    // Проверка на наличие window для поддержки SSR (Next.js и т.д.)
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia(query);
    
    // Обновляем состояние при изменении
    const listener = (event) => setMatches(event.matches);

    // Современный способ подписки
    media.addEventListener('change', listener);

    // Устанавливаем актуальное значение при монтировании
    setMatches(media.matches);

    // Чистим за собой
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

export function getTempColor (temp) {
  if (temp <= -70) return 'var(--arctic-900)';
  if (temp <= -60) return 'var(--arctic-800)';
  if (temp <= -50) return 'var(--arctic-700)';
  if (temp <= -40) return 'var(--arctic-600)';
  if (temp <= -30) return 'var(--arctic-500)';
  if (temp <= -20) return 'var(--arctic-400)';
  //return 'var(--arctic-300)'; // Для "теплой" погоды (выше нуля)
};

export function formatPop(n) {
  if (n < 100) return n.toString();
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return n.toLocaleString();
}