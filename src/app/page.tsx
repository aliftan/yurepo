"use client";

import React from 'react';
import FileUploader from '../components/FileUploader';
import Header from '../components/Header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
      <Header />
      <main className="flex-grow flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
          <div className="p-8">
            <p className="mb-6 text-base text-gray-600 dark:text-gray-400 text-center">
              Upload your JavaScript files to generate a function call diagram.
            </p>
            <FileUploader />
          </div>
        </div>
      </main>
    </div>
  );
}