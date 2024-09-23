import { useState } from 'react';

export const useZoom = (initialZoom = 100, minZoom = 50, maxZoom = 200) => {
    const [zoom, setZoom] = useState(initialZoom);

    const handleZoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 10, maxZoom));
    };

    const handleZoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 10, minZoom));
    };

    return { zoom, handleZoomIn, handleZoomOut };
};