import React from 'react';
import { Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cartActions from './store/actions/cart';

const CardProduto = ({ product, children }) => {
  const cart = useSelector((state) => state.cart.value);
  const dispatch = useDispatch();

  return (
    <Card className='shadow-sm' xl='3'>
      <Card.Img
        style={{ width: '100%' }}
        src={product.image}
        alt={product.name_product}
        variant='top'
      />
      <Card.Body>
        <Card.Title>{children}</Card.Title>
        <Card.Text>R$ {product.price.toFixed(2)}</Card.Text>
        <Button
          onClick={() => dispatch(cartActions.Add(cart, product))}
          className='w-100'
        >
          Adicionar
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CardProduto;
