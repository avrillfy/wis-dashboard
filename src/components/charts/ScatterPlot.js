import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

// Sample data for five fields of study
const dataEngineering = [
  { femaleStudents: 20, femaleFaculty: 15 },
  { femaleStudents: 30, femaleFaculty: 25 },
  { femaleStudents: 25, femaleFaculty: 20 },
];

const dataSciences = [
  { femaleStudents: 40, femaleFaculty: 35 },
  { femaleStudents: 50, femaleFaculty: 45 },
  { femaleStudents: 45, femaleFaculty: 40 },
];

const dataArts = [
  { femaleStudents: 60, femaleFaculty: 55 },
  { femaleStudents: 70, femaleFaculty: 65 },
  { femaleStudents: 65, femaleFaculty: 60 },
];

const dataBusiness = [
  { femaleStudents: 30, femaleFaculty: 28 },
  { femaleStudents: 35, femaleFaculty: 30 },
  { femaleStudents: 32, femaleFaculty: 29 },
];

const dataEducation = [
  { femaleStudents: 80, femaleFaculty: 75 },
  { femaleStudents: 85, femaleFaculty: 80 },
  { femaleStudents: 82, femaleFaculty: 77 },
];

// Custom tooltip component with bullet points
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const entry = payload[0];
    return (
      <div
        style={{
          backgroundColor: '#fff',
          border: '1px solid #ccc',
          padding: '10px',
        }}
      >
        <div style={{ marginBottom: '5px' }}>
          <p>Female faculty: {entry.payload.femaleFaculty}%</p>
          <p>Female students: {entry.payload.femaleStudents}%</p>
        </div>
      </div>
    );
  }
  return null;
};

const MyScatterChart = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <ScatterChart
        width={1000}
        height={600}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="femaleStudents"
          name="% of female students"
          label={{
            value: '% of female students',
            position: 'insideBottom',
            offset: -5,
          }}
        />
        <YAxis
          type="number"
          dataKey="femaleFaculty"
          name="% of female faculty"
          label={{
            value: '% of female faculty',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip
          content={<CustomTooltip />}
          cursor={{ strokeDasharray: '3 3' }}
        />
        <Legend wrapperStyle={{ paddingTop: 30 }} />
        <Scatter name="Engineering" data={dataEngineering} fill="#8884d8" />
        <Scatter name="Sciences" data={dataSciences} fill="#82ca9d" />
        <Scatter name="Arts" data={dataArts} fill="#ffc658" />
        <Scatter name="Business" data={dataBusiness} fill="#ff7300" />
        <Scatter name="Education" data={dataEducation} fill="#d0ed57" />
      </ScatterChart>
    </div>
  );
};

export default MyScatterChart;
