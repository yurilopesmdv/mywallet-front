import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { UserContext } from "../contexts/userContext"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import TransactionItem from "../components/TransactionItem"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const {user, setUser} = useContext(UserContext)
  const [list, setList] = useState([])
  const [balance, setBalance] = useState(0)
  const navigate = useNavigate()
  
  
  useEffect(() => {
    console.log(user)
    if(!user) {
      return navigate("/")
    }
    const promise = axios.get(`${process.env.REACT_APP_API_URL}/transactions`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
    promise.then((res) => {
      const arr = res.data
      console.log(arr)
      const sald = arr.pop()
      setList(arr.reverse())
      setBalance(sald.saldo)
    })
    promise.catch((err) => {
      console.log(err.response.data)
    })
  }, [])
  function addEntry() {
    navigate('/nova-transacao/entrada')
  }
  function addExit() {
    navigate('/nova-transacao/saida')
  }
  function logout() {
    axios.delete(`${process.env.REACT_APP_API_URL}/logout`, {token: user.token})
    .then((res) => {
      localStorage.removeItem('user')
      alert("Você foi deslogado")
      navigate('/')
    })
    .catch((err) => console.log(err.response.data))
    
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user ? user.name : ''}</h1>
        <BiExit onClick={logout}/>
      </Header>

      <TransactionsContainer>
        <ul>
            {list.map((t, index) => {
              return (
                <TransactionItem key={index} t={t} index={index}/>
              )
            })}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={balance > 0 ? "positivo" : "negativo"}>{balance ? balance : 0}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        
        <button onClick={addEntry}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
        <button onClick={addExit}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
