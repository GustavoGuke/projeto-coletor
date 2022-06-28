import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useState } from 'react'

import api from "../../services/api"
import Quagga from 'quagga'
import { MdPhotoCamera } from 'react-icons/md'
import { FaSistrix, FaTrashAlt, FaPhotoVideo } from 'react-icons/fa'
import { Video, Label, Form, Input, Button, InputDescricao, InputStatus, InputLocal, ButtonSubmit, ButtonSair, DivSearch } from './style'

let isCamera = false
export default function FormComponet() {
    const [valueCode, setValueCode] = useState(0)
    let value = ''
    const { register, handleSubmit, watch, formState: { errors }, reset, } = useForm()

    // useEffect(() => {
    //     api
    //       .get("/")
    //       .then((response) => console.log(response))
    //   })

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
    function userDate(data) {
        console.log(data)
    }

    function handleApagarCode(e) {
        e.preventDefault()
        reset()
        setValueCode('')
        isCamera = false

    }

    function handleSearch(e) {
        e.preventDefault()
        //setValueCode(0)
        let inputSearch = document.getElementById("inputSearch").value
        //setValueCode(inputSearch)
        value = inputSearch
        api.get(`/${value}`)
            .then(res => {
                if (res.data[0]) {
                    dataSearch(res.data)
                    let semCadastro = document.getElementById("sem-cadastro")
                    semCadastro.style.display = 'none';
                } else {
                    let descricao = document.getElementById('descricao')
                    let status = document.getElementById('status')
                    let localizacao = document.getElementById('localizacao')
                    let semCadastro = document.getElementById("sem-cadastro")
                    semCadastro.style.display = 'block';
                    descricao.value = ''
                    status.value = ''
                    localizacao.value = ''
                }
            })

    }
    //dataSearch(res.data)
    function dataSearch(data) {
        let descricao = document.getElementById('descricao')
        let status = document.getElementById('status')
        let localizacao = document.getElementById('localizacao')

        const dados = data.map((res) => {
            return res
        })

        descricao.value = dados[0].descricao
        if (dados[0].status_imob) {
            status.value = 'Conferido'
        } else {
            status.value = 'Não Conferido'
        }
        localizacao.value = dados[0].localiza

    }

    async function handleConferir(e) {
        e.preventDefault()
        let status = document.getElementById('status')
        let localizacao = document.getElementById('localizacao').value

        status.value = 1

        const elementos = { status_imob: Number(status.value), localiza: localizacao }
        const res = await api.put(`/${value}`, elementos)
        handleSearch(e)
        console.log(res.data)
    }

    return (
        <>
            <Form id="etiqueta" onSubmit={handleSubmit(userDate)}>
                <div className='label-header'>
                    <Label>Etiqueta:</Label>
                </div>

                {isCamera

                    ? <Input
                        autoFocus
                        type="text"
                        value={valueCode}
                        {...register('etiqueta', { required: true })} />

                    : <Input
                        id='inputSearch'
                        autoFocus
                        type="text"
                        {...register('etiqueta', { required: true })} />
                }
                {errors.etiqueta && <span>Input etiqueta é obrigatorio</span>}

                <div className='label-header'>
                    <Button onClick={handleApagarCode}><FaTrashAlt /></Button>
                    <Button onClick={handleShowCamera}><MdPhotoCamera /></Button>
                    <Button onClick={handleSearch}><FaSistrix /> </Button>
                </div>
                <DivSearch id='sem-cadastro'>Imobilizado não cadastrado</DivSearch>
                <Label>Descrição:</Label>
                <InputDescricao id='descricao' type="text" disabled value=""  {...register('descrição')} />


                <div className='input'>
                    <Label>Status:</Label>
                    <InputStatus id='status' disabled type="text" value="" {...register('status')} />
                </div>

                <div className='input'>
                    <Label>Localização:</Label>
                    <InputLocal id='localizacao' type='text' {...register('Localização')} rows="3" />
                    <ButtonSubmit type='submit' onClick={handleConferir}>Conferido</ButtonSubmit>
                </div>
            </Form>
        </>
    )
}
