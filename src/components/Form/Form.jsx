import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useState } from 'react'
import Quagga from 'quagga'
import { FaSistrix, FaTrashAlt } from 'react-icons/fa'
import { Video, Label, Form, Input, Button, InputDescricao, InputStatus, InputLocal, ButtonSubmit, ButtonSair } from './style'

let isCamera = false
export default function FormComponet() {
    const [valueCode, setValueCode] = useState('')


    const onDetected = result => {
        Quagga.offDetected(onDetected)

        let code = result.codeResult.code
        setValueCode(code)
        alert(code)
    }
    function handleShowCamera(e) {
        e.preventDefault()
        isCamera = true
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
    }
    // useEffect(() => {
    //     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //         Quagga.init({
    //             inputStream: {
    //                 name: "Live",
    //                 type: "LiveStream",
    //                 target: document.querySelector("#etiqueta"),
    //                 constraints: {
    //                     facingMode: "environment",
    //                 },
    //             },
    //             numOfWorkers: 1,
    //             locate: true,
    //             decoder: {
    //                 readers: ["code_128_reader", "ean_reader"]
    //             }
    //         },
    //             err => {
    //                 if (err) {
    //                     console.log(err)
    //                      alert("erro ao abri a camera do dispositivo")
    //                     return
    //                 }
    //                 Quagga.start()
    //             },

    //              Quagga.onDetected(onDetected)
    //         );
    //     }
    // }, []);
    const { register, handleSubmit, watch, formState: { errors }, reset, } = useForm()

    function userDate(data) {
        console.log(data)
    }

    function handleApagarCode(e) {
        e.preventDefault()
        isCamera = false
        reset()

    }

    return (
        <>
            <Form id="etiqueta" onSubmit={handleSubmit(userDate)}>
                <div className='label-header'>
                    <Label>Etiqueta:</Label>

                    <ButtonSair>Sair</ButtonSair>
                </div>

                {isCamera

                    ? <Input
                        autoFocus
                        type="text"
                        value={valueCode}
                        {...register('etiqueta', { required: true })} />

                    : <Input
                        autoFocus
                        type="text"
                        {...register('etiqueta', { required: true })} />
                }
                {errors.etiqueta && <span>Input etiqueta é obrigatorio</span>}

                <div className='label-header'>
                    <Button onClick={handleApagarCode}><FaTrashAlt /></Button>
                    <Button onClick={handleShowCamera}>C</Button>
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
