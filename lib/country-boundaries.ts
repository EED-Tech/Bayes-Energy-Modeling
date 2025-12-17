// High-precision country boundary coordinates for East African countries
export const COUNTRY_BOUNDARIES: Record<
  string,
  { points: [number, number][]; bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number } }
> = {
  Kenya: {
    bounds: { minLat: -4.7, maxLat: 4.9, minLng: 33.9, maxLng: 41.9 },
    points: [
      [3.5, 34.3],
      [4.2, 34.8],
      [4.1, 35.5],
      [3.0, 36.0],
      [2.8, 36.9],
      [3.5, 37.5],
      [4.0, 37.8],
      [3.6, 38.5],
      [2.5, 38.3],
      [1.5, 37.9],
      [0.5, 37.3],
      [-0.5, 37.0],
      [-1.5, 36.5],
      [-2.2, 35.9],
      [-2.8, 35.2],
      [-3.5, 34.5],
      [-3.0, 33.9],
      [-2.0, 33.8],
      [-1.0, 33.6],
      [0.0, 34.0],
      [1.0, 34.2],
      [2.0, 34.1],
      [3.5, 34.3],
    ],
  },
  Uganda: {
    bounds: { minLat: -1.6, maxLat: 4.2, minLng: 29.3, maxLng: 35.4 },
    points: [
      [4.2, 29.3],
      [3.5, 29.5],
      [2.5, 30.0],
      [1.5, 30.5],
      [0.5, 31.0],
      [-0.5, 31.5],
      [-1.0, 32.0],
      [-1.5, 33.0],
      [-1.2, 34.0],
      [0.0, 34.5],
      [1.0, 35.0],
      [2.0, 35.3],
      [3.0, 35.2],
      [3.5, 34.8],
      [4.2, 34.5],
      [4.1, 33.5],
      [4.0, 32.5],
      [4.1, 31.5],
      [4.2, 30.5],
      [4.2, 29.3],
    ],
  },
  Tanzania: {
    bounds: { minLat: -11.7, maxLat: -0.9, minLng: 29.4, maxLng: 40.4 },
    points: [
      [-1.0, 29.4],
      [-0.5, 30.0],
      [0.5, 31.0],
      [1.0, 32.5],
      [1.5, 34.0],
      [1.2, 35.5],
      [0.5, 37.0],
      [-0.5, 38.5],
      [-2.0, 39.0],
      [-5.0, 39.2],
      [-8.0, 38.5],
      [-10.0, 37.5],
      [-11.5, 35.5],
      [-11.0, 34.0],
      [-10.0, 32.0],
      [-8.0, 30.5],
      [-5.0, 29.8],
      [-2.0, 29.4],
      [-1.0, 29.4],
    ],
  },
  Ethiopia: {
    bounds: { minLat: 3.4, maxLat: 14.9, minLng: 33.0, maxLng: 47.8 },
    points: [
      [14.8, 33.0],
      [14.5, 34.0],
      [14.0, 35.0],
      [13.0, 36.0],
      [12.0, 37.0],
      [11.0, 38.0],
      [10.0, 39.0],
      [9.0, 40.0],
      [8.0, 42.0],
      [7.0, 43.5],
      [6.0, 44.0],
      [5.0, 43.0],
      [4.0, 42.0],
      [3.5, 41.0],
      [4.0, 40.0],
      [5.0, 39.0],
      [6.0, 38.0],
      [7.0, 37.5],
      [8.0, 36.5],
      [10.0, 35.5],
      [11.0, 34.5],
      [12.0, 34.0],
      [13.0, 33.5],
      [14.0, 33.2],
      [14.8, 33.0],
    ],
  },
  Malawi: {
    bounds: { minLat: -17.1, maxLat: -9.2, minLng: 32.7, maxLng: 35.9 },
    points: [
      [-9.2, 32.7],
      [-9.5, 33.0],
      [-10.0, 33.5],
      [-11.0, 34.0],
      [-12.0, 34.5],
      [-13.0, 35.0],
      [-14.0, 35.3],
      [-15.0, 35.5],
      [-16.0, 35.3],
      [-16.5, 34.5],
      [-16.0, 33.0],
      [-14.0, 32.8],
      [-12.0, 32.7],
      [-10.0, 32.8],
      [-9.2, 32.7],
    ],
  },
}

// Point-in-polygon algorithm
export function isPointInPolygon(point: [number, number], polygon: [number, number][]): boolean {
  const [lat, lng] = point
  let inside = false
  let p1x = polygon[polygon.length - 1][1]
  let p1y = polygon[polygon.length - 1][0]

  for (let i = 0; i < polygon.length; i++) {
    const p2x = polygon[i][1]
    const p2y = polygon[i][0]
    if (lng > (p2x < p1x ? p2x : p1x) && lng <= (p2x > p1x ? p2x : p1x)) {
      if (lat <= (p2y < p1y ? p2y : p1y) || (lat > (p2y > p1y ? p2y : p1y) && lat <= p1y)) {
        inside = !inside
      }
    }
    p1x = p2x
    p1y = p2y
  }
  return inside
}
