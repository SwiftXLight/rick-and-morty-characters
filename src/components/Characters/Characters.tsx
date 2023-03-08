import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Characters.scss';

export default function Characters() {
    const [list, setList] = useState();
    useEffect(() => {
        fetch("https://rickandmortyapi.com/api/character?page=1")
            .then((res) => res.json())
            .then(data => {
                setList(data.results);
            })
    }, [])
    console.log(list);

    const listCards = list===undefined ?  <div>Loading...</div> : list.length === 0 ? <div>Empty</div> :
    list?.map((item: any, idx: number) => {
            return <Card key={idx} id={idx + 1} name={item.name} species={item.species} image={item.image} />
        }
        );
    return (
        <div className='characters-wrapper'>
            {/* <a href="/character/:1">1</a> */}
            {listCards}
        </div>
    )
};
