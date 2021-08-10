import { GeoProvider } from "./GeoProviderInterface";

export default class GeoProviderMemory implements GeoProvider {
    constructor() {

    }

    distanceBetweenZipCodes(zipCode1, zipCode2) {
        return 1000
    }
}