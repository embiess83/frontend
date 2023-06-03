import axios from "axios";
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

// @mui
import {
  Card,
  Stack,
  Button,
  Container,
  Typography,
  TextField,
} from '@mui/material';

const baseURL = "http://localhost:8080/category";

export default function CategoryRegister() {
  const [name, setName] = useState('');

  const [description, setDescription] = useState('');

  const [status, setStatus] = useState('ACTIVE');

  const [nameError, setNameError] = useState(false)
  
  const [descriptionError, setDescriptionError] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()

    setNameError(false)
    setDescriptionError(false)

    if (name === '') {
      setNameError(true)
    }
    if (description === '') {
      setDescriptionError(true)
    }

    if (name && description) {
        axios.post(baseURL, {name, description, status}).then((response) => {
          // setDataList(response.data);
          console.log("Sucesso ...", response);
        });
    }
  }

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Helmet>
        <title> Categoria | Embiess 83 </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Registrar Categoria
          </Typography>
        </Stack>

        <Card sx={{ p: 5 }}>
          <form autoComplete="off" onSubmit={handleSubmit}>
            <TextField 
                label="Nome"
                onChange={e => setName(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                sx={{mb: 3}}
                fullWidth
                value={name}
                error={nameError}
            />
            <TextField 
                label="Descrição"
                onChange={e => setDescription(e.target.value)}
                required
                variant="outlined"
                color="secondary"
                type="text"
                value={description}
                error={descriptionError}
                fullWidth
                sx={{mb: 3}}
            />

            <FormControl fullWidth sx={{mb: 5}}>
              <InputLabel id="status-label">Situação</InputLabel>
              <Select
                labelId="status-label"
                value={status}
                label="Situação"
                onChange={handleChange}
              >
                <MenuItem value="ACTIVE">Ativo</MenuItem>
                <MenuItem value="INACTIVE">Inativo</MenuItem>
              </Select>
            </FormControl>
                    
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Button variant="outlined" color="secondary" type="submit">Salvar</Button>
            </Stack>
              
          </form>
        </Card>
      </Container>
    </>
  );
}
