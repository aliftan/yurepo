"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import mermaid from 'mermaid';
import Header from '../../components/Header';
import { Button, Spinner } from 'flowbite-react';
import { HiArrowLeft, HiZoomIn, HiZoomOut } from 'react-icons/hi';

const ResultsPage: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [diagramData, setDiagramData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const mermaidRef = useRef<HTMLDivElement>(null);
    const [zoom, setZoom] = useState(100);

    useEffect(() => {
        const data = searchParams.get('diagramData');
        if (data) {
            setDiagramData(decodeURIComponent(data));
        }
        setIsLoading(false);
    }, [searchParams]);

    useEffect(() => {
        if (diagramData && mermaidRef.current) {
            mermaid.initialize({ 
                startOnLoad: true, 
                theme: 'default',
                flowchart: {
                    useMaxWidth: true,
                    htmlLabels: true,
                    curve: 'basis',
                },
            });
            mermaid.render('mermaid-diagram', diagramData).then((result) => {
                if (mermaidRef.current) {
                    mermaidRef.current.innerHTML = result.svg;
                }
            });
        }
    }, [diagramData]);

    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 10, 200));
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 10, 50));
    };

    return (
        <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Function Call Diagram</h1>
                    <Button color="light" onClick={() => router.push('/')} className="flex items-center">
                        <HiArrowLeft className="mr-2 h-5 w-5" />
                        Back to Upload
                    </Button>
                </div>
                {isLoading ? (
                    <div className="flex justify-center items-center h-64">
                        <Spinner size="xl" />
                    </div>
                ) : (
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-end items-center space-x-2">
                            <Button color="light" onClick={handleZoomOut} className="p-2">
                                <HiZoomOut className="h-5 w-5" />
                            </Button>
                            <Button color="light" onClick={handleZoomIn} className="p-2">
                                <HiZoomIn className="h-5 w-5" />
                            </Button>
                            <span className="text-gray-700 dark:text-gray-300">{zoom}%</span>
                        </div>
                        <div
                            className="overflow-auto p-4"
                            style={{ 
                                height: 'calc(100vh - 250px)',
                                maxWidth: '100%',
                            }}
                        >
                            <div
                                ref={mermaidRef}
                                style={{
                                    transform: `scale(${zoom / 100})`,
                                    transformOrigin: 'top left',
                                    transition: 'transform 0.3s ease',
                                    width: `${10000 / zoom}%`,
                                    height: `${10000 / zoom}%`,
                                }}
                            />
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default ResultsPage;