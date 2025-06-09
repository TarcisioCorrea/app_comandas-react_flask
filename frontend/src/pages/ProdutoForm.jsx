import React, { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, MenuItem, FormControl, InputLabel, Select, Toolbar } from '@mui/material';
import { createProduto, updateProduto, getProdutoById } from '../services/produtoService';
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';


const ProdutoForm = () => {
    const { id, opr } = useParams();

    const navigate = useNavigate();

    const { control, handleSubmit, reset, formState: { errors } } = useForm();

    const isReadOnly = opr === 'view';

    let title;
    if (opr === 'view') {
        title = `Visualizar Produto: ${id}`;
    } else if (id) {
        title = `Editar Produto: ${id}`;
    } else {
        title = "Novo Produto";
    }

    useEffect(() => {
        if (id) {
            const fetchProduto = async () => {
                const data = await getProdutoById(id);
                reset(data);
            };
            fetchProduto();
        }
    }, [id, reset]);

    const onSubmit = async (data) => {
        try {
            let retorno;
            if (id) {
                retorno = await updateProduto(id, data);
            } else {
                retorno = await createProduto(data);
            }
            if (!retorno || !retorno.id) {
                throw new Error(retorno.erro || "Erro ao salvar produto.");
            }
            toast.success(`Produto salvo com sucesso. ID: ${retorno.id}`, { position: "top-center" });
            navigate('/produtos');
        } catch (error) {
            toast.error(`Erro ao salvar produto: \n${error.message}`, { position: "top-center" });
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ backgroundColor: '#AAE7FF', padding: 2, borderRadius: 1, mt: 2 }}>

            <Toolbar sx={{ backgroundColor: '#092B38', padding: 1, borderRadius: 2, mb: 2, display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h6" color="white">Dados Produto</Typography>
            </Toolbar>

            <Box sx={{ backgroundColor: 'white', padding: 2, borderRadius: 3, mb: 2 }}>
                {opr === 'view' && (
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                        Todos os campos estão em modo somente leitura.
                    </Typography>
                )}

                <Controller name="nome" control={control} defaultValue="" rules={{ required: "Nome é obrigatório", maxLength: { value: 100, message: "Nome deve ter no máximo 100 caracteres" } }}
                    render={({ field }) => (
                        <TextField {...field} disabled={isReadOnly} label="Nome" fullWidth margin="normal" error={!!errors.nome} helperText={errors.nome?.message} />
                    )}
                />

                <Controller name="valor_unitario" control={control} defaultValue="" rules={{ required: "Valor é obrigatório", maxLength: { value: 100, message: "Valor deve ter no máximo 100 caracteres" } }}
                    render={({ field }) => (
                        <TextField {...field} type="number" disabled={isReadOnly} label="Valor" fullWidth margin="normal" error={!!errors.valor_unitario} helperText={errors.valor_unitario?.message} />
                    )}
                />

                <Controller name="foto" control={control} defaultValue="" rules={{ required: "Foto é obrigatório" }}
                    render={({ field }) => (
                        <TextField {...field} disabled={isReadOnly} label="Foto" fullWidth margin="normal" error={!!errors.foto} helperText={errors.foto?.message} />
                    )}
                />

                <Controller name="descricao" control={control} defaultValue="" rules={{ required: "Descrição é obrigatório", maxLength: { value: 300, message: "Descrição deve ter no máximo 200 caracteres" } }}
                    render={({ field }) => (
                        <TextField {...field} disabled={isReadOnly} label="Descrição" fullWidth margin="normal" error={!!errors.descricao} helperText={errors.descricao?.message} />
                    )}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button onClick={() => navigate('/produtos')} sx={{ mr: 1, backgroundColor: 'transparent', border: 'none', outline: 'none', color: '#092B38', transition: '1s', '&:hover': { backgroundColor: '#004561', color: 'white' } }}>
                        Cancelar
                    </Button>
                    {opr !== 'view' && (
                        <Button type="submit" variant="contained" color="primary" sx={{ backgroundColor: '#092B38', '&:hover': { backgroundColor: '#004561' }, border: 'none', outline: 'none', transition: '1s' }}>{id ? "Atualizar" : "Cadastrar"}</Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
};
export default ProdutoForm;