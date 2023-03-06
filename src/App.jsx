import { Box, Container, Paper, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import BadgeOutlined from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Table from './components/Table'
import { data } from './data'


function App() {

  const [showPassword, setShowPassword] = useState(false);
  const emptyForm = {
    id: '',
    fullName: '',
    email: '',
    password: '',
    rePassword: ''
  }
  const [mode, setMode] = useState('add')
  const [formData, setFormData] = useState(emptyForm)
  const [table, setTable] = useState(data)
  // const [error, setError] = useState({
  //   fullName:[{msg:'min. 5',status:false},]
  // })

  let unicId = table.length ? (table[table.length - 1].id + 1) : 1



  const handleForm = (e) => {
    setFormData(formData => ({ ...formData, [e.target.name]: e.target.value }))
    console.log(formData);
  }

  const remove = (id) => {
    setTable(table => table.filter(item => item.id !== id))
  }

  const edit = (row) => {
    setFormData(formData => ({
      id: row.id,
      fullName: row.fullName,
      email: row.email,
      password: row.password,
      rePassword: row.password
    }))
    setMode('edit')
  }

  const saveEdit = () => {

    setTable(table => table.map(row => {
      if (row.id === formData.id) {
        return {
          id: row.id,
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password
        }
      }
      return row
    }))
    setFormData({ ...emptyForm })
    setMode('add')
  }

  const addTable = () => {
    let newTable = [...table]
    newTable.push({
      id: unicId,
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password
    })
    setTable(newTable)
    setFormData({ ...emptyForm })
  }

  const validation = () => {

  }

  return (
    <Container maxWidth='lg'>
      <Paper
        elevation={3}
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' }
        }}>
        <Box sx={{
          width: { xs: '100%', sm: '30%' },
          p: 5,
          boxSizing: 'border-box'
        }}>
          <form>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', boxSizing: 'border-box' }}>
              <BadgeOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth label="Fullname" variant="standard" margin='dense' onChange={(e) => handleForm(e)} name='fullName' value={formData.fullName} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', boxSizing: 'border-box' }}>
              <EmailOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth label="Email" variant="standard" margin='dense' onChange={(e) => handleForm(e)} name='email' value={formData.email} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', boxSizing: 'border-box' }}>
              <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth label='Password' variant="standard" margin='dense' onChange={(e) => handleForm(e)} name='password' value={formData.password} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', boxSizing: 'border-box' }}>
              <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth label='Re-password' variant="standard" margin='dense' onChange={(e) => handleForm(e)} name='rePassword' value={formData.rePassword} />
            </Box>
            {mode === 'add' ?
              <Button
                variant='contained'
                color="secondary"
                startIcon={<PersonAddAltIcon />}
                sx={{
                  my: '20px',
                  width: '100%'
                }}
                onClick={addTable}
              >
                Add to table
              </Button>
              :
              <Button
                variant='contained'
                color="secondary"
                startIcon={<ModeEditOutlineIcon />}
                sx={{
                  my: '20px',
                  width: '100%'
                }}
                onClick={saveEdit}
              >
                Save changes
              </Button>
            }
          </form>
        </Box>
        <Box sx={{
          width: { xs: '100%', sm: '80%' },
          p: 5,
          boxSizing: 'border-box'
        }}>
          {table && table.length > 0 ? <Table table={table} remove={remove} edit={edit} /> : <h2>Empty</h2>}
        </Box>
      </Paper>
    </Container>
  )
}

export default App