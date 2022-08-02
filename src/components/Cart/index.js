import { useState } from 'react';
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import cartActions from '../store/actions/cart';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  let totalPrice = 0;

  for (let i = 0; i < cart.Cart.length; i++) {
    totalPrice += cart.Cart[i].price * cart.Cart[i].quantity;
  }

  if (cart.value > 0) {
    localStorage.setItem('dioshopping: cart', JSON.stringify(cart));
  }

  return (
    <>
      <Button
        variation='link'
        onClick={() => setShowModal(true)}
        className='nav-link'
      >
        <div className='d-flex gap-2 align-items-center'>
          <span>
            <i className='fas fa-shopping-cart'></i>
          </span>
          <span>{cart.value > 0 ? cart.value : null}</span>
        </div>
      </Button>

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Meu carrinho</Modal.Title>
        </Modal.Header>
        <Modal.Body className='table-responsive'>
          <table className='table table-hover'>
            <thead>
              <tr>
                <th scope='col'></th>
                <th scope='col'>Produto</th>
                <th scope='col'>Qtd</th>
                <th scope='col'>Preço</th>
                <th scope='col'>Ações</th>
                <th scope='col'>Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.Cart.map((item) => {
                return (
                  <tr key={item.id}>
                    <th>
                      <Button
                        onClick={() =>
                          dispatch(cartActions.DeleteItem(cart, item))
                        }
                        variant='danger'
                      >
                        <i className='fas fa-window-close'></i>
                      </Button>
                    </th>
                    <th>
                      <img
                        className='img-fluid img-thumbnail'
                        src={item.image}
                        alt={item.Name}
                        width='50px'
                      />
                    </th>
                    <th>{item.quantity}</th>
                    <th>R$ {item.price.toFixed(2)}</th>
                    <th>
                      <ButtonGroup>
                        <Button
                          onClick={() =>
                            dispatch(cartActions.AddItem(cart, item))
                          }
                          variant='primary'
                        >
                          <i className='fas fa-plus'></i>
                        </Button>
                        <Button
                          onClick={() =>
                            dispatch(cartActions.RemoveItem(cart, item))
                          }
                          variant='danger'
                        >
                          <i className='fas fa-minus'></i>
                        </Button>
                      </ButtonGroup>
                    </th>
                    <th>R$ {(item.price * item.quantity).toFixed(2)}</th>
                  </tr>
                );
              })}
              <tr>
                <th colSpan='2' scope='col'>
                  Total
                </th>
                <th colSpan='3'>{cart.value} itens</th>
                <th colSpan='2'>R$ {totalPrice.toFixed(2)}</th>
              </tr>
            </tbody>
          </table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Cart;
