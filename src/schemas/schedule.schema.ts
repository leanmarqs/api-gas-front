import { z } from 'zod'

export const scheduleSchema = z
  .object({
    responsibleName: z.string().min(1, 'Informe o nome do responsável'),

    responsibleEmail: z
      .string()
      .min(1, 'Informe o e-mail do responsável')
      .email('Informe um e-mail válido'),

    purpose: z.enum(['aula', 'evento', 'reuniao', 'outro']),

    customPurpose: z.string().optional(),

    actionName: z.string().min(1, 'Informe o nome da ação ou evento'),

    // ⬇️ IMPORTANTE: datas começam como opcionais
    startDate: z.date().optional(),
    endDate: z.date().optional(),

    building: z.string().min(1, 'Selecione o prédio'),

    room: z.string().min(1, 'Selecione a sala'),
  })

  /* -------------------- Finalidade -------------------- */

  .refine((data) => !!data.purpose, {
    path: ['purpose'],
    message: 'Selecione a finalidade',
  })

  .refine(
    (data) =>
      data.purpose !== 'outro' ||
      (data.customPurpose && data.customPurpose.trim().length > 0),
    {
      path: ['customPurpose'],
      message: 'Descreva a finalidade',
    },
  )

  /* -------------------- Datas obrigatórias -------------------- */

  .superRefine((data, ctx) => {
    if (!data.startDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['startDate'],
        message: 'Informe a data e hora de início',
      })
    }

    if (!data.endDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: 'Informe a data e hora de término',
      })
    }

    if (!data.startDate || !data.endDate) return

    if (data.endDate <= data.startDate) {
      ctx.addIssue({
        code: 'custom',
        path: ['endDate'],
        message: '__END_BEFORE_START__',
      })
    }
  })

export type ScheduleFormData = z.infer<typeof scheduleSchema>
