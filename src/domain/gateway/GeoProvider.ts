export interface GeoProvider {
    distanceBetweenZipCodes(zipCode1: string, zipCode2: string) : Promise<number> 
} 