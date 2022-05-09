import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import Quagga from 'quagga'
import { FaSistrix, FaTrashAlt } from 'react-icons/fa'
import { Video, Label, Form, Input, Button, InputDescricao, InputStatus, InputLocal, ButtonSubmit, ButtonSair } from './style'
import { useState } from 'react'


export default function FormComponet() {

    const [valueCode, setValueCode] = useState('')
    const onDetected = result => {
        Quagga.offDetected(onDetected)

        let code = result.codeResult.code
        setValueCode(code)
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
                numOfWorkers: 1,
                locate: true,
                decoder: {
                    // readers: ['ean_reader']
                    readers: ["code_128_reader", "ean_reader"]
                }
            },
                err => {
                    if (err) {
                        console.log(err)
                         alert("erro ao abri a camera do dispositivo")
                        return
                    }
                    Quagga.start()
                },

                 Quagga.onDetected(onDetected)
            );
        }
    }, []);
    const { register, handleSubmit, watch, formState: { errors } } = useForm()

    function userDate(data) {
        console.log(data)
    }
    console.log(errors)
    return (
        <>
        <Video id="etiqueta"/>
            <Form  onSubmit={handleSubmit(userDate)}>
                <div className='label-header'>
                    <Label>Etiqueta:</Label>

                    <ButtonSair>Sair</ButtonSair>
                </div>

                <Input type="text" value={valueCode} {...register('etiqueta', { required: true })} />
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
        </>
    )
}
