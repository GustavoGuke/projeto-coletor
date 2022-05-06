import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Quagga from 'quagga'
import { FaSistrix, FaTrashAlt } from 'react-icons/fa'
import { Label, Form, Input, Button, InputDescricao, InputStatus, InputLocal, ButtonSubmit } from './style'


export default function FormComponet() {

    const onDetected = result => {
        Quagga.offDetected(onDetected)

        let code = result.codeResult.code
        alert(code)
    }

    useEffect(() => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
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
                    readers: ["code_128_reader","'ean_reader'"]
                }
            },
                err => {
                    if (err) {
                        console.log(err)
                        // alert("erro ao abri a camera do dispositivo")
                        return
                    }
                    Quagga.start()
                },

                // Quagga.onDetected(onDetected)
            );
        }
    }, []);
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    function userDate(data) {
        console.log(data)
    }
    console.log(errors)
    return (
        <Form id="etiqueta" onSubmit={handleSubmit(userDate)}>
            <div className='label-header'>
                <Label>Etiqueta:</Label>

                <button>Sair</button>
            </div>

            <Input type="text" value="1257" {...register('etiqueta', { required: true })} />
            {errors.etiqueta && <span>Input etiqueta é obrigatorio</span>}

            <div className='label-header'>
                <Button><FaTrashAlt /></Button>
                <Button><FaSistrix /> </Button>
            </div>

            <Label>Descrição:</Label>
            <InputDescricao type="text" disabled value="Dell optplex 3020 Dell optplex 3020 Dell optplex 3020"  {...register('descrição')} />


            <div className='input'>
                <Label>Status:</Label>
                <InputStatus disabled type="text" value="Não Conferido" {...register('status')} />
            </div>

            <div className='input'>
                <Label>Localização:</Label>
                <InputLocal value="TI" type='text' {...register('Localização')} rows="3" />
                <ButtonSubmit type='submit'>Conferido</ButtonSubmit>
            </div>
        </Form>
    )
}
