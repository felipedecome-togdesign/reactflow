import { hierarchy, HierarchyPointNode } from "d3-hierarchy";
import { useCallback, useMemo, useState } from "react";
import { Elements } from "react-flow-renderer";
import { getD3TreeInstance } from "../utils/getD3TreeInstance";

type Orientation = 'horizontal' | 'vertical';

type Item = {
    id: string;
    name: string;
    collapsed?: boolean;
    children?: Item[]
}

type HierarchyItem = HierarchyPointNode<Item>;

interface LayoutedNodesOptions {
    /**
     * Data must follow this format
     *  https://github.com/d3/d3-hierarchy#hierarchy 
     */
    data: Item;

    /**
     * Control spacing between nodes
     */
    initialNodeWidth: number;

    /**
     * Control spacing between nodes
     */
    initialNodeHeight: number;

    /**
     * Set nodes orientation
     */
    initialOrientation?: Orientation;
}

interface LayoutedNodesContext {
    nodes: Elements;
    toggleOrientation: () => void;
}

export const useLayoutedNodes = ({
    data,
    initialNodeWidth,
    initialNodeHeight,
    initialOrientation = 'vertical'
}: LayoutedNodesOptions): LayoutedNodesContext=> {
    const [orientation, setOrientation] = useState<Orientation>(initialOrientation);
    const [nodeWidth] = useState<number>(initialNodeWidth);
    const [nodeHeight] = useState<number>(initialNodeHeight);

    const D3TreeInstance = useMemo(() => getD3TreeInstance({
        nodeHeight,
        nodeWidth,
        orientation,
    }), [nodeHeight, nodeWidth, orientation])

    const nodes: Elements = useMemo(() => {
        const d3Data = D3TreeInstance(hierarchy(data, c => c.collapsed ? null : c.children)) as HierarchyItem;

        const nodes = d3Data.descendants();
        const links = d3Data.links();

        const mappedNodes = nodes.map(n => ({
            id: n.data.id,
            data: { label: n.data.name },
            position: orientation === 'horizontal' ? { x: n.x, y: n.y } : { x: n.y, y: n.x },
        }))

        const mappedLinks = links.map(l => ({
            id: `${l.source.data.id}-${l.target.data.id}`,
            source: l.source.data.id,
            target: l.target.data.id,
            type: l.source.depth > 0 ? 'smoothstep' : '',
            animated: true,
        }));

        return [...mappedNodes, ...mappedLinks];
    }, [data, orientation, D3TreeInstance]);

    const toggleOrientation = useCallback(() => {
        setOrientation(state => state === 'horizontal' ? 'vertical' : 'horizontal')
    }, [])

    return { nodes, toggleOrientation };
}