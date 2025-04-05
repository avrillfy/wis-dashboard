import * as React from 'react';
import {
  Sankey,
  Tooltip,
  ResponsiveContainer,
  Layer,
  Rectangle,
} from 'recharts';

const data = {
  nodes: [
    { name: "Female Bachelor's" }, // 0
    { name: "Female Master's" }, // 1
    { name: 'Female Doctorate' }, // 2
    { name: "Male Bachelor's" }, // 3
    { name: "Male Master's" }, // 4
    { name: 'Male Doctorate' }, // 5
    { name: 'STEM occupation' }, // 6
    { name: 'Non-STEM occupation' }, // 7
  ],
  links: {
    2003: [
      { source: 0, target: 6, value: 2324000 },
      { source: 0, target: 7, value: 7198000 },
      { source: 1, target: 6, value: 1136000 },
      { source: 1, target: 7, value: 3295000 },
      { source: 2, target: 6, value: 221000 },
      { source: 2, target: 7, value: 736000 },
      { source: 3, target: 6, value: 2985000 },
      { source: 3, target: 7, value: 7858000 },
      { source: 4, target: 6, value: 1478000 },
      { source: 4, target: 7, value: 2769000 },
      { source: 5, target: 6, value: 506000 },
      { source: 5, target: 7, value: 343000 },
    ],

    2010: [
      { source: 0, target: 6, value: 3055000 },
      { source: 0, target: 7, value: 9538000 },
      { source: 1, target: 6, value: 1559000 },
      { source: 1, target: 7, value: 4279000 },
      { source: 2, target: 6, value: 301000 },
      { source: 2, target: 7, value: 1027000 },
      { source: 3, target: 6, value: 3710000 },
      { source: 3, target: 7, value: 9052000 },
      { source: 4, target: 6, value: 1850000 },
      { source: 4, target: 7, value: 3430000 },
      { source: 5, target: 6, value: 615000 },
      { source: 5, target: 7, value: 364000 },
    ],

    2013: [
      { source: 0, target: 6, value: 3326000 },
      { source: 0, target: 7, value: 10579000 },
      { source: 1, target: 6, value: 1731000 },
      { source: 1, target: 7, value: 4748000 },
      { source: 2, target: 6, value: 339000 },
      { source: 2, target: 7, value: 1072000 },
      { source: 3, target: 6, value: 4028000 },
      { source: 3, target: 7, value: 9871000 },
      { source: 4, target: 6, value: 1904000 },
      { source: 4, target: 7, value: 3346000 },
      { source: 5, target: 6, value: 621000 },
      { source: 5, target: 7, value: 333000 },
    ],

    2015: [
      { source: 0, target: 6, value: 3385000 },
      { source: 0, target: 7, value: 10821000 },
      { source: 1, target: 6, value: 2046000 },
      { source: 1, target: 7, value: 5150000 },
      { source: 2, target: 6, value: 368000 },
      { source: 2, target: 7, value: 1170000 },
      { source: 3, target: 6, value: 4355000 },
      { source: 3, target: 7, value: 9948000 },
      { source: 4, target: 6, value: 2093000 },
      { source: 4, target: 7, value: 3599000 },
      { source: 5, target: 6, value: 612000 },
      { source: 5, target: 7, value: 384000 },
    ],

    2017: [
      { source: 0, target: 6, value: 3633000 },
      { source: 0, target: 7, value: 11891000 },
      { source: 1, target: 6, value: 2075000 },
      { source: 1, target: 7, value: 5284000 },
      { source: 2, target: 6, value: 405000 },
      { source: 2, target: 7, value: 1283000 },
      { source: 3, target: 6, value: 4552000 },
      { source: 3, target: 7, value: 10055000 },
      { source: 4, target: 6, value: 2256000 },
      { source: 4, target: 7, value: 3645000 },
      { source: 5, target: 6, value: 647000 },
      { source: 5, target: 7, value: 415000 },
    ],

    2019: [
      { source: 0, target: 6, value: 3879000 },
      { source: 0, target: 7, value: 12142000 },
      { source: 1, target: 6, value: 2226000 },
      { source: 1, target: 7, value: 5915000 },
      { source: 2, target: 6, value: 553000 },
      { source: 2, target: 7, value: 1280000 },
      { source: 3, target: 6, value: 5091000 },
      { source: 3, target: 7, value: 10262000 },
      { source: 4, target: 6, value: 2393000 },
      { source: 4, target: 7, value: 3625000 },
      { source: 5, target: 6, value: 772000 },
      { source: 5, target: 7, value: 419000 },
    ],

    2021: [
      { source: 0, target: 6, value: 4143000 },
      { source: 0, target: 7, value: 11685000 },
      { source: 1, target: 6, value: 2396000 },
      { source: 1, target: 7, value: 5918000 },
      { source: 2, target: 6, value: 540000 },
      { source: 2, target: 7, value: 1466000 },
      { source: 3, target: 6, value: 5327000 },
      { source: 3, target: 7, value: 10534000 },
      { source: 4, target: 6, value: 2593000 },
      { source: 4, target: 7, value: 3781000 },
      { source: 5, target: 6, value: 796000 },
      { source: 5, target: 7, value: 458000 },
    ],

    2023: [
      { source: 0, target: 6, value: 4946000 },
      { source: 0, target: 7, value: 12902000 },
      { source: 1, target: 6, value: 2812000 },
      { source: 1, target: 7, value: 6289000 },
      { source: 2, target: 6, value: 646000 },
      { source: 2, target: 7, value: 1595000 },
      { source: 3, target: 6, value: 6005000 },
      { source: 3, target: 7, value: 10548000 },
      { source: 4, target: 6, value: 2883000 },
      { source: 4, target: 7, value: 3796000 },
      { source: 5, target: 6, value: 888000 },
      { source: 5, target: 7, value: 472000 },
    ],
  },
};

