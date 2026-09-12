export type CategoriaKey = string;

export type ComidaData = {
    tipo_comida: string;
} & Record<CategoriaKey, string | number>;

export type DiaData = {
    dia: string;
    comidas: ComidaData[];
};