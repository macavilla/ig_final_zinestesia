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
  "🎾",
  "🏁",
  "😡",
  "👿",
  "🐻",
  "🐶",
  "🐬",
  "🐟",
  "🍀",
  "👀",
  "🚗",
  "🍎",
  "💝",
  "💙",
  "👌",
  "❤",
  "😍",
  "😉",
  "😓",
  "😳",
  "💪",
  "💩",
  "🍸",
  "🔑",
  "💖",
  "🌟",
  "🎉",
  "🌺",
  "🎶",
  "👠",
  "🏈",
  "⚾",
  "🏆",
  "👽",
  "💀",
  "🐵",
  "🐮",
  "🐩",
  "🐎",
  "💣",
  "👃",
  "👂",
  "🍓",
  "💘",
  "💜",
  "👊",
  "💋",
  "😘",
  "😜",
  "😵",
  "🙏",
  "👋",
  "🚽",
  "💃",
  "💎",
  "🚀",
  "🌙",
  "🎁",
  "⛄",
  "🌊",
  "⛵",
  "🏀",
  "🎱",
  "💰",
  "👶",
  "👸",
  "🐰",
  "🐷",
  "🐍",
  "🐫",
  "🔫",
  "👄",
  "🚲",
  "🍉",
  "💛",
  "💚",
];

const { useState } = React;

const ZineBuilder = () => {
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData("type");

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements([...elements, { type, x, y, id: Date.now() }]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="zine-builder">
      <h1>🎨 Zine Builder</h1>
      <div className="palette">
        {emojis.map((emoji) => (
          <DraggableItem key={emoji} type={emoji} />
        ))}
      </div>
      <div className="canvas" onDrop={handleDrop} onDragOver={handleDragOver}>
        {elements.map((el) => (
          <span
            key={el.id}
            style={{ position: "absolute", top: el.y, left: el.x }}
          >
            {el.type}
          </span>
        ))}
      </div>
    </div>
  );
};

const DraggableItem = ({ type }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData("type", type);
  };

  return (
    <span draggable onDragStart={handleDragStart} className="draggable">
      {type}
    </span>
  );
};

ReactDOM.createRoot(document.getElementById("juego")).render(<ZineBuilder />);
