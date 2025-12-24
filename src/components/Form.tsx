import * as React from 'react'
import { TextField, Container, Box, Button } from '@mui/material'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

function Form() {
  const [nameValue, setNameValue] = React.useState('')
  const [emailValue, setEmailValue] = React.useState('')
  const [purposeValue, setPurposeValue] = React.useState('class')

  const handlePurposeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurposeValue((event.target as HTMLInputElement).value)
  }

  const handleReset = () => {
    setNameValue('')
    setEmailValue('')
    setPurposeValue('class')
  }

  const handleSubmit = () => {
    // Aqui você pode adicionar a lógica para enviar os dados do formulário
    alert(
      `Nome: ${nameValue}\nEmail: ${emailValue}\nFinalidade: ${purposeValue}`,
    )
  }

  return (
    <Container
      maxWidth='sm'
      sx={{
        p: 4,
        mt: 4,
        borderRadius: '16px',
        border: '1px solid #e0e0e0',
        bgcolor: '#fafafa',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <span className='text-2xl font-semibold'>Reserva de Salas</span>

      <Box sx={{ mt: 4 }}>
        <TextField
          label='Nome do Interessado'
          variant='outlined'
          fullWidth
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '50px',
              },
            },
          }}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <TextField
          label='Email do Interessado'
          variant='outlined'
          fullWidth
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderRadius: '50px',
              },
            },
          }}
        />
      </Box>

      <FormControl>
        <FormLabel id='demo-radio-buttons-group-label' sx={{ mt: 4 }}>
          Finalidade
        </FormLabel>
        <RadioGroup
          aria-labelledby='demo-radio-buttons-group-label'
          name='radio-buttons-group'
          value={purposeValue}
          onChange={handlePurposeChange}
        >
          <FormControlLabel value='class' control={<Radio />} label='Aula' />
          <FormControlLabel
            value='meeting'
            control={<Radio />}
            label='Reunião'
          />
          <FormControlLabel value='event' control={<Radio />} label='Evento' />
          <FormControlLabel value='other' control={<Radio />} label='Outro' />
        </RadioGroup>
        {purposeValue === 'other' && (
          <Box sx={{ mt: 4 }}>
            <TextField
              label='Especifique outra finalidade'
              variant='outlined'
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '50px',
                  },
                },
              }}
            />
          </Box>
        )}
        {purposeValue === 'event' && (
          <Box sx={{ mt: 4 }}>
            <TextField
              label='Nome do Evento'
              variant='outlined'
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderRadius: '50px',
                  },
                },
              }}
            />
          </Box>
        )}
      </FormControl>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleReset}
          variant='outlined'
          color='primary'
          sx={{ mr: 2, borderRadius: '50px' }}
        >
          Apagar
        </Button>
        <Button
          onClick={handleSubmit}
          variant='contained'
          color='primary'
          sx={{ mr: 2, borderRadius: '50px' }}
        >
          Enviar
        </Button>
      </Box>
    </Container>
  )
}

export default Form
