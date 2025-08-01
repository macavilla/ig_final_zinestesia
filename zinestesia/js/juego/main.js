console.log("main js :>> ");

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

        // Usamos setState con callback para evitar race conditions
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
    console.log("e :>> ", e);
  };

  return (
    <div className="zine-builder">
      <h1>🎨 Zine Builder</h1>
      <div className="palette">
        {emojis.map((emoji) => (
          <DraggableItem key={emoji} type={emoji} />
        ))}
        {images.map((img) => (
          <DraggableItem key={img.id} type={img.src} img={img} />
        ))}
      </div>

      <div>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          multiple
          onChange={handleUpload}
        />
      </div>
      <div className="canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
        {elements.map((el) => (
          <div
            className="element"
            key={el.id}
            style={{ top: el.y, left: el.x }}
          >
            {el.image ? (
              <img
                src={el.image}
                alt="elemento visual"
                style={{ maxWidth: "150px" }}
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
      e.dataTransfer.setData("image", img.src); // setear imagen para datatransfer
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
