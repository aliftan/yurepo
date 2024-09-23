import React from 'react';
import { Button } from 'flowbite-react';
import { HiZoomIn, HiZoomOut } from 'react-icons/hi';

interface ZoomControlsProps {
    zoom: number;
    onZoomIn: () => void;
    onZoomOut: () => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoom, onZoomIn, onZoomOut }) => (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-end items-center space-x-2">
        <Button color="light" onClick={onZoomOut} className="p-2">
            <HiZoomOut className="h-5 w-5" />
        </Button>
        <Button color="light" onClick={onZoomIn} className="p-2">
            <HiZoomIn className="h-5 w-5" />
        </Button>
        <span className="text-gray-700 dark:text-gray-300">{zoom}%</span>
    </div>
);

export default ZoomControls;