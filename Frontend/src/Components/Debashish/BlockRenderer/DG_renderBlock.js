import React from "react";

function DG_renderBlock({ blocks }) {
  const renderContent = (block) => {
    console.log(block);
    if (block.tag == null) return;
    if (block.tag == "")
      return <span className={block.className}>{block.text}</span>;
    else if (block.tag == "Paragraph")
      return <p className={block.className}>{console.log("hit")}hi</p>;
    else if (block.tag == "Link")
      return (
        <a
          onClick={() => {
            window.open(block.text, "_blank");
          }}
          className={block.className}
          href="#"
        >
          {block.text}
        </a>
      );
    else if (block.tag == "Response") {
      let buttonText = block.text.split(" ");
      return buttonText.map((item) => {
        return <button>{item}</button>;
      });
    }
  };
  return (
    <div>
      {blocks.map((item) => {
        return <div key={item._id}>{renderContent(item)}</div>;
      })}
    </div>
  );
}

export default React.memo(DG_renderBlock);
