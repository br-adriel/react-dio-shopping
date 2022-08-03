import styled from 'styled-components';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import CardProduto from '../components/CardProduto';
import Item from '../components/Item';

const HomePage = () => {
  const products = useSelector((state) => state.products);

  const categorys = products.map((category) => {
    const container = {};
    container['id'] = category.id_categorys;
    container['name'] = category.name_categorys;
    return container;
  });

  const category = categorys
    .map(JSON.stringify)
    .filter(function (item, index, arr) {
      return arr.indexOf(item, index + 1) === -1;
    })
    .map(JSON.parse);

  const arrayCategory = categorys.map((category) => category.name);
  let count = {};

  for (let i = 0; i < arrayCategory.length; i++) {
    {
      let key = arrayCategory[i];
      count[key] = count[key] ? count[key] + 1 : 1;
    }
  }

  return (
    <Container>
      <Row>
        <Col lg='3'>
          <Card className='shadow-sm border-0 mb-3'>
            <Card.Body>
              <Card.Title className='text-center'>Categorias</Card.Title>
              <ListGroup variant='flush'>
                {category.map((category) => {
                  return (
                    <Item
                      key={category.id}
                      name={category.name}
                      details={count[category.name]}
                    />
                  );
                })}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col lg='9'>
          <Grid>
            {products.map((item) => {
              return (
                <CardProduto key={item.id_product} product={item}>
                  {item.name_product}
                </CardProduto>
              );
            })}
          </Grid>
        </Col>
      </Row>
    </Container>
  );
};

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media screen and (min-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default HomePage;
