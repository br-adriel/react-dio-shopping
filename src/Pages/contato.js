import { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from 'react-bootstrap';

const Contatos = () => {
  const url = 'http://localhost:5000/message';
  const [message, setMessage] = useState([]);
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [validator, setValidator] = useState(false);
  const [render, setRender] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(async () => {
    const response = await fetch(url);
    const data = await response.json();
    setMessage(data);
  }, [render]);

  const sendMessage = () => {
    setValidator(false);
    if (author.length <= 0 || content.length <= 0) {
      return setValidator(!validator);
    }
    const bodyForm = {
      email: author,
      message: content,
    };

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyForm),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          setRender(true);
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 5000);
        }
      });

    setAuthor('');
    setContent('');

    console.log(content);
  };

  return (
    <>
      <Container>
        <Row>
          <Col xs='12' md='6' lg='4' className='mb-2'>
            <Card>
              <Card.Body>
                <Card.Title>Entre em contato</Card.Title>

                {validator && (
                  <Alert
                    variant='warning'
                    dismissible
                    fade
                    show
                    className='mt-2'
                    role='alert'
                  >
                    <strong>Por favor preencha todos os campos!</strong>
                    <Button
                      type='button'
                      className='btn-close'
                      data-bs-dismiss='alert'
                      aria-label='Close'
                    ></Button>
                  </Alert>
                )}

                {success && (
                  <Alert
                    variant='success'
                    dismissible
                    fade
                    show
                    className='mt-2'
                    role='alert'
                  >
                    <strong>Mensagem enviada</strong>
                  </Alert>
                )}

                <Form.Group>
                  <Form.Label controlId='nome'>Nome</Form.Label>
                  <Form.Control
                    type='text'
                    required
                    id='nome'
                    onChange={(event) => {
                      setAuthor(event.target.value);
                    }}
                    value={author}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label controlId='mensagem'>Mensagem</Form.Label>
                  <textarea
                    required
                    id='mensagem'
                    value={content}
                    onChange={(event) => {
                      setContent(event.target.value);
                    }}
                    className='form-control'
                  ></textarea>
                </Form.Group>
                <Button
                  onClick={sendMessage}
                  className='mt-2'
                  variant='primary'
                >
                  Enviar
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs='12' md='6' lg='8'>
            {message.map((content) => {
              return (
                <Card className='mb-2' key={content.id}>
                  <Card.Body>
                    <Card.Title>{content.email}</Card.Title>
                    <Card.Text>{content.message}</Card.Text>
                    <Card.Text>
                      <small className='text-muted'>
                        {new Date(content.created_at).toDateString()}
                      </small>
                    </Card.Text>
                  </Card.Body>
                </Card>
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Contatos;
