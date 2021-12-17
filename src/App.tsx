import React, { useCallback, useState } from 'react';
import ReactFlow, { addEdge, Background, BackgroundVariant, Elements, removeElements } from 'react-flow-renderer';

import { initialElements } from './initialElements';
import { getLayoutedElements } from './utils/getLayoutedElements';

const layoutedNodes= getLayoutedElements(initialElements)

const App: React.FC = () => {
  const [elements, setElements] = useState<Elements>(layoutedNodes);

  const handleConnect = useCallback(
    (params) =>
      setElements((els) =>
        addEdge(params, els)
      ), []);

  const handleRemove = useCallback(
    (elementsToRemove) =>
      setElements((els) =>
        removeElements(elementsToRemove, els)
      ), []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <ReactFlow elements={elements} onConnect={handleConnect} onElementsRemove={handleRemove}>
        <Background
          variant={BackgroundVariant.Dots}
          gap={16}
          color="#DEDEDE"
          size={1}
        />
      </ReactFlow>
    </div>
  );
}

export default App;