import React from 'react';

const App: React.FC = () => {
  return (
    <div style={{ padding: '20px', backgroundColor: 'lightblue', minHeight: '100vh' }}>
      <h1 style={{ color: 'darkblue', fontSize: '24px' }}>Hello World!</h1>
      <p style={{ color: 'darkgreen', fontSize: '18px' }}>If you can see this, React is working!</p>
      <p style={{ color: 'darkred' }}>This is a test to check if the app loads.</p>
    </div>
  );
};

export default App;