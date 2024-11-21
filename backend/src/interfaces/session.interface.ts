export interface Session {
    date?: String;
    type: 'Contraseña incorrecta'|'Usuario incorrecto'|'Usuario no registrado'|'Inicio de sesión';
    rut: string;
    password: string
}