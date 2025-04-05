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
  { id: 'section6', label: 'Faculty & Enrollment' },
];

function Navbar({ activeSection }) {
  const navItemStyle = {
    marginRight: '10px',
    padding: '8px 12px',
    borderRadius: '20px',
    textDecoration: 'none',
    color: '#000',
    transition: 'background-color 0.3s, color 0.3s',
    fontWeight: 500
  };

  const activeStyle = {
    backgroundColor: '#00008Baa',
    color: '#fff'
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
        padding: '15px 20px'
      }}
    >
      <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0 }}>
        <li style={{ marginRight: 30,  fontWeight: 700 }}>Women in STEM 🌱</li>
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
          // Check if the section is at the top of the viewport (offset by navbar height)
          if (rect.top <= 70 && rect.bottom >= 70) {
            currentSection = item.id;
          }
        }
      });
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page is not at the top
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="App" style={{ paddingBottom: 100, paddingTop: 60 }}>
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
        <h2>Gender Composition of Degrees and transition to STEM Occupation</h2>
        <SankeyChart />
      </div>
      <div id="section4" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <h2>Gender Wage Gap Across STEM Occupations</h2>
        <BubbleChart />
      </div>
      <div id="section5" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <h2 style={{ marginBottom: 30 }}>Women Participation in R&D by Sector</h2>
        <StreamGraph />
      </div>
      <div id="section6" style={{ paddingTop: '80px', marginTop: '-80px' }}>
        <h2 style={{ marginTop: 80 }}>
          Relationship Between Gender Representation in Faculty Positions and Student Enrollment in STEM
        </h2>
        <ScatterPlot />
      </div>
    </div>
  );
}

export default App;
