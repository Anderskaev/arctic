import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router";

export default function Card() {
  //const SERVER = "http://127.0.0.1:5000/api/postcard"
  const SERVER = "/api/postcard"
  
  const { id } = useParams();
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const currentUrlRef = useRef(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const loadImage = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${SERVER}/${id}`);
        if (!response.ok) throw new Error('Image not found');
        const blob = await response.blob();
        if (cancelled) return;
        if (currentUrlRef.current) URL.revokeObjectURL(currentUrlRef.current);
        const url = URL.createObjectURL(blob);
        currentUrlRef.current = url;
        setImageSrc(url);
      } catch (err) {
        console.error("Ошибка загрузки:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    loadImage();
    return () => { cancelled = true; };
  }, [id]);

  useEffect(() => {
    return () => {
      if (currentUrlRef.current) URL.revokeObjectURL(currentUrlRef.current);
    };
  }, []);

  // Скачать картинку
  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = imageSrc;
    a.download = `postcard-${id}.png`;
    a.click();
  };

  // Скопировать ссылку на страницу
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Нативный share (мобильные браузеры)
  const handleShare = async () => {
    const blob = await fetch(imageSrc).then(r => r.blob());
    const file = new File([blob], `postcard-${id}.png`, { type: 'image/png' });

    if (navigator.share && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: `Postcard "Meet the Arctic"`,
        url: `https://mta.anderskaev.ru`,
        files: [file],
      });
    } else {
      // Fallback — просто копируем ссылку
      handleCopyLink();
    }
  };

  if (loading && !imageSrc) return <p>Loading postcard</p>;

  return (
    <>
    <div className='section'>
      <div className='postcard'>
        {imageSrc && (
          <>
            <img
              src={imageSrc}
              alt={`Postcard ${id}`}
              style={{ maxWidth: '100%', borderRadius: '8px' }}
            />
          </>
        )}
      </div>
      <div className='postcard-actions'>
        <button className='btn' onClick={handleDownload}>⬇ Download</button>
        <button className='btn' onClick={handleCopyLink}>{copied ? '✓ Copied!' : '🔗 Copy link'}</button>
        <button className='btn' onClick={handleShare}>↗ Share</button>
      </div>
</div>      
    </>
  );
}