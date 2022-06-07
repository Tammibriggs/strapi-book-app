import './search.css'

function Search({searchValue}) {

  return (
    <div className='searchPage wrapper'>
      <div className='searchPage__resultInfo'>
        <p>SEARCH RESULTS FOR</p>
        <h4>{searchValue}</h4>
      </div>
    </div>
  )
}

export default Search
