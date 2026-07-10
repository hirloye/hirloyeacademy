"use client";

import { Map as PigeonMap, Overlay, Marker } from "pigeon-maps";
import { ReactNode } from "react";
import { X } from "lucide-react";

interface MapProps {
  center: [number, number];
  zoom: number;
  children?: ReactNode;
  [key: string]: any;
}

export function Map({ center, zoom, children, ...props }: MapProps) {
  // Convert [lng, lat] to [lat, lng] for PigeonMaps
  const pigeonCenter: [number, number] = [center[1], center[0]];

  return (
    <PigeonMap center={pigeonCenter} zoom={zoom} {...props}>
      {children}
    </PigeonMap>
  );
}

interface MapPopupProps {
  longitude: number;
  latitude: number;
  onClose?: () => void;
  closeButton?: boolean;
  children: ReactNode;
  [key: string]: any;
}

export function MapPopup({
  longitude,
  latitude,
  onClose,
  closeButton,
  children,
  ...props
}: MapPopupProps) {
  return (
    <>
      <Marker anchor={[latitude, longitude]} color="#7B68EE" />
      <Overlay anchor={[latitude, longitude]} offset={[100, 150]} {...props}>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 p-4 relative min-w-[240px] z-50">
          {closeButton && onClose && (
            <button
              onClick={onClose}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          {children}
        </div>
      </Overlay>
    </>
  );
}
