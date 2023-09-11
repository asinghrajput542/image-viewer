import { Suspense, useEffect, useState, lazy } from "react";
import "./App.css";
const ImageModal = lazy(() => import("./components/ImageModal.jsx"));

function App() {
  const [images, setImages] = useState([]);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    getImages();
  }, []);

  const getImages = async () => {
    try {
      const LIMIT = 100;
      const result = await fetch(
        `https://picsum.photos/v2/list?limit=${LIMIT}`
      );
      const data = await result.json();
      console.log("---- ", data);
      setImages(data);
    } catch (error) {
      throw new Error("Unknown error");
    }
  };

  const onClose = () => {
    setActiveImage(null);
  };

  const handleImageClick = (itm) => {
    setActiveImage(itm);
  };

  const goNext = () => {
    setActiveImage((prev) => {
      const newId = parseInt(prev.id) + 1;
      if (newId > images.length - 1) {
        return images[prev.id];
      }
      return images[newId];
    });
  };

  const goBack = () => {
    setActiveImage((prev) => {
      const newId = parseInt(prev.id) - 1;
      if (newId < 0) {
        return images[prev.id];
      }
      return images[newId];
    });
  };

  return (
    <div className="container">
      {images.map((itm) => (
        <img
          loading="lazy"
          src={itm.download_url}
          key={images.id}
          width="100px"
          onClick={() => handleImageClick(itm)}
        />
      ))}
      {activeImage && (
        <Suspense fallback="loading image ...">
          <ImageModal
            activeImage={activeImage}
            onClose={onClose}
            goNext={goNext}
            goBack={goBack}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
