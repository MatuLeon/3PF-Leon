export interface Alumnos {
    id: number,
    name : string,
    lastname : string,
    nota : string ,
    email : string,
    password : string
}

export interface CreateAlumnoData{
    name : string,
    lastname : string,
    nota : string ,
    email : string,
    password : string
}

export interface UpdateAlumnoData{
    name? : string,
    lastname? : string,
    nota? : string ,
    email?: string,
    password? : string
}