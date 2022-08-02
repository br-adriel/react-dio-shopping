import { ListGroupItem, Badge } from 'react-bootstrap';

const Item = ({ name, details }) => {
  return (
    <ListGroupItem className='d-inline-flex flex-row justify-content-between align-items-center'>
      <p className='mb-0'>{name}</p>
      <Badge pill bg='secondary'>
        {details}
      </Badge>
    </ListGroupItem>
  );
};

export default Item;
