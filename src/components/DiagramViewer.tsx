import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import ZoomControls from './ZoomControls';
import { useZoom } from '../hooks/useZoom';

interface DiagramViewerProps {
    diagramData: string;
}

const DiagramViewer: React.FC<DiagramViewerProps> = ({ diagramData }) => {
    const mermaidRef = useRef<HTMLDivElement>(null);
    const { zoom, handleZoomIn, handleZoomOut } = useZoom();
    const [svgString, setSvgString] = useState<string>('');

    useEffect(() => {
        if (diagramData) {
            console.log("Attempting to render diagram with data:", diagramData);
            mermaid.initialize({
                startOnLoad: true,
                theme: 'default',
                flowchart: {
                    useMaxWidth: true,
                    htmlLabels: true,
                    curve: 'basis',
                },
                securityLevel: 'loose',
            });
            mermaid.render('mermaid-diagram', diagramData)
                .then((result) => {
                    console.log("Mermaid render successful", result);
                    setSvgString(result.svg);
                })
                .catch((error) => {
                    console.error("Mermaid render error:", error);
                });
        }
    }, [diagramData]);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <ZoomControls zoom={zoom} onZoomIn={handleZoomIn} onZoomOut={handleZoomOut} />
            <div
                className="overflow-auto p-4 bg-gray-100"
                style={{
                    height: 'calc(100vh - 250px)',
                    maxWidth: '100%',
                    minHeight: '300px',
                }}
            >
                <div
                    ref={mermaidRef}
                    style={{
                        transform: `scale(${zoom / 100})`,
                        transformOrigin: 'top left',
                        transition: 'transform 0.3s ease',
                    }}
                    dangerouslySetInnerHTML={{ __html: svgString }}
                />
            </div>
        </div>
    );
};

export default DiagramViewer;