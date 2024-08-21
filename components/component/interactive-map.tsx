"use client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { LayersIcon, SearchIcon } from "./Icons";
import MapTest from "./ol-map";

export function InteractiveMap() {
  return (
    <div className="flex flex-col h-full min-h-screen"> {/* Ensure full height */}
      <div className="flex flex-1"> {/* Flex-1 to fill available space */}
        <div className="flex-1 bg-muted/20">
          <div className="h-full w-full">
            <MapTest /> {/* Map should fill its container */}
          </div>
        </div>
        <div className="bg-background border-l w-80 p-6 flex flex-col gap-6 h-full">
          <div>
            <h3 className="text-lg font-semibold">Location Details</h3>
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="font-medium">Name:</span>
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Coordinates:</span>
              <div className="flex gap-2 flex-col items-right">
                <span>037.7749° N</span>
                <span>122.4194° W</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Population:</span>
              <span>873,965</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">Area:</span>
              <span>121.4 sq mi</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <LayersIcon className="w-4 h-4" />
                  <span>Map Layers</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Toggle Layers</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked>
                  Roads
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Terrain</DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem>Satellite</DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm" className="gap-2">
              <SearchIcon className="w-4 h-4" />
              <span>Search</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
