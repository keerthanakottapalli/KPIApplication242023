import React from 'react';
import { Button, Typography, Container, Card, CardContent } from '@material-ui/core';
import './Main.css'; // Import the custom CSS file
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); 
  };

  const handleRegister = () => {
    navigate('/register'); 
  };

  const handleAdmin = () => {
    navigate('/adminLogin'); 
  };


  return (
    <div className="card-container">
      <Container maxWidth="sm">
        <Card className="card">
          <CardContent>
            <Typography variant="h5" component="h5" gutterBottom>
              Welcome to Employee KPI Reviews!
            </Typography>
            <div className="button-container">
              <Button variant="contained" color="primary" onClick={handleLogin} className="button" style={{paddingLeft:'28px',paddingRight:'28px'}}>
                Login
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" color="secondary" onClick={handleRegister} className="button">
                Register
              </Button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="contained" color="secondary" onClick={handleAdmin} className="button">
                Administrator
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default Main;
