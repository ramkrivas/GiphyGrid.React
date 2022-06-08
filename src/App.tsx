import React from 'react';
import './App.css';
import GiphyFeedViewer from './components/index';
import HeaderLogo from './assets/header-logo'

function App() {
  return (
    <div>
    <header>
      <div className="container">
        <div className="logo">

        <HeaderLogo></HeaderLogo>
        </div>
      </div>
    </header>

    <div className="container">
    <div className="demo">
          <div className="demoSearchBox">
            <div className="searchBox">
              <GiphyFeedViewer
                apiKey="tVaJe9QRTL6VZp9xhBkogbNWFTI9hYnJ"
                onSelect={(item:any) => console.log(item)}
                masonryConfig={[
                  { columns: 2, imageWidth: 110, gutter: 5 },
                  { mq: '700px', columns: 3, imageWidth: 310, gutter: 5 },
                ]}
              />
            </div>
          </div>        
        </div>
      <footer>@Ramkumar  - Technical assignment</footer>
    </div>
    
  </div>
  );
}

export default App;
