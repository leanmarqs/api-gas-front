import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'

interface ResetFormDialogProps {
  onConfirm: () => void
}

export function ResetFormDialog({ onConfirm }: ResetFormDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type='button' variant='outline' className='w-full sm:w-40'>
          Apagar
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apagar formulário</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja apagar todos os dados do formulário? Essa
            ação não poderá ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>

          <AlertDialogAction
            onClick={onConfirm}
            className='bg-destructive text-destructive-foreground hover:bg-destructive/90'
          >
            Apagar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
