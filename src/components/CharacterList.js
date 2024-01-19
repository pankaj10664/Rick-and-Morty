import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function CharacterList() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [counts, setCounts] = useState({
        characters: 0,
        locations: 0,
        episodes: 0,
    });

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get('https://rickandmortyapi.com/api/character');
                setCharacters(response.data.results);
                setLoading(false);

                // Set the characters count
                setCounts((prevCounts) => ({
                    ...prevCounts,
                    characters: response.data.info.count
                }));
            } catch (error) {
                console.error('Error fetching characters: ', error);
                setLoading(false);
            }
        };

        const fetchLocationsAndEpisodesCount = async () => {
            try {
                // Fetch locations count
                const locationsResponse = await axios.get('https://rickandmortyapi.com/api/location');
                const locationsCount = locationsResponse.data.info.count;

                // Fetch episodes count
                const episodesResponse = await axios.get('https://rickandmortyapi.com/api/episode');
                const episodesCount = episodesResponse.data.info.count;

                setCounts((prevCounts) => ({
                    ...prevCounts,
                    locations: locationsCount,
                    episodes: episodesCount,
                }));
            } catch (error) {
                console.error('Error fetching counts: ', error);
            }
        };

        fetchCharacters();
        fetchLocationsAndEpisodesCount();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <div className="flex justify-center items-center flex-col h-[calc(50vh-60px)] text-center relative">
            <h1 className="text-6xl md:text-8xl px-[20px] font-bold ml-4">The Rick and Morty API</h1>
            </div>
            <div className="flex justify-center items-center py-[4.5rem] px-0 min-h-[calc(50vh-60px)]" style={{ backgroundColor: 'rgb(39, 43, 51)' }}>
                <div className='flex justify-center items-center flex-wrap max-w-1920px'>
                    {characters.map((character) => (

                        <Link key={character.id} to={`/character/${character.id}`} className="md:w-[600px] w-full h-[220px] flex flex-col md:flex-row md:overflow-hidden rounded-md m-2 ">
                            <img src={character.image} alt={character.name} className="w-full h-[45] object-cover" />
                            <div className="p-4" style={{ backgroundColor: 'rgba(60, 62, 68, 1)' }}>
                                <h2 className="text-xl font-bold text-white">{character.name}</h2>
                                <p className={`font-semibold flex items-center text-white ${character.status === 'Alive' ? 'text-green-600' ? character.status === 'Dead' : 'text-red-600' : ""}`}>{character.status === 'Alive' ? <span class="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></span> : character.status === 'Dead' ? <span class="w-2 h-2 bg-red-500 rounded-full inline-block mr-2"></span> : ""}
                                    {character.status} - {character.species}</p>
                                <p className="text-gray-600">Last known location:</p>
                                <p className="text-white">{character.location.name}</p>
                                <p className="text-gray-600">First seen in:</p>
                                <p className="text-white">{character.episode[0]}</p>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>
            <Footer counts={counts}/>
        </>
    );
}

export default CharacterList;
