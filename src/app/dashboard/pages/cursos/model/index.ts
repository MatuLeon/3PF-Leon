export interface CursosData{
    id: number,
    name: string,
    description: string,
    price: number
}

export interface CreateCursoData{
    name: string,
    description: string,
    price: number
}

export interface UpdateCursoData{
    id? :number,
    name? : string,
    description?: string,
    price? : number,

}