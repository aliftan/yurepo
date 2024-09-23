"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Header from '../../components/Header';
import DiagramViewer from '../../components/DiagramViewer';
import { Button, Spinner } from 'flowbite-react';
import { HiArrowLeft } from 'react-icons/hi';

const ResultsPage: React.FC = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [diagramData, setDiagramData] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const data = searchParams.get('diagramData');
        if (data) {
            const decodedData = decodeURIComponent(data);
            console.log("Received diagram data:", decodedData);
            console.log("Diagram data length:", decodedData.length);
            setDiagramData(decodedData);
        } else {
            console.log("No diagram data received");
        }
        setIsLoading(false);
    }, [searchParams]);

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
                    diagramData && <DiagramViewer diagramData={diagramData} />
                )}
            </main>
        </div>
    );
};

export default ResultsPage;