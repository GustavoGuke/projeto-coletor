import styled from "styled-components";

export const Label = styled.label`
    font-size: 1.5em;
    color: #F5F1EF;
`

export const Form = styled.form`
    max-width: 700px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin: auto;
   

    .label-header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 5px;
        margin-top: 5px;
    }

    .input{
        display: flex;
        flex-direction: column;
    }
`

export const Input = styled.input`
    height: 56px;
    text-align: center;
    font-size: 2em;
    border: 0;
    border-radius: 10px;
    margin-bottom: 10px;
`
export const InputStatus= styled(Input)`
    color: #F5F1EF;
    height: 45px;
    font-size: 1.5em;
`
export const InputDescricao = styled.textarea`
    color: #F5F1EF;
    height: 70px;
    padding: 5px;
    font-size: 1.1em;
    border: 0;
    border-radius: 10px;
    margin-bottom: 15px;
`
export const InputLocal = styled.textarea`
    color: 'black';
    height: 40px;
    padding-left: 15px;
    font-weight: bold;
    padding-top: 10px;
    font-size: 1.1em;
    border: 0;
    border-radius: 10px;
    margin-bottom: 15px;
`


export const Button = styled.button`
    display: inline-block;
    background-color: #0080FF;
    color: #F5F1EF;
    height: 53px;
    width: 61px;
    font-size: 1.8em;
    border: none;
    border-radius: 10px;
    box-shadow: #333 3px 3px;
    margin-bottom: 30px;
    cursor: pointer;
    padding-top: 5px;

    &:hover {
        background-color: #000057;
    }
`

export const ButtonSair = styled(Button)`
    margin-bottom: 5px;
    height: 30px;
    font-size: 1em;
`

export const ButtonSubmit = styled.button`
    display: inline-block;
    margin-top: 10px;
    height: 50px;
    background-color: #1BC472;
    color: #F5F1EF;
    border: none;
    border-radius: 10px;
    box-shadow: #333 3px 3px;
    font-size: 2em;
    
    &:hover{
        background-color: #0c9972;
    }
`