import React from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ReferenceArea
} from 'recharts';

// Sample data for five fields of study
const lifeSciences = [
  { field: 'Agricultural and Food Sciences', femaleStudents: 30.6, wageGap: 24.2 },
  { field: 'Biochemistry and Biophysics', femaleStudents: 39.5, wageGap:  21.8},
  { field: 'Cell and Molecular Biology', femaleStudents: 49.8, wageGap: 20 },
  { field: 'Natural Resources and Conservation', femaleStudents: 32.7, wageGap: 7.0 },
  { field: 'Zoology', femaleStudents: 30.6, wageGap: 27.2 }
];

const computerScience = [
  { field: 'Computer and Information Sciences', femaleStudents: 19.6, wageGap: 9.1 }
];

const mathematics = [
  { field: 'Mathematics and Statistics', femaleStudents: 23.5, wageGap: 8.4 }
];

const physicalSciences = [
  { field: 'Astronomy and Astrophysics', femaleStudents: 23.6, wageGap: 7.8 },
  { field: 'Chemistry', femaleStudents: 29.4, wageGap:  13.2},
  { field: 'Geosciences', femaleStudents: 31.0, wageGap:  14.6},
  { field: 'Physics', femaleStudents: 14.8, wageGap:  8.7}
];

const psychology = [
  { field: 'Psychology', femaleStudents: 62.1, wageGap:  -5.3}
];

const socialSciences = [
  { field: 'Economics', femaleStudents: 29.1, wageGap:  12.4},
  { field: 'Political Science', femaleStudents: 38.3, wageGap:  6},
  { field: 'Sociology and Population Studies', femaleStudents: 54.9, wageGap: 0 },
];
const engineering = [
  { field: 'Aerospace and Aeronatical Engineering', femaleStudents: 10.1, wageGap: -17.3 },
  { field: 'Chemical Engineering', femaleStudents: 22.1, wageGap: 14.8 },
  { field: 'Civil Engineering', femaleStudents: 21.1, wageGap: 4.8 },
  { field: 'Electrical and Computer Engineering', femaleStudents: 12.5, wageGap: -10.3 },
  { field: 'Mechanical Engineering', femaleStudents: 13.6, wageGap: 6.93 },
  { field: 'Materials Engineering', femaleStudents: 18.7, wageGap: 9.1 },
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
          <p><b>{entry.payload.field}</b></p>
          <p>Wage Gap: {entry.payload.wageGap}%</p>
          <p>Proportion of Female Students: {entry.payload.femaleStudents}%</p>
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
          domain={[0, 100]}
          label={{
            value: '% of female students',
            position: 'insideBottom',
            offset: -15
          }}
        />
        <YAxis
          type="number"
          dataKey="wageGap"
          name="Wage Gap"
          domain={[-50, 50]}
          label={{
            value: 'Wage Gap',
            angle: -90,
            position: 'insideLeft',
            dy: 40
          }}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
        <Legend 
          wrapperStyle={{ paddingTop: 30 }}
          formatter={(value) => <span style={{ fontWeight: 'bold' }}>{value}</span>}
        />
        {/* Annotation: Reference line at 0 wage gap */}
        <ReferenceLine 
          y={0} 
          stroke="#000" 
          strokeDasharray="3 3"
          label={{ value: "Zero Wage Gap", position: "insideLeft", fill: "#000", fontWeight: "bold", dy: -10 }}
        />
        {/* Vertical reference line at 50% female participation */}
        <ReferenceLine 
          x={50}
          stroke="red"
          label={{ value: "Equal Gender Participation", position: "top", fill: "red", fontWeight: "bold" }}
        />
        {/*  Highlight the region where female participation is high (>=50%) and wage gap is negative */}
        <ReferenceArea 
          x1={50}
          x2={100}
          y1={-50}
          y2={0}
          label={{ value: "High Participation & Negative Wage Gap", fill: "green", fontSize: 16 }}
          strokeOpacity={0}
          fill="green"
          fillOpacity={0.1}
        />
        <Scatter name="Life Sciences" data={lifeSciences} fill="#8884d8" />
        <Scatter name="Computer Science" data={computerScience} fill="#82ca9d" />
        <Scatter name="Mathematical Sciences" data={mathematics} fill="#ffa726" />
        <Scatter name="Physical Sciences" data={physicalSciences} fill="#ff7300" />
        <Scatter name="Psychology" data={psychology} fill="#ff589b" />
        <Scatter name="Social Sciences" data={socialSciences} fill="#a4de6c" />
        <Scatter name="Engineering" data={engineering} fill="#8dd1e1" />
      </ScatterChart>
    </div>
  );
};

export default MyScatterChart;