export interface Faculty {
    id:      number;
    acronym: string;
    faculty: string;
}
export interface FacultyUnasam {
    id:            string;
    nombre:        string;
    nivel_grado:   string;
    abreviatura:   string;
    nombre_decano: string;
    activo:        number;
    created_at:    null;
    updated_at:    Date | null;
    codigo:        string;
}
