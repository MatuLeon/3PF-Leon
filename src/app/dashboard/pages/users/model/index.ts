export interface Alumnos {
    id: number,
    name : string,
    lastname : string,
    curso : string ,
    email : string,
    password : string,
    token: string;
    role: 'ADMINISTRADOR' | 'USUARIO'
}

export interface CreateAlumnoData{
    name : string,
    lastname : string,
    curso : string ,
    email : string,
    password : string,
    role: string,
}

export interface UpdateAlumnoData{
    name? : string,
    lastname? : string,
    curso? : string ,
    email?: string,
    password? : string,
    role?: string,
    token?: string,
}