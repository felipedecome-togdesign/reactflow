import { Handle, Position } from 'react-flow-renderer';

const customNodeStyles = {
  borderRadius: '12px',
  padding: '16px 24px',
  background: '#F5E0FA',
  color: '#A512CA',
  fontSize: '16px',
  fontWeight: 'bold',
};

interface CustomNodeProps {
  data: {
    label: string;
  }
}

export const CustomNode = ({ data }: CustomNodeProps) => {
  return (
    <div style={customNodeStyles}>
      <Handle type="target" position={Position.Left} />
      <div>{data.label}</div>
      <Handle
        type="source"
        position={Position.Right}
        id="a"
        style={{ top: '30%'}}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="b"
        style={{ top: '70%'}}
      />
    </div>
  );
};
