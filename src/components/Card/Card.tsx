import './Card.scss';

interface ICard {
    id: number,
    name: string,
    species: string,
    image: string
  }

const Card = ({id, name, species, image}: ICard): JSX.Element => (
    <div className='card-wrapper'>
        <img className='character-image' src={image} alt={name} />
        <div className='headline'>
            <h6 className='name'>{name}</h6>
            <p className='species'>{species}</p>
        </div>
    </div>
);

export default Card;