const emojis = [
  "✌",
  "😂",
  "😝",
  "😁",
  "😱",
  "👉",
  "🙌",
  "🍻",
  "🔥",
  "🌈",
  "☀",
  "🎈",
  "🌹",
  "💄",
  "🎀",
  "⚽",
];

const { useState } = React;

const ZineBuilder = () => {
  const [elements, setElements] = useState([]);
  const [images, setImages] = useState([]);
  const [draggedId, setDraggedId] = useState(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = [];

    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        newImages.push({
          id: crypto.randomUUID(),
          src: ev.target.result,
          x: 100,
          y: 100,
          scale: 1,
          rotation: 0,
        });

        setImages((prev) => [...prev, ...newImages]);
      };
      reader.readAsDataURL(file);
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const type = e.dataTransfer.getData("type");
    const image = e.dataTransfer.getData("image");

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        image,
        x,
        y,
      },
    ]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleMouseDown = (e, id) => {
    const element = elements.find((el) => el.id === id);
    if (!element) return;

    setDraggedId(id);
    setOffset({
      x: e.clientX - element.x,
      y: e.clientY - element.y,
    });
  };

  const handleMouseMove = (e) => {
    if (draggedId === null) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - offset.x;
    const y = e.clientY - rect.top - offset.y;

    setElements((prev) =>
      prev.map((el) => (el.id === draggedId ? { ...el, x, y } : el))
    );
  };
  const handleMouseUp = () => {
    setDraggedId(null);
  };

  return (
    <div className="zine-builder">
      <h1>🎨 Zine Builder</h1>
      <div className="palette">
        {emojis.map((emoji) => (
          <DraggableItem key={emoji} type={emoji} />
        ))}
      </div>
      {images.length > 0 && (
        <div className="palette">
          {images.map((img) => (
            <DraggableItem key={img.id} type={img.src} img={img} />
          ))}
        </div>
      )}

      <div className="uploader">
        <label htmlFor="image-upload">Subir una imagen</label>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          onChange={handleUpload}
        />
      </div>
      <div
        className="canvas"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {elements.map((el) => (
          <div
            className="element"
            key={el.id}
            style={{ top: el.y, left: el.x }}
            onMouseDown={(e) => handleMouseDown(e, el.id)}
          >
            {el.image ? (
              <img
                src={el.image}
                alt="imagen dropeada"
                style={{ maxWidth: "90%" }}
              />
            ) : (
              <span>{el.type}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const DraggableItem = ({ type, img }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("type", type);
    if (img) {
      e.dataTransfer.setData("image", img.src);
    }
  };

  return (
    <span draggable onDragStart={handleDragStart} className="draggable">
      {img ? (
        <img className="image" src={img.src} alt={"Imagen subida" + img.src} />
      ) : (
        type
      )}
    </span>
  );
};

ReactDOM.createRoot(document.getElementById("juego")).render(<ZineBuilder />);
