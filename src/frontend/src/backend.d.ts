import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Product {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    isBestseller: boolean;
    price: number;
}
export interface backendInterface {
    createProduct(passkey: string, product: Product): Promise<void>;
    deleteProduct(passkey: string, productId: string): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getProductsByCategory(category: string): Promise<Array<Product>>;
    updateProduct(passkey: string, updatedProduct: Product): Promise<void>;
    updateProductDescription(passkey: string, productId: string, newDescription: string): Promise<void>;
    verifyPasskey(passkey: string): Promise<boolean>;
}
