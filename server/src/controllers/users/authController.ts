import { Request, Response, NextFunction } from 'express';
import User from '../../models/user.model';
import jwt from 'jsonwebtoken';

// Registro de usuario
export const register = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el correo electrónico ya está registrado
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ mensaje: "El correo electrónico ya está registrado" });
        }

        // Verificar si el nombre de usuario ya está registrado
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ mensaje: "El nombre de usuario ya está ocupado" });
        }

        // Crear nuevo usuario
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Crear el token JWT
        const payload = {
            userId: newUser._id,
            username: newUser.username,
            role: newUser.role
        };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '1h' });

        // Establecer la cookie con el token
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            expires: new Date(Date.now() + 3600000), // 1 hora
        });

        return res.status(201).json({
            mensaje: "Usuario registrado exitosamente",
            user: { username: newUser.username, role: newUser.role }
        });
    } catch (error: any) {
        console.error("Error en el registro de usuario:", error.message);
        return res.status(500).json({ mensaje: "Error al registrar el usuario", error: error.message });
    }
};


// Inicio de sesión
export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;

        // Buscar al usuario por email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ mensaje: "Usuario no encontrado" });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ mensaje: "Contraseña incorrecta" });
        }

        // Crear el token JWT
        const payload = {
            userId: user._id,
            username: user.username,
            role: user.role
        };
        const token = jwt.sign(payload, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '1h' });

        // Establecer la cookie con el token
        res.cookie('auth_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Asegúrate de que esté habilitado solo en producción
            sameSite: 'lax',
            maxAge: 3600000 // 1 hora
        });

        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            user: { username: user.username, role: user.role }
        });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ mensaje: "Error en el inicio de sesión", error: error.message });
    }
};

export const verifyAuth = (req: Request, res: Response, next: NextFunction): Response => {
    try {
        const token = req.cookies.auth_token;

        if (!token) {
            return res.status(401).json({ authenticated: false });
        }

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY as string);

        // Retorna la información decodificada del token
        return res.status(200).json({ authenticated: true, user: decoded });
    } catch (err) {
        return res.status(401).json({ authenticated: false });
    }
};

  
export const logout = (req: Request, res: Response, next: NextFunction): void => {
    res.clearCookie('auth_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      // Consider adding domain and path for more comprehensive cookie clearing
      domain: process.env.COOKIE_DOMAIN, // Optional: if you have a specific domain
      path: '/', // Ensures cookie is cleared across the entire site
    });
    
    res.status(200).json({ message: 'Cierre de sesión exitoso' });
};
  

