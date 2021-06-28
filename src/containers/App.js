import React from 'react';
import CardList from '../components/CardList';
// import {robots} from './robots';
import SearchBox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundary from '../components/ErrorBoundary';
import './App.css'

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            robots :[],
            searchField:'',
        }
    }
    componentDidMount(){
        fetch('https://jsonplaceholder.typicode.com/users')
        .then(Response => Response.json())
        .then(users =>this.setState({robots:users}))
    }
    
    onSearchChange = (event) =>{
        this.setState({searchField: event.target.value})
        
        
    }
    
    render(){
        const searchedRobots = this.state.robots.filter(robot =>{
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        })
        return(
            <div className = 'tc' >
                <h1 className='f1'>Robo Friends</h1>
                <SearchBox searchChange = {this.onSearchChange}/>
                <div/>
                <Scroll>
                    <ErrorBoundary>
                        <CardList robots={searchedRobots} />
                    </ErrorBoundary>
                </Scroll>
            </div>
        );
    }
}

export default App;