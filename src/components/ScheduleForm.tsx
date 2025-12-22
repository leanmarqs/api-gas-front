import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ResetFormDialog } from '@/components/ResetFormDialog'

import { toast } from 'sonner'
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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { scheduleSchema } from '@/schemas/schedule.schema'
import type { ScheduleFormData } from '@/schemas/schedule.schema'

/* -------------------------------- DateTimePicker -------------------------------- */

type DateTimePickerProps = {
  label: string
  value?: Date
  onChange: (date?: Date) => void
  error?: string
}

function DateTimePicker({
  label,
  value,
  onChange,
  error,
}: DateTimePickerProps) {
  return (
    <FormItem>
      <FormLabel className={error ? 'text-destructive' : undefined}>
        {label}
      </FormLabel>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            className={`w-full justify-start text-left font-normal ${
              error ? 'border-destructive' : ''
            }`}
          >
            {value ? format(value, 'dd/MM/yyyy HH:mm') : 'Selecionar'}
          </Button>
        </PopoverTrigger>

        <PopoverContent className='w-auto space-y-4 p-4'>
          <Calendar mode='single' selected={value} onSelect={onChange} />

          <Input
            type='time'
            onChange={(e) => {
              if (!value) return
              const [hours, minutes] = e.target.value.split(':')
              const newDate = new Date(value)
              newDate.setHours(Number(hours))
              newDate.setMinutes(Number(minutes))
              onChange(newDate)
            }}
          />
        </PopoverContent>
      </Popover>

      {/* Slot fixo do erro (mantém alinhamento) */}
      <p className='min-h-[1.25rem] text-sm text-destructive'>{error ?? ''}</p>
    </FormItem>
  )
}

/* -------------------------------- Data -------------------------------- */

const buildings = {
  bloco1: { label: 'Bloco de Aulas 1', rooms: 10 },
  bloco2: { label: 'Bloco de Aulas 2', rooms: 15 },
} as const

type BuildingKey = keyof typeof buildings

/* -------------------------------- Form -------------------------------- */

export function ScheduleForm() {
  const form = useForm<ScheduleFormData>({
    resolver: zodResolver(scheduleSchema),
    mode: 'onChange',
    defaultValues: {
      responsibleName: '',
      responsibleEmail: '',
      actionName: '',
      purpose: 'aula',
      customPurpose: '',
      startDate: undefined,
      endDate: undefined,
      building: '',
      room: '',
    },
  })

  const purpose = form.watch('purpose')
  const building = form.watch('building') as BuildingKey | undefined

  const handleReset = () => {
    form.reset({ purpose: 'aula' })
  }

  const onSubmit = (data: ScheduleFormData) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit, (errors) => {
          if (errors.endDate?.message === '__END_BEFORE_START__') {
            toast.error(
              'A data e hora de término devem ser posteriores ao início',
            )
          }
        })}
        className='mx-auto w-full max-w-2xl space-y-6 rounded-xl border bg-background p-6'
      >
        <h2 className='text-xl font-semibold'>Agendamento</h2>

        {/* Nome */}
        <FormField
          control={form.control}
          name='responsibleName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome do Responsável</FormLabel>
              <FormControl>
                <Input placeholder='Digite o nome' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name='responsibleEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail do Responsável</FormLabel>
              <FormControl>
                <Input
                  type='email'
                  placeholder='email@exemplo.com'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Finalidade */}
        <FormField
          control={form.control}
          name='purpose'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Finalidade</FormLabel>
              <FormControl>
                <RadioGroup value={field.value} onValueChange={field.onChange}>
                  {[
                    ['aula', 'Ministrar Aula'],
                    ['evento', 'Evento'],
                    ['reuniao', 'Reunião'],
                    ['outro', 'Outro'],
                  ].map(([value, label]) => (
                    <div key={value} className='flex items-center gap-2'>
                      <RadioGroupItem value={value} />
                      <Label>{label}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {purpose === 'outro' && (
          <FormField
            control={form.control}
            name='customPurpose'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder='Descreva a finalidade' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* Nome da ação */}
        <FormField
          control={form.control}
          name='actionName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Ação / Evento</FormLabel>
              <FormControl>
                <Input placeholder='Ex: Palestra de Matemática' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Datas */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='startDate'
            render={({ field, fieldState }) => (
              <DateTimePicker
                label='Início'
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />

          <FormField
            control={form.control}
            name='endDate'
            render={({ field, fieldState }) => (
              <DateTimePicker
                label='Término'
                value={field.value}
                onChange={field.onChange}
                error={
                  fieldState.error?.message === '__END_BEFORE_START__'
                    ? undefined
                    : fieldState.error?.message
                }
              />
            )}
          />
        </div>

        {/* Local */}
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
          <FormField
            control={form.control}
            name='building'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prédio</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecione o prédio' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Object.entries(buildings).map(([key, b]) => (
                      <SelectItem key={key} value={key as BuildingKey}>
                        {b.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='room'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sala</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={!building}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          building
                            ? 'Selecione a sala'
                            : 'Escolha o prédio primeiro'
                        }
                      />
                    </SelectTrigger>
                  </FormControl>
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
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Ações */}
        <div className='flex flex-col gap-2 sm:flex-row sm:justify-center'>
          <ResetFormDialog onConfirm={handleReset} />
          <Button type='submit' className='w-full sm:w-40'>
            Salvar Agendamento
          </Button>
        </div>
      </form>
    </Form>
  )
}
