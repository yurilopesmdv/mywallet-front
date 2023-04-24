import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import { UserContext } from "../contexts/userContext"

export default function SignInPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setUser} = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const userSerializado = localStorage.getItem("user")
    const userInfo = JSON.parse(userSerializado)
    if(userInfo) {
      setUser(userInfo)
      navigate("/home")
    }
  },[])
  async function handleSubmit(e) {
    e.preventDefault()
    if(!email || !password) return alert("Preencha os dados corretamente!")
    const body = {email, password}
    
    //const {name, token} = await axios.post(`${process.env.REACT_APP_API_URL}/signin`, body)
    const promise = axios.post(`${process.env.REACT_APP_API_URL}/signin`, body)
    promise.then((res) => {
      const {name, token} = res.data
      const userSerializado = JSON.stringify({name, token})
      localStorage.setItem("user", userSerializado)
      setUser({name, token})
      navigate("/home")
    })
    promise.catch((err) => alert(err.response.data))
    
  }
  return (
    <SingInContainer>
      <form>
        <MyWalletLogo />
        <input onChange={e => setEmail(e.target.value)} required placeholder="E-mail" type="email" />
        <input onChange={e => setPassword(e.target.value)} required placeholder="Senha" type="password" autocomplete="new-password" />
        <button type="submit" onClick={handleSubmit}>Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
