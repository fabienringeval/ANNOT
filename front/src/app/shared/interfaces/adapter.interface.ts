export interface Adapter<T> {
    adapt(data: { id: number, attributes: any, relationships: any, meta: any }, included: any[]): T;
}
