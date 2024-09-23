"use client";

import React from 'react';
import FileUploader from '../components/FileUploader';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Yurepo - JavaScript Function Analyzer
        </h1>
        <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
          Upload your JavaScript files to generate a function call diagram.
        </p>
        <FileUploader />
      </div>
    </main>
  );
}