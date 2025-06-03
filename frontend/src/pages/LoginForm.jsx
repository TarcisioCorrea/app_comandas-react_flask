import React from "react";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography, Toolbar } from "@mui/material";
import { toast } from "react-toastify";

const LoginForm = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();

    const { login } = useAuth();

    const onSubmit = (data) => {
        const { username, password } = data;
        login(username, password);
        if (data.username == 'abc' && data.password == 'bolinhas') {
            toast.success("Login realizado com sucesso!");
        } else {
            toast.error("Usuário ou senha inválidos!");
        }
    };
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ backgroundColor: '#092B38', padding: 1, borderRadius: 1, mt: 2 }}>
            <Toolbar sx={{ backgroundColor: '#092B38', padding: 1, borderRadius: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h2" color="white" sx={{fontWeight:'bold', fontSize:'2.5em'}}>Login</Typography>
            </Toolbar>
            <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 3, mb: 2}}>
                <TextField label="Usuário" fullWidth margin="normal" onChange={(e) => setUsername(e.target.value)}
                    {...register('username', { required: 'Usuário é obrigatório' })} error={!!errors.username} helperText={errors.username?.message}
                />
                <TextField label="Senha" type="password" fullWidth margin="normal" onChange={(e) => setPassword(e.target.value)}
                    {...register('password', {
                        required: 'Senha é obrigatória',
                        minLength: { value: 6, message: 'Senha deve ter pelo menos 6 caracteres' }
                    })} error={!!errors.password} helperText={errors.password?.message}
                />
                <Button type="submit" variant="contained" fullWidth color="primary" sx={{backgroundColor:'#092B38', '&:hover': {backgroundColor:'#3D94B6', color:'black'}, transition:'0.7s'}}> Entrar </Button>
            </Box>
        </Box>
    );
};
export default LoginForm;