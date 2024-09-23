"use client";

import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Button, Alert, Spinner } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import { HiX } from 'react-icons/hi';

const FileUploader: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const onDrop = useCallback((acceptedFiles: File[]) => {
        setFiles(prevFiles => [...prevFiles, ...acceptedFiles]);
        setError(null);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'application/javascript': ['.js']
        },
        multiple: true
    });

    const removeFile = (fileToRemove: File) => {
        setFiles(files.filter(file => file !== fileToRemove));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (files.length === 0) {
            setError('Please select at least one JavaScript file.');
            return;
        }

        setIsLoading(true);
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
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <div
                {...getRootProps()}
                className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 ${isDragActive ? 'border-blue-500' : ''
                    }`}
            >
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
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Selected files:</h4>
                    <ul className="space-y-2">
                        {files.map((file) => (
                            <li key={file.name} className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 p-2 rounded">
                                <span className="text-sm text-gray-700 dark:text-gray-300">{file.name}</span>
                                <button
                                    type="button"
                                    onClick={() => removeFile(file)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <HiX className="w-5 h-5" />
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            {error && (
                <Alert color="failure" className="mt-4">
                    {error}
                </Alert>
            )}
            <Button type="submit" className="mt-4 w-full bg-black hover:bg-gray-800 focus:ring-gray-300" disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Spinner size="sm" light={true} className="mr-2" />
                        Generating Diagram...
                    </>
                ) : (
                    'Generate Diagram'
                )}
            </Button>
        </form>
    );
};

export default FileUploader;