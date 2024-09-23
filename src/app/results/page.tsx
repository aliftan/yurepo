"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import mermaid from 'mermaid';

const ResultsPage: React.FC = () => {
    const searchParams = useSearchParams();
    const [diagramData, setDiagramData] = useState<string | null>(null);
    const mermaidRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const data = searchParams.get('diagramData');
        if (data) {
            setDiagramData(decodeURIComponent(data));
        }
    }, [searchParams]);

    useEffect(() => {
        if (diagramData && mermaidRef.current) {
            mermaid.initialize({ startOnLoad: true, theme: 'default' });
            mermaid.render('mermaid-diagram', diagramData).then((result) => {
                if (mermaidRef.current) {
                    mermaidRef.current.innerHTML = result.svg;
                }
            });
        }
    }, [diagramData]);

    if (!diagramData) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>Function Call Diagram</h1>
            <div ref={mermaidRef} />
        </div>
    );
};

export default ResultsPage;