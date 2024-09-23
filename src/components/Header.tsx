import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
    return (
        <header className="w-full bg-white dark:bg-gray-800 shadow-sm">
            <div className="container mx-auto px-4 py-6 text-center">
                <Link href="/" className="inline-block">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Yurepo
                    </h1>
                    <p className="mt-1 text-sm font-normal text-gray-600 dark:text-gray-400">
                        JavaScript Function Analyzer
                    </p>
                </Link>
            </div>
        </header>
    );
};

export default Header;