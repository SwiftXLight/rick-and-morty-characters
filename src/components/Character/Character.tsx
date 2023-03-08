import { useEffect, useState } from 'react';
import './Character.scss';

interface Icharacter {
    name: string;
    gender: string;
    status: string;
    species: string;
    type: string;
}

export default function Character() {
    const [character, setCharacter] = useState<Icharacter>({
        name: '',
        gender: '',
        status: '',
        species: '',
        type: ''
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
        <a href="/">Back</a>
        <div>
            <h2>{character.name}</h2>
            <p>Gender<br/>{character.gender}</p>
            <p>Status<br/>{character.status}</p>
            <p>Specie<br/>{character.species}</p>
            <p>Origin<br/>{realOrigin}</p>
            <p>Type<br/>{character.type}</p>
        </div>
        </>
    )
};