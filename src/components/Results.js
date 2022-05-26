import React, { useState, useEffect } from 'react'
import './Results.css'
import site from '../assets/site.jpg'
import person from '../assets/person.png'
import axios from '../axios'
// import { useParams } from 'react-router-dom'

const Results = ({user}) => {
    const { avatar_url, html_url, login } = user;

    const [userInfo, setUserInfo] = useState({});
    const [repos, setRepos] = useState([]);

    useEffect(() => {
        const fetchUserInfo = async () =>{
        try{
            const response = await Promise.all([
                axios.get(`/users/${login}`),
                axios.get(`/users/${login}/repos`)
            ]);
            setUserInfo(response[0].data)
            setRepos(response[1].data)
        } catch (error){
            console.error(error);
        }
    }
        fetchUserInfo();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="result">
            <div className="user">
                <div className="image">
                    <img src={avatar_url} alt={login} />
                </div>
                <div className="user-info">
                    <p className="link"><img src={site} alt="" /><a href={html_url} target="_blank" rel="noopener noreferrer">View Profile</a></p>
                    <h4><img src={person} alt="" />{login}</h4>
                    <div>Name: {userInfo?.name}</div>
                    <div>Bio: {userInfo?.bio}</div>
                    <div>Followers: {userInfo?.followers}, Following: {userInfo?.following}</div>
                    <div>Repositories: {repos?.name}</div>
                </div>
            </div>
        </div>
    )
}

export default Results