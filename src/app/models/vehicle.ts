import { Brand } from "./brand";
import { Image } from "./image";

export interface Vehicle {
    id: number;
    name: string;
    model: string;
    price: number;
    brand: Brand;
    images: Image[];
}
