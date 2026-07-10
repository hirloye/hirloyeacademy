"use client";

import { useState } from "react";
import { Map, MapPopup } from "@/components/ui/map";
import { Button } from "@/components/ui/button";

export function ContactMap() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <div className="relative w-full h-full min-h-[300px]">
      <Map center={[80.2312253, 13.0973922]} zoom={15}>
        {showPopup && (
          <MapPopup
            longitude={80.2312253}
            latitude={13.0973922}
            onClose={() => setShowPopup(false)}
            closeButton
            focusAfterOpen={false}
            closeOnClick={false}
          >
            <div className="space-y-2 mt-2">
              <h3 className="text-foreground font-semibold">Hirloye</h3>
              <p className="text-muted-foreground text-sm">
                NMK Street, Ayanavaram<br />Chennai – 600023
              </p>
              <Button
                size="sm"
                variant="outline"
                className="w-full mt-2"
                onClick={() => setShowPopup(false)}
              >
                Close
              </Button>
            </div>
          </MapPopup>
        )}
      </Map>

      {!showPopup && (
        <Button
          size="sm"
          className="absolute bottom-4 left-4 z-10 bg-[#7B68EE] hover:bg-[#6A5AE0] text-white shadow-md"
          onClick={() => setShowPopup(true)}
        >
          Show Location Details
        </Button>
      )}
    </div>
  );
}
