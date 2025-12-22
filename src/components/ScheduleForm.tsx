import { useState } from 'react'

import { ResetFormDialog } from '@/components/ResetFormDialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import { format } from 'date-fns'

function DateTimePicker({
  label,
  value,
  onChange,
}: {
  label: string
  value?: Date
  onChange: (date?: Date) => void
}) {
  return (
    <div className='flex flex-col gap-2'>
      <Label>{label}</Label>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline'>
            {value ? format(value, 'dd/MM/yyyy HH:mm') : 'Selecionar'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-4 space-y-4'>
          <Calendar mode='single' selected={value} onSelect={onChange} />
          <Input
            type='time'
            onChange={(e) => {
              if (!value) return
              const [h, m] = e.target.value.split(':')
              const newDate = new Date(value)
              newDate.setHours(Number(h))
              newDate.setMinutes(Number(m))
              onChange(newDate)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const buildings = {
  bloco1: {
    label: 'Bloco de Aulas 1',
    rooms: 10,
  },
  bloco2: {
    label: 'Bloco de Aulas 2',
    rooms: 15,
  },
} as const

export function ScheduleForm() {
  const [responsibleName, setResponsibleName] = useState('')
  const [responsibleEmail, setResponsibleEmail] = useState('')
  const [actionName, setActionName] = useState('')
  const [purpose, setPurpose] = useState('aula')
  const [customPurpose, setCustomPurpose] = useState('')
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [building, setBuilding] = useState<keyof typeof buildings | ''>('')
  const [room, setRoom] = useState('')

  const handleReset = () => {
    setResponsibleName('')
    setResponsibleEmail('')
    setActionName('')

    setPurpose('aula')
    setCustomPurpose('')
    setStartDate(undefined)
    setEndDate(undefined)
    setBuilding('')
    setRoom('')
  }

  return (
    <form className='mx-auto w-full max-w-2xl space-y-6 rounded-xl border bg-background p-6'>
      <h2 className='text-xl font-semibold'>Agendamento</h2>

      {/* Nome */}
      <div className='space-y-2'>
        <Label>Nome do Responsável</Label>
        <Input
          placeholder='Digite o nome'
          value={responsibleName}
          onChange={(e) => setResponsibleName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className='space-y-2'>
        <Label>E-mail do Responsável</Label>
        <Input
          type='email'
          placeholder='email@exemplo.com'
          value={responsibleEmail}
          onChange={(e) => setResponsibleEmail(e.target.value)}
        />
      </div>

      {/* Finalidade */}
      <div className='space-y-3'>
        <Label>Finalidade</Label>
        <RadioGroup value={purpose} onValueChange={setPurpose}>
          <div className='flex items-center gap-2'>
            <RadioGroupItem value='aula' />
            <Label>Ministrar Aula</Label>
          </div>
          <div className='flex items-center gap-2'>
            <RadioGroupItem value='evento' />
            <Label>Evento</Label>
          </div>
          <div className='flex items-center gap-2'>
            <RadioGroupItem value='reuniao' />
            <Label>Reunião</Label>
          </div>
          <div className='flex items-center gap-2'>
            <RadioGroupItem value='outro' />
            <Label>Outro</Label>
          </div>
        </RadioGroup>

        {purpose === 'outro' && (
          <Input
            placeholder='Descreva a finalidade'
            value={customPurpose}
            onChange={(e) => setCustomPurpose(e.target.value)}
          />
        )}
      </div>

      {/* Nome da ação */}
      <div className='space-y-2'>
        <Label>Nome da Ação / Evento</Label>
        <Input
          placeholder='Ex: Palestra de Matemática'
          value={actionName}
          onChange={(e) => setActionName(e.target.value)}
        />
      </div>

      {/* Datas */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        <DateTimePicker
          label='Início'
          value={startDate}
          onChange={setStartDate}
        />
        <DateTimePicker label='Término' value={endDate} onChange={setEndDate} />
      </div>

      {/* Local */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
        {/* Prédio */}
        <div className='space-y-2'>
          <Label>Prédio</Label>
          <Select
            value={building}
            onValueChange={(value) => {
              setBuilding(value as keyof typeof buildings)
              setRoom('')
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Selecione o prédio' />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(buildings).map(([key, b]) => (
                <SelectItem key={key} value={key}>
                  {b.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sala */}
        <div className='space-y-2'>
          <Label>Sala</Label>
          <Select value={room} disabled={!building} onValueChange={setRoom}>
            <SelectTrigger>
              <SelectValue
                placeholder={
                  building ? 'Selecione a sala' : 'Escolha o prédio primeiro'
                }
              />
            </SelectTrigger>
            <SelectContent>
              {building &&
                Array.from({
                  length: buildings[building].rooms,
                }).map((_, i) => (
                  <SelectItem key={i} value={`sala-${i + 1}`}>
                    Sala {i + 1}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className='flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:justify-center'>
        <ResetFormDialog onConfirm={handleReset} />

        <Button type='submit' className='w-full sm:w-40'>
          Salvar Agendamento
        </Button>
      </div>
    </form>
  )
}
