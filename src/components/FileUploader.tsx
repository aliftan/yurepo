"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Alert } from 'flowbite-react';
import { useRouter } from 'next/navigation';

const FileUploader: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(acceptedFiles);
        setError(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/javascript': ['.js']
        },
        multiple: true
    });

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (files.length === 0) {
            setError('Please select at least one JavaScript file.');
            return;
        }

        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        try {
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            if (response.ok) {
                router.push(`/results?diagramData=${encodeURIComponent(data.diagramData)}`);
            } else {
                setError(data.error || 'An error occurred while processing the files.');
            }
        } catch (error) {
            console.error('Upload failed:', error);
            setError('An error occurred while uploading the files.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
            <div {...getRootProps()} className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${isDragActive ? 'border-blue-500' : ''}`}>
                <input {...getInputProps()} />
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">JavaScript files only (*.js)</p>
                </div>
            </div>
            {files.length > 0 && (
                <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white">Selected files:</h4>
                    <ul className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                        {files.map((file) => (
                            <li key={file.name}>{file.name}</li>
                        ))}
                    </ul>
                </div>
            )}
            {error && (
                <Alert color="failure" className="mt-4">
                    {error}
                </Alert>
            )}
            <Button type="submit" className="mt-4 w-full">
                Generate Diagram
            </Button>
        </form>
    );
};

export default FileUploader;