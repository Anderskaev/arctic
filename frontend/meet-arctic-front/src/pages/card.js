import { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router";

const blank_city = { "id":1, "id_country": 9, "name": "Arctic City", "country": "The World", "lowTemp": -71, "avgTemp": -9, "longitude": 0.0, "latitude": 90.00, "population": 4000000, "descr": "The Arctic is the northernmost region of Earth, primarily consisting of the Arctic Ocean and parts of Russia, the United States (Alaska), Canada, Norway, Denmark (Greenland), Sweden, Finland, and Iceland." };

export default function Card({cities}) {
  //const SERVER = "http://127.0.0.1:5000/api/postcard"
  const SERVER = "/api/postcard"
  
  const { id } = useParams();
  const [imageSrc, setImageSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [city, setCity] = useState(blank_city)

  const currentUrlRef = useRef(null);


  useEffect(() => {
    if (!id) return;

    let cancelled = false;   
    
    let c = cities.filter(f => f.id === Number(id))[0];
    if(!c) c = blank_city;
    setCity(c);
    
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
  }, [id, cities]);

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

  if (loading && !imageSrc ) return <p>Loading postcard</p>;
  if (!city) return <p>Loading city</p>

  return (
    <>
    <div className='section'>
    <h2>{city.name}, {city.country}</h2>
      <div className='postcard'>
        {imageSrc && (
          <>
            <img
              src={imageSrc}
              alt={`Postcard ${city.name}, ${city.country}`}
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
