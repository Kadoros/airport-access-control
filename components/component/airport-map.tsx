/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/dSR2Dzwc6ET
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export function AirportMap() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAirport, setSelectedAirport] = useState();
  const airports = [
    {
      id: "JFK",
      name: "John F. Kennedy International Airport",
      location: { lat: 40.639751, lng: -73.778925 },
      city: "New York",
      country: "United States",
    },
    {
      id: "LAX",
      name: "Los Angeles International Airport",
      location: { lat: 33.942536, lng: -118.407611 },
      city: "Los Angeles",
      country: "United States",
    },
    {
      id: "LHR",
      name: "London Heathrow Airport",
      location: { lat: 51.470025, lng: -0.454724 },
      city: "London",
      country: "United Kingdom",
    },
    {
      id: "CDG",
      name: "Paris Charles de Gaulle Airport",
      location: { lat: 49.009014, lng: 2.547778 },
      city: "Paris",
      country: "France",
    },
    {
      id: "HND",
      name: "Tokyo Haneda Airport",
      location: { lat: 35.552158, lng: 139.779694 },
      city: "Tokyo",
      country: "Japan",
    },
  ];
  const filteredAirports = useMemo(() => {
    return airports.filter((airport) =>
      airport.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-3 shadow">
        <div className="max-w-8xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold">Airport Map</h1>
          <div className="relative">
            <Input
              placeholder="Search for an airport"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pr-10"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2"
            >
              <SearchIcon className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>
      <div className="flex-1 relative">
        <div className="w-full h-full">
          {/* {filteredAirports.map((airport) => (
            <div
              className={`${
                selectedAirport?.id === airport.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-card-foreground"
              } rounded-full p-2 cursor-pointer`}
            >
              <PlaneIcon className="w-6 h-6" />
            </div>
          ))} */}
        </div>
        {/* {selectedAirport && (
          <Card className="absolute bottom-4 left-4 max-w-sm bg-background text-foreground shadow-lg">
            <CardHeader>
              <CardTitle>{selectedAirport.name}</CardTitle>
              <CardDescription>
                {selectedAirport.city}, {selectedAirport.country}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2">
                <div>
                  <div className="text-sm text-muted-foreground">
                    Airport ID
                  </div>
                  <div>{selectedAirport.id}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">
                    Coordinates
                  </div>
                  <div>
                    {selectedAirport.location.lat.toFixed(6)},{" "}
                    {selectedAirport.location.lng.toFixed(6)}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )} */}
      </div>
    </div>
  );
}

function PlaneIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
