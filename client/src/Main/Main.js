// React
import React from 'react'
import { useState, useEffect } from 'react';

// Bootstrap 
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Col, Card, ListGroup, ListGroupItem } from  'react-bootstrap';

// Spotify
import { accessToken, logout, searchForSongs, getSongRecommendations } from '../spotify'

// Global styles
import '../styles.css'

const Main = () => {
    // hook for state
    const [token, setToken] = useState(null);
    const [searchText, setSearchText] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [recommendations, setRecommendations] = useState([]);

    // called when mounting (?)
    useEffect(() => {
        setToken(accessToken);
    }, [])

    async function search() {
        setRecommendations([]);

        if (searchText == "") {
            return;
        }
        var result = await searchForSongs(searchText);
        console.log(result.tracks.items);
        setSearchResults(result.tracks.items);
    }

    async function onSearchItemClicked(track) {
        console.log(track.name + " clicked!");
        var result = await getSongRecommendations(track.id);
        console.log(result)
        setRecommendations(result.tracks)
    }

    return (
        <Container>
            {!token ? (
                <h1>Not authorized</h1>
            ) : 
            <div className='center'>
                <h1>Find Song Recommendations</h1>

                <Container className='mt-2 mb-2'>
                    <InputGroup className='mb-3' size='lg'>
                        <FormControl 
                            placeholder='Search for songs'
                            type='input'
                            onKeyPress={event => {
                                setSearchText(event.target.value);
                                if (event.key == 'Enter') {
                                    search();
                                }
                            }}
                        />
                        <Button onClick={search}>
                            Search
                        </Button>
                    </InputGroup>
                </Container>

                {searchResults.length > 0 && (
                    <Container className='mt-2 mb-2'>
                        <h1>Select a song</h1>
                        <ListGroup>
                            {searchResults.map((track, index) => {
                                // Concatenate all artist names together
                                var artists = ""
                                for (var i = 0; i < track.artists.length; i++) {
                                    if (i == track.artists.length-1) {
                                        artists += track.artists[i].name
                                    }
                                    else {
                                        artists += track.artists[i].name + ", "
                                    }
                                }

                                return (
                                    <ListGroup.Item key={track.id} action onClick={() => onSearchItemClicked(track)}>{track.name + " - " + artists}</ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    </Container>
                )}

                {recommendations.length > 0 && (
                    <Container className='mt-2 mb-2'>
                        <h1>Song Recommendations</h1>
                        <ListGroup>
                            {recommendations.map((track, index) => {
                                // Concatenate all artist names together
                                var artists = ""
                                for (var i = 0; i < track.artists.length; i++) {
                                    if (i == track.artists.length-1) {
                                        artists += track.artists[i].name
                                    }
                                    else {
                                        artists += track.artists[i].name + ", "
                                    }
                                }

                                return (
                                    <ListGroup.Item key={track.id}>{track.name + " - " + artists}</ListGroup.Item>
                                )
                            })}
                        </ListGroup>
                    </Container>
                )}

                <Container className='my-auto text-center'>
                    <button type='button' onClick={() => {
                        setSearchResults([]);
                        setRecommendations([]);
                    }}>Clear</button>
                    <button type='button' onClick={logout}>Log out</button>
                </Container>
                
            </div>
            }
        </Container>
    );
}

export default Main;