"use client";

import { useState } from "react";
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";

interface LocationAutocompleteProps {
  onLocationSelect: (lat: number, lng: number, address: string) => void;
}

export default function LocationAutocomplete({ onLocationSelect }: LocationAutocompleteProps) {
  const [value, setValue] = useState<any>(null);

  const handleSelect = async (selectedOption: any) => {
    setValue(selectedOption);

    if (selectedOption) {
      try {
        // Ye hai wo aakhiri API call jo Latitude/Longitude nikalegi (Free Limit wali)
        const results = await geocodeByAddress(selectedOption.label);
        const { lat, lng } = await getLatLng(results[0]);
        
        // Parent component ko coordinates bhej do
        onLocationSelect(lat, lng, selectedOption.label);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    }
  };

  return (
    <div className="w-full sm:w-72">
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
        selectProps={{
          instanceId: "google-places-search-input",
          value,
          onChange: handleSelect,
          placeholder: "Search area (e.g. Sector 62)...",
          isClearable: true,
          components: {
            DropdownIndicator: null, // UI clean karne ke liye default arrow hata diya
          },
          styles: {
            control: (provided) => ({
              ...provided,
              borderRadius: "0.75rem", // Tailwind rounded-xl
              padding: "0.1rem",
              borderColor: "#e2e8f0",
              boxShadow: "none",
              "&:hover": {
                borderColor: "#fbbf24", // amber-400
              },
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? "#fef3c7" : "white", // amber-50
              color: "#0f172a",
              cursor: "pointer",
            }),
          },
        }}
        autocompletionRequest={{
          componentRestrictions: { country: "in" }, // Sirf India ki locations dikhayega
          types: ["geocode"], // 'establishment' hata diya taaki sirf areas aayein, dukano ke naam nahi
        }}
      />
    </div>
  );
}