import { useState } from 'react'
import { Github as GithubIcon, Wand2 } from 'lucide-react'
import { useCompletion } from 'ai/react'

import { Button } from './components/ui/button'
import { Separator } from './components/ui/separator'
import { Textarea } from './components/ui/textarea'
import { Label } from './components/ui/label'
import { Slider } from './components/ui/slider'
import { VideoInputForm } from './components/video-input-form'
import { PromptSelect } from './components/prompt-select'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './components/ui/select'

export function App() {
  const [videoId, setVideoId] = useState<string | null>(null)
  const [temperature, setTemperature] = useState(0.5)

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return (
    <div className='flex flex-col min-h-screen'>
      <header className='px-6 py-3 flex justify-between items-center border-b'>
        <h1 className='text-xl font-bold'>upload.ai</h1>

        <div className='flex items-center gap-3'>
          <span className='text-sm text-muted-foreground'>
            Desenvolvido com 💜 no NLW da Rocketseat
          </span>
          <Separator orientation='vertical' className='h-6' />
          <Button variant='outline'>
            <GithubIcon className='w-4 h-4 mr-2' />
            GitHub
          </Button>
        </div>
      </header>

      <main className='flex-1 flex gap-6 p-6'>
        <div className='flex flex-col flex-1 gap-4'>
          <div className='grid grid-rows-2 gap-4 flex-1'>
            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Inclua o prompt para a IA...'
              value={input}
              onChange={handleInputChange}
            />

            <Textarea
              className='resize-none p-4 leading-relaxed'
              placeholder='Resultado gerado pela IA'
              readOnly
              value={completion}
            />
          </div>

          <p className='text-sm text-muted-foreground'>
            Lembre-se: você pode utilizar a variável <code className='text-violet-400'>&#123;transcription&#125;</code> {' '}
            no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.
          </p>
        </div>

        <aside className='w-80 space-y-6'>
          <VideoInputForm onVideoUploaded={setVideoId} />
          
          <Separator />

          <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <Label>Prompt</Label>
              <PromptSelect onPromptSelected={setInput} />
            </div>

            <div className='space-y-2'>
              <Label>Modelo</Label>

              <Select disabled defaultValue='gpt3.5'>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='gpt3.5'>GPT 3.5-turbo 16k</SelectItem>
                </SelectContent>
              </Select>

              <span className='block text-xs text-muted-foreground italic'>
                Você poderá customizar essa opção em breve.
              </span>
            </div>

            <Separator />

            <div className='space-y-4'>
              <Label>Temperatura</Label>

              <Slider
                min={0}
                max={1}
                step={0.1}
                defaultValue={[temperature]}
                onValueChange={value => setTemperature(value[0])}
              />

              <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                Valores mais altos tendem a deixar o resultado mais criativo, porém, suscetível a erros.
              </span>
            </div>

            <Separator />

            <Button disabled={isLoading} type='submit' className='w-full'>
              Executar
              <Wand2 className='w-4 h-4 ml-2' />
            </Button>
          </form>
        </aside>
      </main>
    </div>
  )
}