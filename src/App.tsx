import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function App() {
  const handleClick = () => {
    const toastId = toast.loading('Salvando alterações...')

    // Simula uma ação assíncrona (ex: request)
    setTimeout(() => {
      toast.success('Salvo com sucesso', {
        description: 'As alterações foram aplicadas.',
        id: toastId, // substitui o loading pelo success
      })
    }, 3000)
  }

  return (
    <div className='flex min-h-svh flex-col items-center justify-center'>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  )
}

export default App
