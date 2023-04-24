import styled from "styled-components"

export default function TransactionItem(t) {
  const {description, value, type, date} = t.t
    return (
        <ListItemContainer>
            <div>
              <span>{date}</span>
              <strong>{description}</strong>
            </div>
            <Value color={type === "entrada" ? "positivo" : "negativo"}>{value.toFixed(2).replace('.',',')}</Value>
          </ListItemContainer>
    )
}
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
