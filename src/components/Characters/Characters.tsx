import { useEffect, useRef, useState } from 'react';
import Card from '../Card/Card';
import './Characters.scss';
import logo from '../../assets/Rick&Morty.png';
import searchIcon from '../../assets/search-icon.svg';

export default function Characters() {
    const inputRef = useRef<HTMLInputElement>(null);;
    const [maxCards, setMaxCards] = useState(Number(localStorage.getItem('maxCards')) || 20);
    const [inputValue, setInputValue] = useState('');
    const [list, setList] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const endpointUrls: any = [];
    const createUrls = () => {
        for (let i = 1; i <= 42; i++) {
            endpointUrls.push(`https://rickandmortyapi.com/api/character?page=${i}`);
        }
    };

    useEffect(() => {
        const fetchCards = async () => {
            try {
                createUrls();
                const promises = endpointUrls.map((url: string) => fetch(url));
                const responses = await Promise.all(promises);
                const data: any = await Promise.all(responses.map((response) => response.json()));
                let results = data.map((el: any) => el.results).flat();
                results.sort((a: any, b: any) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }
                    return 0;
                });
                setList(results);
            } catch (e) {
                console.log(e);
            } finally {
                setIsLoading(false);
            }
        }
        if (list.length === 0) {
            fetchCards();
        }
    }, [list.length]);

    const loadLess = function() {
        let thisMaxCards = maxCards - 20;
        if (thisMaxCards <= 0) {
            thisMaxCards = 20;
        }
        setMaxCards(thisMaxCards);
        localStorage.setItem('maxCards', thisMaxCards.toString());
    }
    const loadMore = function() {
        let thisMaxCards = maxCards + 20;
        if (thisMaxCards > 826) {
            thisMaxCards = 826;
        }
        setMaxCards(thisMaxCards);
        localStorage.setItem('maxCards', thisMaxCards.toString());
    }

    const handleInputChange = (e: any) => {
        setInputValue(e.target.value);
    };
    const filteredCharacters = list.filter((character: any) =>
        character.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    const handleContainerClick = () => {
        inputRef.current!.focus();
    };
    const handleImageClick = () => {
        inputRef.current!.click();
    };
    
    const listCards = isLoading ? <div>Loading...</div> : filteredCharacters.length === 0 || filteredCharacters === undefined ? <div>Empty</div> :
    filteredCharacters?.slice(0, maxCards).map((item: any, idx: number) => {
        return <Card key={idx} id={item.id} name={item.name} species={item.species} image={item.image} />
    });
    return (
        <div className='wrapper'>
            <img className='logo' src={logo} alt="Rick & Morty" />
            <div className='filter' onClick={handleContainerClick}>
                <img className='search-icon' src={searchIcon} alt="icon" onClick={handleImageClick} />
                <input className='filter-input' type="text" value={inputValue} onChange={handleInputChange} ref={inputRef} placeholder="Filter by name..." />
            </div>
            <div className='characters-wrapper'>
                {listCards}
            </div>
            <div className='buttons-wrapper'>
                <button className='button' onClick={loadLess}>Load less</button>
                <p>Cards: {maxCards}</p>
                <button className='button' onClick={loadMore}>Load more</button>
            </div>
        </div>
    )
};
