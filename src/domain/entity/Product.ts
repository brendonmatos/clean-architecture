
interface IDimensions {
    x: number;
    y: number;
    z: number;
}

export class Product {
    id: string;
    name: string;
    weight: number;
    dimensions: IDimensions;
    price: number;

    constructor(id: string, name: string, weight: number, dimensions: IDimensions, price?: number) {
        this.id = id;
        this.name = name;
        this.weight = weight;
        this.dimensions = dimensions;
        this.price = price || 0;
    }

    /* cm3 */
    get volume() {
        return this.dimensions.x * this.dimensions.y * this.dimensions.z;
    }

    /* g/cm3 */
    get density() {
        return this.weight / this.volume;
    }
}