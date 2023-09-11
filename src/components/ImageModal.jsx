import "./ImageModal.css";
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons";

const ImageModal = ({ activeImage, onClose, goNext, goBack }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <img src={activeImage.download_url} alt={activeImage.author} />
        <button className="modal-close" onClick={onClose}>
          close
        </button>
        <div className="arrow-btn">
          <div className="prev" onClick={goBack}>
            <CaretLeftOutlined />
          </div>
          <div className="next" onClick={goNext}>
            <CaretRightOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
