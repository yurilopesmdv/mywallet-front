import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"

export default function SignUpPage() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmP, setConfirmP] = useState('')
  
  const navigate = useNavigate()
  async function handleSubmit(e) {
    e.preventDefault()
    if(password !== confirmP) return alert("Senhas diferentes")
    const body = {name, email, password}
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/signup`, body)
      navigate('/')
    }catch(err) {
      console.log(err.message)
    }
  }

  return (
    <SingUpContainer>
      <form>
        <MyWalletLogo />
        <input onChange={e => setName(e.target.value)} required placeholder="Nome" type="text" />
        <input onChange={e => setEmail(e.target.value)} required placeholder="E-mail" type="email" />
        <input onChange={e => setPassword(e.target.value)} required placeholder="Senha" type="password" autocomplete="new-password" />
        <input onChange={e => setConfirmP(e.target.value)} required placeholder="Confirme a senha" type="password" autocomplete="new-password" />
        <button type="submit" onClick={handleSubmit}>Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
