import { useState } from 'react'
import { Configuration, OpenAIApi } from 'openai'
import Spinner from './components/Spinner'
import './App.css'

function App() {

  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const configuration = new Configuration({
    apiKey: import.meta.env.VITE_Open_AI_Key,
  });

  const openai = new OpenAIApi(configuration);

  const generateImage = async () => {
    setLoading(true)
    const res = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: "1024x1024",
    });

    setResult(res.data.data[0].url);
    setLoading(false)
  }

  return (
    <div className='app-main'>
      <h2>Generated an image using Open AI API</h2>
      <input  className='app-input' onChange={ e => setPrompt(e.target.value) } placeholder="Type something to generated an image" />
      <button disabled={loading} onClick={generateImage}>Generate an Image</button>
      {loading && <Spinner />}
      {result.length > 0 ? <img className='result-image' src={result} alt="result" /> : <></>}
    </div>
  )
}

export default App
