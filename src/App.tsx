import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow from 'react-flow-renderer';

const App: React.FC = () => {

  const [elements, setElements] = useState([
    {
      id: '1',
      type: 'input', // input node
      data: { label: 'Input Node' },
      position: { x: 800, y: 25 },
    },
    // default node
    {
      id: '2',
      // you can also pass a React component as a label
      data: { label: <div>Default Node</div> },
      position: { x: 100, y: 125 },
    },
    {
      id: '3',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '4',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '5',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '6',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '7',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '8',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '9',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '10',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '11',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '12',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '13',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '14',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    {
      id: '15',
      type: 'output', // output node
      data: { label: 'Output Node' },
      position: { x: 250, y: 250 },
    },
    // animated edge
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3' },
    { id: 'e2-4', source: '2', target: '4' },
    { id: 'e2-5', source: '2', target: '5' },
  ]);

  const [newElements, setNewElements] = useState<any[]>([]);

  const getNodeTotal = useCallback(() => {
    let total = 0;

    elements.forEach(element => {
      if (!element.source) {
        total += 1;
      }
    });

    return total;
  }, [elements]);

  const getEdgeTotal = useCallback(() => {
    let total = 0;

    elements.forEach(element => {
      if (!!element.source) {
        total += 1;
      }
    });

    return total;
  }, [elements]);

  useEffect(() => {
    const nodeTotal = getNodeTotal();
    const edgeTotal = getEdgeTotal();

    const widthColumn = window.innerWidth / nodeTotal;
    const positionInitialX = widthColumn * (nodeTotal / 2);
    const positionInitialY = 0;
    
    let newElements: any[] = [];
    elements.forEach((element, index) => {
      if (!element.source) {        
        if (index === 0) {
          newElements.push({...element, position: { x: positionInitialX, y: positionInitialY }});
        } else {
          newElements.push({...element, position: { x: positionInitialX, y: positionInitialY + (150 * index) }});
        }
        
      } else {
        newElements.push(element);
      }
    });

    setNewElements(newElements);
    
  },[elements, getNodeTotal, getEdgeTotal]);

  return (
    <div style={{ height: '100vh', width:'100vw' }}>
      <ReactFlow elements={newElements} />
    </div>
  );
}

export default App;