"use client"

import React from "react"
import { Map, Marker, ZoomControl } from "pigeon-maps"

export function MyMap() {
  return (
    <Map  defaultCenter={[35.178, 128.9377]} defaultZoom={14}>
      
      <ZoomControl />
    </Map>
  )
}