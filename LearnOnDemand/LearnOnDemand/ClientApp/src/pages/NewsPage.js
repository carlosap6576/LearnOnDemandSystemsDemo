import React from 'react';
import News from '../components/News';
import Navbar from '../components/Navbar';
const NewsPage = () => {
    return (
     
        <div>
            
        <Navbar />
            <h1>News</h1>
            <div>
                <News />
            </div>

          
        </div>
    
    )
}

export default NewsPage;