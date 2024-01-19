import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CharacterDetails() {
    const { id } = useParams();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`https://rickandmortyapi.com/api/character/${id}`)
            .then(response => {
                setCharacter(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <div className="text-center">Loading...</div>;
    if (!character) return <div className="text-center">Character not found.</div>;

    return (
        <div className="bg-gray-100 min-h-screen pt-8">
            <div className="container mx-auto bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow max-w-2xl">
                <div className="relative">
                    <img src={character.image} alt={character.name} className="w-full h-72 object-cover sm:h-96" />
                    <div className="absolute bottom-0 bg-white bg-opacity-75 w-full py-4 px-6">
                        <h1 className="text-3xl font-bold text-gray-800">{character.name}</h1>
                        <p className="text-gray-600">{character.species} - {character.status}</p>
                    </div>
                </div>
                <div className="p-6">
                    <div className="mb-4">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Information</h2>
                        <div className="text-gray-700">
                            <p><strong>Gender:</strong> {character.gender}</p>
                            <p><strong>Location:</strong> {character.location.name}</p>
                            <p><strong>Origin:</strong> {character.origin.name}</p>
                        </div>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">Episodes</h2>
                        {/* Mapping through episodes would require additional API calls */}
                        <ul className="text-gray-700">
                            {/* Assume `character.episode` is an array of episode URLs */}
                            {character.episode.map((episode, index) => (
                                <li key={index}>{episode}</li> // Placeholder for episode names
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CharacterDetails;
