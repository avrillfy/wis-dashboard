import React, { useState, useEffect } from 'react';
import './App.css';
import GenderTrendLineChart from './components/charts/GenderTrendLineChart';
import ClusterBarChart from './components/charts/ClusterBarChart';
import SankeyChart from './components/charts/SankeyChart';
import BubbleChart from './components/charts/BubbleChart';
import StreamGraph from './components/charts/StreamGraph';
import ScatterPlot from './components/charts/ScatterPlot';

const navItems = [
  { id: 'section1', label: 'STEM Degree Attainment' },
  { id: 'section2', label: 'STEM Fields' },
  { id: 'section3', label: 'Degrees & Occupation' },
  { id: 'section4', label: 'Wage Gap' },
  { id: 'section5', label: 'Women in R&D' },
  { id: 'section6', label: 'Doctoral Degrees and Wage Gap' },
];

function Navbar({ activeSection }) {
  const navItemStyle = {
    marginRight: '10px',
    padding: '8px 12px',
    borderRadius: '20px',
    textDecoration: 'none',
    color: '#000',
    transition: 'background-color 0.3s, color 0.3s',
    fontWeight: 500,
  };

  const activeStyle = {
    backgroundColor: '#00008Baa',
    color: '#fff',
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: '#fff',
        borderBottom: '1px solid #ccc',
        zIndex: 1000,
        padding: '15px 20px',
      }}
    >
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: 30, fontWeight: 700 }}>Women in STEM 🌱</li>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              style={{
                ...navItemStyle,
                ...(activeSection === item.id ? activeStyle : {}),
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      let currentSection = '';
      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 70 && rect.bottom >= 70) {
            currentSection = item.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App" style={{ paddingBottom: 1000, paddingTop: 60 }}>
      <Navbar activeSection={activeSection} />
      <div id="section1" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <h2>Gender Representation in STEM Degree Attainment Over Time</h2>
        <GenderTrendLineChart />
      </div>
      <div id="section2" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <h2>Gender Representation in STEM Fields</h2>
        <ClusterBarChart />
      </div>
      <div id="section3" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <h2>Gender Composition of Degrees and Transition to STEM Occupation</h2>
        <SankeyChart />
      </div>
      <div id="section4" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <h2>Gender Wage Gap Across STEM Occupations</h2>
        {/* Minimal info box */}
        <div
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            fontFamily: 'Poppins, sans-serif',
            fontSize: '20px',
            maxWidth: '800px',
            marginBottom: '-50px',
            margin: '20px auto'
          }}
          >
          <p style={{ margin: 0 }}>Gender Wage Gap = ((Median Salary M − Median Salary F) / Median Salary M) × 100%</p>
          <p style={{ margin: 10 }}></p>
          <p style={{ margin: 0 }}>Positive : Males paid more</p>
          <p style={{ margin: 5}}>Negative : Females paid more</p>
        </div>
        <BubbleChart />
      </div>
      <div id="section5" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <h2 style={{ marginBottom: 30 }}>Women Participation in R&D by Sector</h2>
        <StreamGraph />
      </div>
      <div id="section6" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <h2 style={{ marginTop: 80 }}>
          Women Participation across Doctoral Fields and Gender Wage Gap
        </h2>
        <ScatterPlot />
      </div>
    </div>
  );
}

export default App;
