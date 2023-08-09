export interface Alumnos {
    id: number,
    name : string,
    lastname : string,
    curso : string ,
    email : string,
    password : string,
    token: string
}

export interface CreateAlumnoData{
    name : string,
    lastname : string,
    curso : string ,
    email : string,
    password : string
}

export interface UpdateAlumnoData{
    name? : string,
    lastname? : string,
    curso? : string ,
    email?: string,
    password? : string
}