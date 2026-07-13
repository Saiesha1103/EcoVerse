import React from "react";

export interface PixelSpriteProps {
  matrix: string[];
  palette: Record<string, string>;
  className?: string;
  style?: React.CSSProperties;
}

export function PixelSprite({
  matrix,
  palette,
  className,
  style,
}: PixelSpriteProps): React.ReactElement {
  const rows = matrix.length;
  const columns = matrix[0]?.length ?? 0;

  const mergedStyle: React.CSSProperties = {
    ...style,
    shapeRendering: "crispEdges",
    display: "block",
  };

  return (
    <svg
      className={className}
      style={mergedStyle}
      viewBox={`0 0 ${columns} ${rows}`}
      aria-hidden="true"
    >
      {matrix.map((row, rowIndex) =>
        row.split("").map((char, colIndex) => {
          if (char === ".") {
            return null;
          }

          const color = palette[char];

          if (!color) {
            return null;
          }

          return (
            <rect
              key={`${rowIndex}-${colIndex}`}
              x={colIndex}
              y={rowIndex}
              width={1}
              height={1}
              fill={color}
            />
          );
        }),
      )}
    </svg>
  );
}