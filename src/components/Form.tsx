import * as React from 'react'
import {
  TextField,
  Container,
  Box,
  Button,
  Stack,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material'

import Grid from '@mui/material/Grid'
import type { SelectChangeEvent } from '@mui/material/Select'

import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')

function Form() {
  const [nameValue, setNameValue] = React.useState('')
  const [emailValue, setEmailValue] = React.useState('')
  const [purposeValue, setPurposeValue] = React.useState('class')
  const [otherPurposeValue, setOtherPurposeValue] = React.useState('')
  const [eventNameValue, setEventNameValue] = React.useState('')

  const [start, setStart] = React.useState<Dayjs | null>(null)
  const [end, setEnd] = React.useState<Dayjs | null>(null)

  const [building, setBuilding] = React.useState('')
  const [room, setRoom] = React.useState('')

  const handlePurposeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPurposeValue((event.target as HTMLInputElement).value)
  }

  const handleBuildingChange = (event: SelectChangeEvent) => {
    setBuilding(event.target.value)
    setRoom('')
  }

  const handleRoomChange = (event: SelectChangeEvent) => {
    setRoom(event.target.value)
  }

  const getRooms = () => {
    if (building === 'ca1') return Array.from({ length: 10 }, (_, i) => i + 1)
    if (building === 'ca2') return Array.from({ length: 15 }, (_, i) => i + 1)
    return []
  }

  const handleReset = () => {
    setNameValue('')
    setEmailValue('')
    setPurposeValue('class')
    setOtherPurposeValue('')
    setEventNameValue('')
    setStart(null)
    setEnd(null)
    setBuilding('')
    setRoom('')
  }

  const handleSubmit = () => {
    const payload = {
      name: nameValue,
      email: emailValue,
      purpose: purposeValue,
      otherPurpose: otherPurposeValue || null,
      eventName: eventNameValue || null,
      start: start ? start.format('DD-MM-YYYY HH:mm') : null,
      end: end ? end.format('DD-MM-YYYY HH:mm') : null,
      building,
      room,
    }

    console.log(JSON.stringify(payload, null, 2))
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
          fullWidth
          value={nameValue}
          onChange={(e) => setNameValue(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root fieldset': { borderRadius: '50px' },
          }}
        />
      </Box>

      <Box sx={{ mt: 4 }}>
        <TextField
          label='Email do Interessado'
          fullWidth
          value={emailValue}
          onChange={(e) => setEmailValue(e.target.value)}
          sx={{
            '& .MuiOutlinedInput-root fieldset': { borderRadius: '50px' },
          }}
        />
      </Box>

      <FormControl>
        <FormLabel sx={{ mt: 2 }}>Finalidade</FormLabel>

        <RadioGroup value={purposeValue} onChange={handlePurposeChange}>
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
          <Box sx={{ mt: 3 }}>
            <TextField
              label='Especifique outra finalidade'
              fullWidth
              value={otherPurposeValue}
              onChange={(e) => setOtherPurposeValue(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root fieldset': { borderRadius: '50px' },
              }}
            />
          </Box>
        )}

        {purposeValue === 'event' && (
          <Box sx={{ mt: 3 }}>
            <TextField
              label='Nome do Evento'
              fullWidth
              value={eventNameValue}
              onChange={(e) => setEventNameValue(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root fieldset': { borderRadius: '50px' },
              }}
            />
          </Box>
        )}
      </FormControl>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {/* LINHA 1 - Início / Término */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2} sx={{ width: 300, mr: 2 }}>
            <DateTimePicker
              label='Início'
              value={start}
              onChange={setStart}
              disablePast
              ampm={false}
              format='DD/MM/YYYY HH:mm'
            />
          </Stack>

          <Stack spacing={2} sx={{ width: 300 }}>
            <DateTimePicker
              label='Término'
              value={end}
              onChange={setEnd}
              disablePast
              ampm={false}
              format='DD/MM/YYYY HH:mm'
            />
          </Stack>
        </Box>

        {/* LINHA 2 - Edifício / Sala */}
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Stack spacing={2} sx={{ width: 300, mr: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Edifício</InputLabel>
              <Select
                value={building}
                label='Edifício'
                onChange={handleBuildingChange}
              >
                <MenuItem value='ca1'>Central de Aulas 1</MenuItem>
                <MenuItem value='ca2'>Central de Aulas 2</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <Stack spacing={2} sx={{ width: 300 }}>
            <FormControl fullWidth disabled={!building}>
              <InputLabel>Sala</InputLabel>
              <Select value={room} label='Sala' onChange={handleRoomChange}>
                {getRooms().map((r) => (
                  <MenuItem key={r} value={r}>
                    Sala {r}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </Box>
      </LocalizationProvider>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={handleReset}
          variant='outlined'
          sx={{ mr: 2, borderRadius: '50px' }}
        >
          Apagar
        </Button>

        <Button
          onClick={handleSubmit}
          variant='contained'
          sx={{ mr: 2, borderRadius: '50px' }}
        >
          Enviar
        </Button>
      </Box>
    </Container>
  )
}

export default Form
