import { useEffect, useState } from 'react';
import Card from '../Card/Card';
import './Characters.scss';
import logo from '../../assets/Rick&Morty.png'

export default function Characters() {
    const [curPage, setCurPage] = useState(Number(localStorage.getItem('curPage')) || 1);
    const [apiEndpoint, setApiEndpoint] = useState(`https://rickandmortyapi.com/api/character?page=${curPage}`);
    const [inputValue, setInputValue] = useState('');

    const [list, setList] = useState<any[]>([]);
    useEffect(() => {
        fetchData();
        localStorage.setItem('curPage', curPage.toString());
    }, [apiEndpoint]);

    const fetchData = async () => {
        const res = await fetch(apiEndpoint);
        const data = await res.json();
        setList(data.results);
    };

    const prevPage = function() {
        let thisCurPage = curPage - 1;
        if (thisCurPage < 1) {
            thisCurPage = 1;
        }
        setCurPage(thisCurPage);
        setApiEndpoint(`https://rickandmortyapi.com/api/character?page=${thisCurPage}`);
    }
    const nextPage = function() {
        let thisCurPage = curPage + 1;
        if (thisCurPage > 42) {
            thisCurPage = 42;
        }
        setCurPage(thisCurPage);
        setApiEndpoint(`https://rickandmortyapi.com/api/character?page=${thisCurPage}`);
    }

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };
    // const filteredData = list.filter((item) =>
    //     item.toLowerCase().includes(inputValue.toLowerCase())
    // );
    // console.log(list.forEach((el) => console.log(el.name)));
    
    const listCards = list === undefined ? <div>Loading...</div> : list.length === 0 ? <div>Empty</div> :
    list?.map((item: any, idx: number) => {
        return <Card key={idx} id={item.id} name={item.name} species={item.species} image={item.image} />
    });
    return (
        <div className='wrapper'>
            <img className='logo' src={logo} alt="Rick & Morty" />
            <div className='filter'>
                <img src="" alt="gfsg" />
                <input type="text" value={inputValue} onChange={handleInputChange} />
            </div>
            <div className='characters-wrapper'>
                {listCards}
            </div>
            <div className='buttons-wrapper'>
                <button className='button' onClick={prevPage}>Prev</button>
                <p>page: {curPage}</p>
                <button className='button' onClick={nextPage}>Next</button>
            </div>
        </div>
    )
};
