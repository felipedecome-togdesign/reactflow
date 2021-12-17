import React from 'react';
import ReactFlow from 'react-flow-renderer';

import data from './d3InputData.json';

import { useLayoutedNodes } from './hooks/useLayoutedNodes';

const App: React.FC = () => {
  const { nodes, toggleOrientation } = useLayoutedNodes({
    data,
    initialNodeWidth: 200,
    initialNodeHeight: 100,
    initialOrientation: 'horizontal',
  });

  return (
    <div style={{ height: '100vh', width:'100vw' }}>
      <ReactFlow 
        elements={nodes}
        onElementClick={(event, el) => console.log(event, el)
      }>
        <button
          type="button"
          onClick={toggleOrientation}
          style={{
            position: 'absolute',
            zIndex: 1000,
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          Change Orientation
        </button>
      </ReactFlow>
    </div>
  );
}

export default App;