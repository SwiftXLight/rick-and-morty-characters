import { Link } from 'react-router-dom';
import './Card.scss';

interface ICard {
    id: number,
    name: string,
    species: string,
    image: string
  }

const Card = ({id, name, species, image}: ICard): JSX.Element => (
    <Link className='card-wrapper' to={`/character/:${id}`}>
        <img className='character-image' src={image} alt={name} />
        <div className='headline'>
            <h6 className='name'>{name}</h6>
            <p className='species'>{species}</p>
        </div>
    </Link>

);

export default Card;