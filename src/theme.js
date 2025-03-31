// theme.js

const theme = {
    colors: {
      // Gradients
      gradientPrimary: 'linear-gradient(135deg, #6C63FF 0%, #9F86FF 100%)',
  
      // Solid Colors
      primary: '#6C63FF',
      secondary: '#3CC9A7',
      backgroundLight: '#FFFFFF',
      backgroundDark: '#F9FAFB', // subtle off-white
      textPrimary: '#1F2937',    // near-black
      textSecondary: '#6B7280',  // gray-500
      borderColor: '#E5E7EB',    // gray-200
  
      // Status or Utility Colors
      success: '#10B981',
      warning: '#F59E0B',
      danger:  '#EF4444',
    },
  
    // 2. Typography
    typography: {
      fontFamily: "'Inter', sans-serif",
      h1: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.2,
        color: '#1F2937',
      },
      h2: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.3,
        color: '#1F2937',
      },
      h3: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.3,
        color: '#1F2937',
      },
      body: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.5,
        color: '#1F2937',
      },
      small: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.4,
        color: '#6B7280',
      },
    },
  
    // 3. Layout & Spacing
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
    },
  
    // 4. Shadows & Border Radius
    effects: {
      boxShadowLight: '0 1px 3px rgba(0, 0, 0, 0.08)',
      boxShadowMedium: '0 4px 6px rgba(0, 0, 0, 0.06)',
      boxShadowHover: '0 6px 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '8px',
    },
  
    // 5. Breakpoints (Optional)
    breakpoints: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
  };
  
  export default theme;
  