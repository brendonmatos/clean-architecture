import { GeoProvider } from "../../../domain/gateway/GeoProvider";


export default class GeoProviderMemory implements GeoProvider {
    constructor() {

    }

    async distanceBetweenZipCodes(zipCode1, zipCode2) {
        return 1000
    }
}