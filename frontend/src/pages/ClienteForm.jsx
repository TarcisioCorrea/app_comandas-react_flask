import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, Toolbar } from '@mui/material';
import IMaskInputWrapper from '../components/IMaskInputWrapper';

const ClienteForm = () => {
    const { control, register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log("Dados do cliente:", data);
    };
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ backgroundColor: '#AAE7FF', padding: 2, borderRadius: 1, mt: 2 }}>
            <Toolbar sx={{ backgroundColor: '#092B38', padding: 1, borderRadius: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" color="white">Dados Cliente</Typography>
            </Toolbar>
            <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 3, mb: 2 }}>
                <TextField
                    label="Nome" fullWidth margin="normal"
                    {...register('nome', { required: 'Nome é obrigatório' })} error={!!errors.nome} helperText={errors.nome?.message}
                />

                {/* CPF com máscara */}
                <Controller
                    name="cpf" control={control} defaultValue="" rules={{ required: 'CPF é obrigatório' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="CPF" fullWidth margin="normal"
                            error={!!errors.cpf} helperText={errors.cpf?.message}
                            InputProps={{
                                // Define o IMaskInputWrapper como o componente de entrada
                                inputComponent: IMaskInputWrapper,
                                inputProps: {
                                    mask: "000.000.000-00",
                                    // O regex [0-9] aceita apenas números de 0 a 9
                                    definitions: {"0": /[0-9]/,},
                                    // Retorna apenas os números no valor
                                    unmask: true,
                                },
                            }}
                        />
                    )}
                />
                
                {/* Telefone com máscara */}
                <Controller
                    name="telefone" control={control} defaultValue="" rules={{ required: 'Telefone é obrigatório' }}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Telefone" fullWidth margin="normal"
                            error={!!errors.telefone} helperText={errors.telefone?.message}
                            InputProps={{
                                // Define o IMaskInputWrapper como o componente de entrada
                                inputComponent: IMaskInputWrapper,
                                inputProps: {
                                    mask: "(00) 0 0000-0000",
                                    // O regex [0-9] aceita apenas números de 0 a 9
                                    definitions: {"0": /[0-9]/,},
                                    // Retorna apenas os números no valor
                                    unmask: true,
                                },
                            }}
                        />
                    )}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button sx={{ mr: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#092B38', transition:'1s', '&:hover': { backgroundColor: '#004561', color:'white'} }}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" sx={{backgroundColor: '#092B38', '&:hover': { backgroundColor: '#004561'}, border: 'none', outline: 'none', transition:'1s'}}>
                        Cadastrar
                    </Button>
                </Box>

            </Box>
        </Box>
    );
};
export default ClienteForm;