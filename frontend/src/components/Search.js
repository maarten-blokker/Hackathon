import React, { PureComponent } from 'react'
import './Search.css'
import SearchIcon from '../images/search.png'
import MicIcon from '../images/icon.png'

class Search extends PureComponent {
  render() {
      return (
        <div role="searchbox" className="searchBox" >
          <form className="searchForm" type="search">
            <input className="inputField" type="search" placeholder="Zoeken"
              aria-label="zoeken" ref="input"/>
              <button className="button search" type="submit" aria-label="submit">
                <img src={ SearchIcon } alt="search icon" className="searchIcon" />
              </button>
              <button className="button mic" type="reset" aria-label="clear search">
                <img src={ MicIcon } alt="mic icon" className="micIcon" />
              </button>
          </form>
        </div>
      )
  }
}

export default Search
