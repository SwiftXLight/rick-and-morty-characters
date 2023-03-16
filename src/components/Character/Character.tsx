import { useEffect, useState } from 'react';
import './Character.scss';
import arrow from '../../assets/arrow_back_24px.svg'

interface Icharacter {
    name: string;
    gender: string;
    status: string;
    species: string;
    type: string;
    image: string;
}

export default function Character() {
    const [character, setCharacter] = useState<Icharacter>({
        name: '',
        gender: '',
        status: '',
        species: '',
        type: '',
        image: ''
    });
    const [realOrigin, setRealOrigin] = useState();
    useEffect(() => {
        const characterId = window.location.href.split('/:')[1];
        fetch(`https://rickandmortyapi.com/api/character/${characterId}`)
            .then((res) => res.json())
            .then(data => {
                setCharacter(data);
                fetch(data.origin.url)
                    .then((res) => res.json())
                    .then(data => {
                        setRealOrigin(data.name)
                    })
            })
    }, [])
    
    return (
        <>
        <a className='back-wrapper' href="/">
            <img src={arrow} alt="arrow" />
            <h3>Go back</h3>
        </a>
        <div className='wrapper'>
            <img className='photo' src={character.image} alt={character.name} />
            <h2>{character.name}</h2>
            <h6>Informations:</h6>
            <p><span className='p-title'>Gender</span><br/><span className='p-label'>{character.gender || 'unknown'}</span></p>
            <p><span className='p-title'>Status</span><br/><span className='p-label'>{character.status || 'unknown'}</span></p>
            <p><span className='p-title'>Specie</span><br/><span className='p-label'>{character.species || 'unknown'}</span></p>
            <p><span className='p-title'>Origin</span><br/><span className='p-label'>{realOrigin || 'unknown'}</span></p>
            <p><span className='p-title'>Type</span><br/><span className='p-label'>{character.type || 'unknown'}</span></p>
        </div>
        </>
    )
};