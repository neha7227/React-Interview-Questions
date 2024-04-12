import React, { forwardRef } from "react";

export default forwardRef(function Note(
  { content, initialPos, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      style={{
        position: "absolute",
        left: `${initialPos?.x}px`,
        top: `${initialPos?.y}px`,
        border: "1px solid black",
        userSelect: "none",
        cursor: "move",
        backgroundColor: "lightgreen",
        width: "200px",
        padding: "10px",
      }}
      {...props}
    >
      🖋️ {content}
    </div>
  );
});

// export default Note;
