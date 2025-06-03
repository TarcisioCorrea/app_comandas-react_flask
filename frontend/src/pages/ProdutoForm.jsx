import { useForm } from 'react-hook-form';
import { TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, Toolbar } from '@mui/material';
const ProdutoForm = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = (data) => {
        console.log("Dados do produto:", data);
    };
    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ backgroundColor: '#AAE7FF', padding: 2, borderRadius: 1, mt: 2 }}>
            <Toolbar sx={{ backgroundColor: '#092B38', padding: 1, borderRadius: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" color="white">Dados Produto</Typography>
            </Toolbar>
            <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 3, mb: 2 }}>
                <TextField
                    label="Nome" fullWidth margin="normal"
                    {...register('nome', { required: 'Nome é obrigatório' })} error={!!errors.nome} helperText={errors.nome?.message}
                />
                <TextField
                    label="Valor" fullWidth margin="normal"
                    {...register('valor', { required: 'Valor é obrigatório' })} error={!!errors.valor} helperText={errors.valor?.message}
                />
                <TextField
                    label="Foto" fullWidth margin="normal"
                    {...register('foto', { required: 'Foto é obrigatória' })} error={!!errors.foto} helperText={errors.foto?.message}
                />
                <TextField
                    label="Descrição" fullWidth margin="normal" 
                    {...register('descricao', { required: 'Descrição é obrigatória' })} error={!!errors.descricao} helperText={errors.descricao?.message}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button sx={{ mr: 1 , backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#092B38', transition:'1s', '&:hover': { backgroundColor: '#004561', color:'white'}}}>
                        Cancelar
                    </Button>
                    <Button type="submit" variant="contained" sx={{backgroundColor: '#092B38', border: 'none', outline: 'none', transition:'1s', '&:hover': { backgroundColor: '#004561', color:'white'}}}>
                        Cadastrar
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};
export default ProdutoForm;