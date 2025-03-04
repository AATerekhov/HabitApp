import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { postData } from "../modules/apiSlice";
import { Container, Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserPage = () => {
  const dispatch = useDispatch();
  const { loading, data, error } = useSelector((state) => state.apiSlice);
  // const [inputData, setInputData] = useState('');

  const handleSubmit = (event) => {    
    // event.preventDefault();
    dispatch(postData({ input: "" })); // Отправляем данные
  };

  useEffect(() => {
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '60vh' }}>
      <Card style={{ width: '36rem' }}>
        <Card.Body>
          <Card.Title>Заголовок карточки</Card.Title>
          {(!data) ?(<Card.Text>
            Это пример текста внутри карточки. Здесь можно разместить любую информацию.
          </Card.Text>):(<Card.Text>
            {data}
          </Card.Text>)}
          <div className="d-flex justify-content-between">
            <Button variant="primary" disabled={loading} onClick={() => handleSubmit()}>
              {loading ? 'Loading...' : 'Submit'}
            </Button>
            {/* <Button variant="secondary" style={{ marginLeft: '5px' }} onClick={() => dispatch(sendRequestOnMethodWithAuthorization())}>Вызвать метод, закрытый за авторизацией</Button> */}
            {/* <Button variant="success" style={{ marginLeft: '5px' }} onClick={() => dispatch(sendRequestOnMethodGetUserDetail())}>Детали пользователя.</Button> */}
          </div>          
          {error && <p>Error: {error}</p>}
          {data && <p>Response: {JSON.stringify(data)}</p>}
        </Card.Body>
      </Card>
    </Container>
  );
};
  
export default UserPage;