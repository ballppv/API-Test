import "./Home.css"
import React, { useState, useEffect } from 'react'
// import { v4 as uuidv4 } from 'uuid'
import Results from './Results'
import axios from '../axios'

const Home = () => {
    const [query, setQuery] = useState('ballppv')
    const [users, setUsers] = useState([])

    const [page, setPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);

    const inputQuery = (e) => {
        setQuery(e.target.value)
    }

    const fetchData = async () =>{
        try {
            const { data } = await axios.get("/search/users?q=" + query ,{
                params: {
                    page,
                    per_page: pageLimit
                }
            });
            return data?.items;
        } catch (error){
            console.error(error);
            return null;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(query){
            const items = await fetchData();
            setUsers(items);
        }else{
            console.log("Query is empty.")
        }
    }

    const handlePrevPage = () =>{
        setPage((page) => {
            if(page === 1) return page;
            else return page -1;
        })
    }
    const handleNextPage = () =>{
        setPage((page) => page +1);
    }
    const handdlePageLimit = (e) =>{
        const value = e.target.value;
        setPageLimit(parseInt(value))
    }

    useEffect(() => {
        const displayUserOnChange = async () =>{
            if (query){            
                const items = await fetchData();
                setUsers(items);
            }
        }
        displayUserOnChange();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page, pageLimit])
    
    return (
        <>
        <div className="search-form">
            <h2 className='title'>Github Search User</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="text" 
                placeholder="put Github name here"
                onChange={inputQuery}
                value={query} 
                />
                <button type="submit" className="btnSearch">Search</button>
            </form>
        </div>

        <div className="options">
            <label>
                <small>Per Page</small>
                <select onChange={handdlePageLimit}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </label>
        </div>
        <div className="page-btn">
            <button onClick={handlePrevPage}>{page}</button>
            <button onClick={handleNextPage}>{page+1}</button>
        </div>

        <div>
            { users ? users.map(user => {
                return <Results user={user} key={user.id} />
            }) : (
            <h2>There is nothing to display...</h2>
            )}
        </div>
        </>
    )
}

export default Home;