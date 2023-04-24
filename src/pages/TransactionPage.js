import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { UserContext } from "../contexts/userContext"

export default function TransactionsPage() {
  const type = useParams().tipo
  const [value, setValue] = useState(0)
  const [description, setDescription] = useState('')
  const {user} = useContext(UserContext)
  const navigate = useNavigate()
  function handleSubmit(e){
    e.preventDefault()
    console.log(user.token)
    const body = {description, value: Number(value), type}
    const config = {
      headers: { Authorization: `Bearer ${user.token}`}
  }
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/transactions`, body, config)
    promise.then((res) => {
        navigate('/home')
    })
    promise.catch((err) => alert(err.response.data))
  }
  return (
    <TransactionsContainer>
      <h1>Nova {type === 'entrada' ? "ENTRADA" : "SAÍDA"}</h1>
      <form>
        <input onChange={e => setValue(e.target.value)} required placeholder="Valor" type="text"/>
        <input onChange={e => setDescription(e.target.value)} required placeholder="Descrição" type="text" />
        <button type="submit" onClick={handleSubmit}>Salvar {type === 'entrada' ? "ENTRADA" : "SAÍDA"}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`