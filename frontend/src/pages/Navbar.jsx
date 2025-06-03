import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Navbar = () => {
    // useNavigate é um hook do React Router que permite programaticamente navegar entre rotas
    const navigate = useNavigate();
    
    const { isAuthenticated, logout } = useAuth();

    const handleLogout = () => {
        logout();
        toast.info("Logout realizado com sucesso!");
    };
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>Comandas</Typography>
                {isAuthenticated && (
                    <>
                        <Button color="inherit" onClick={() => navigate('/home')} >Home</Button>
                        <Button color="inherit" onClick={() => navigate('/funcionarios')}>Funcionários</Button>
                        <Button color="inherit" onClick={() => navigate('/clientes')}>Clientes</Button>
                        <Button color="inherit" onClick={() => navigate('/produtos')}>Produtos</Button>
                        <Button color="inherit" onClick={handleLogout}>Sair</Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};
export default Navbar;