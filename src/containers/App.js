import { useState,useEffect } from 'react';
import CardList from '../components/CardList';
// import {robots} from './robots';
import SearchBox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css'

function App () {
    // constructor() {
    //     super();
    //     this.state = {
    //         robots :[],
    //         searchField:'',
    //     }
    // }
    
    const [robots, setRobots] = useState([])
    const [searchField,setSearchField]=useState('')

    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(Response => Response.json())
            .then(users => setRobots(users))
    },[])
    
    const onSearchChange = (event) =>{
        setSearchField(event.target.value)
    }
    
    
    const searchedRobots = robots.filter(robot =>{
        return robot.name.toLowerCase().includes(searchField.toLowerCase())
        })
    return( !robots.length ?<h1>Loading</h1>:
        <div className = 'tc' >
            <h1 className='f1'>Robo Friends</h1>
            <SearchBox searchChange = {onSearchChange}/>
            <div/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={searchedRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }

export default App;