import {useForm} from 'react-hook-form' 
import { useEffect } from 'react'
import Quagga from 'quagga'


export default function Form() {

    const onDetected = result => {
        Quagga.offDetected(onDetected)

        let code = result.codeResult.code
        alert(code)
    }

    useEffect(() => {
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
            Quagga.init({
                inputStream: {
                    name: "Live",
                    type: "LiveStream",
                    target: document.querySelector("#etiqueta"),
                    constraints: {
                        facingMode: "environment",
                    },
                },
                area: { // defines rectangle of the detection/localization area
                    top: "0%",    // top offset
                    right: "0%",  // right offset
                    left: "0%",   // left offset
                    bottom: "0%"  // bottom offset
                },
                numOfWorkers: 1,
                locate: true,
                decoder: {
                   // readers: ['ean_reader']
                   readers: ["code_128_reader"] 
                }
            },
            err => {
                if(err) {
                    console.log(err)
                    alert("erro ao abri a camera do dispositivo")
                    return
                }
                Quagga.start()
            },
            
            Quagga.onDetected(onDetected)
            );
        }
    },[]);
    const {register, handleSubmit, watch, formState: { errors }} = useForm()

    function userDate(data){
        console.log(data)
    }
    console.log(errors)
    return (
        <form id="etiqueta" onSubmit={handleSubmit(userDate)}>
            <div>
                <label htmlFor="">
                    Etiqueta
                    <input type="text"  {...register('etiqueta', { required: true })}  />
                    {errors.etiqueta && <span>Input etiqueta é obrigatorio</span>}
                </label>
                <button>Consultar</button>
                <button>Limpar</button>
                <button>Sair</button>
                <div>
                    <input type="text" disabled  {...register('descrição')}/>
                </div>
            </div>

            <div>
                <label htmlFor="">
                    Status
                    <input disabled type="text" {...register('status')} />
                </label>
                
            </div>

            
                <label htmlFor="">
                    Localização
                </label>
                <input type='text' {...register('Localização')}rows="3"/>
           
            <button type='submit'>Conferido</button>
        </form>
    )
}
/*
todos:
label - etiqueta
input - entrada dos dados
3 botaõ  - consultar - limpar - sair

label - status
div - conferido ou nao conferido 
1 botaõ - conferido


label - localização
textArea - onde esta o imobilizado


*/