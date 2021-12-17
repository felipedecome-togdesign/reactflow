import { tree } from 'd3-hierarchy';

interface TreeOptions {
    nodeWidth: number;
    nodeHeight: number;
    orientation: 'horizontal' | 'vertical';
}

export const getD3TreeInstance = ({ nodeWidth, nodeHeight, orientation }: TreeOptions) => {
    const nodeSize: [number, number] = orientation === 'horizontal' ? [nodeWidth, nodeHeight] : [nodeHeight, nodeWidth];
    return tree().nodeSize(nodeSize);
}