function Node({ x, y, width, height, index, payload, containerWidth }) {
  const isOut = x + width + 6 > containerWidth;
  return (
    <Layer key={`CustomNode${index}`}>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={
          payload.name.includes('STEM')
            ? '#924BA4'
            : payload.name.includes('Female')
            ? '#ff589b'
            : '#6c63ff'
        }
        fillOpacity="1"
      />
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2}
        fontSize="14"
        stroke="#333"
      >
        {payload.name}
      </text>
      <text
        textAnchor={isOut ? 'end' : 'start'}
        x={isOut ? x - 6 : x + width + 6}
        y={y + height / 2 + 13}
        fontSize="12"
        stroke="#333"
        strokeOpacity="0.5"
      >
        {payload.value.toLocaleString()}
      </text>
    </Layer>
  );
}

// Custom link renderer that sets the stroke color based on the source node
const CustomLink = (props) => {
  const {
    payload: { source },
    sourceX,
    targetX,
    sourceY,
    targetY,
    sourceControlX,
    targetControlX,
    linkWidth,
  } = props;
  console.log(props);
  // Check source node's name to determine the link color
  const strokeColor = source.name.includes('Male')
    ? '#6c63ff22'
    : source.name.includes('Female')
    ? '#ff589b22'
    : undefined;
  return (
    <path
      d={`
      M${sourceX},${sourceY + linkWidth / 2}
      C${sourceControlX},${sourceY + linkWidth / 2}
        ${targetControlX},${targetY + linkWidth / 2}
        ${targetX},${targetY + linkWidth / 2}
      L${targetX},${targetY - linkWidth / 2}
      C${targetControlX},${targetY - linkWidth / 2}
        ${sourceControlX},${sourceY - linkWidth / 2}
        ${sourceX},${sourceY - linkWidth / 2}
      Z
    `}
      fill={strokeColor}
      strokeWidth="0"
    />
  );
};

const SankeyChart = () => {
  const [year, setYear] = React.useState(2003);

  return (
    <div style={{ width: '100vw', margin: '0 auto' }}>
      {Object.keys(data.links).map((linkYear) => (
        <button
          onClick={() => {
            setYear(linkYear);
          }}
          key={linkYear}
          style={{
            ...(year.toString() === linkYear.toString()
              ? {
                  borderColor: 'blue',
                  color: 'blue',
                }
              : {}),
            marginLeft: 10,
            padding: '10px 20px',
            fontSize: 16,
            cursor: 'pointer'
          }}
        >
          {linkYear}
        </button>
      ))}
      <ResponsiveContainer width="100%" height={1000}>
        <Sankey
          data={{ ...data, links: data.links[year] }}
          node={<Node />}
          nodePadding={50}
          margin={{
            left: 200,
            right: 200,
            top: 100,
            bottom: 100,
          }}
          link={<CustomLink />}
          sort={false}
        >
          <Tooltip />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
};

export default SankeyChart;
