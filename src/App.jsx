import { Box, Container, Paper, TextField, Button } from '@mui/material'
import React, { useState } from 'react'
import BadgeOutlined from '@mui/icons-material/BadgeOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyOutlinedIcon from '@mui/icons-material/KeyOutlined';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import Table from './components/Table'
import { useForm } from 'react-hook-form';
import { data } from './data'


function App() {

  //react-hook-form
  const { register, handleSubmit, watch, setValue, reset, formState: { errors } } = useForm();
  register("id")
  //----------//

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
    setValue('id', row.id)
    setValue('fullName', row.fullName)
    setValue('email', row.email)
    setValue('password', row.password)
    setValue('rePassword', row.password)
    setMode('edit')
  }

  const saveEdit = () => {

    let formId = watch('id')
    let formFullName = watch('fullName')
    let formEmail = watch('email')
    let formPassword = watch('password')
    setTable(table => table.map(row => {
      if (row.id === formId) {
        console.log('oldu');
        return {
          id: formId,
          fullName: formFullName,
          email: formEmail,
          password: formPassword
        }
      }
      return row
    }))
    reset()
    setMode('add')
  }

  const addTable = (e) => {
    let newTable = [...table]
    newTable.push({
      id: unicId,
      fullName: watch('fullName'),
      email: watch('email'),
      password: watch('password')
    })
    setTable(newTable)
    reset()
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
          <form onSubmit={mode === 'add' ? handleSubmit(addTable) : handleSubmit(saveEdit)}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', boxSizing: 'border-box' }}>
              <BadgeOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth label="Fullname" variant="standard" margin='dense' defaultValue={' '} {...register("fullName", { required: true, pattern: { value: /...../i, message: 'min length 5' } })} error={Boolean(errors?.fullName)} helperText={errors?.fullName?.message} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', boxSizing: 'border-box' }}>
              <EmailOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth label="Email" variant="standard" margin='dense' defaultValue={' '} {...register("email", { required: true, pattern: { value: /...@...../i, message: 'required an email' } })} error={Boolean(errors?.email)} helperText={errors?.email?.message} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', boxSizing: 'border-box' }}>
              <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth label='New password' variant="standard" margin='dense' defaultValue={' '} {...register("password", { required: true, pattern: { value: /...../i, message: 'min length 5' } })} error={Boolean(errors?.password)} helperText={errors?.password?.message} />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', boxSizing: 'border-box' }}>
              <KeyOutlinedIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
              <TextField fullWidth label='Confirm password' variant="standard" margin='dense' defaultValue={' '} {...register("rePassword", {
                required: true, validate: (val) => { if (watch('password') !== val) { return "Your passwords do no match" } }
              })} error={Boolean(errors?.rePassword)} helperText={errors?.rePassword?.message} />
            </Box>
            {mode === 'add' ?
              <Button
                type='submit'
                variant='contained'
                color="secondary"
                startIcon={<PersonAddAltIcon />}
                sx={{
                  my: '20px',
                  width: '100%'
                }}
              >
                Add to table
              </Button>
              :
              <Button
                type='submit'
                variant='contained'
                color="secondary"
                startIcon={<ModeEditOutlineIcon />}
                sx={{
                  my: '20px',
                  width: '100%'
                }}
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