import  { useState,useEffect, useRef } from 'react'
import './TitleCards.css'
import cards_data from '../../assets/cards/Cards_data'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const TitleCards = ({title, category}) => {

  const [apiData, setApiData] = useState([])
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjRjMjJlZTBkMjU2MmVmNjQyMDFmMzJmMDNkMTc2NSIsIm5iZiI6MTczODMwODYxMS4zNzc5OTk4LCJzdWIiOiI2NzljN2MwMzEzNGY0ODgxNjEwMTE4OTEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.wC__7zJMnT4_98TgTNSTg_zbKAP9r0rwPglupsIkksA'
    }
  };
  
 

  const handleWheel = (e)=> {
  e.prevnetDefault();
  cardsRef.current.scrollLeft += e.deltaY;
  }
  
  useEffect(()=>{

    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
    .then(res => res.json())
    .then(res => setApiData(res.results))
    .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel',handleWheel)
  },[])
  
  return (
    <div  className='TitleCards'>
      <h2>{title?title:"Popular on Netflix"}</h2>
      <div className="card-list" ref={cardsRef}>
      {apiData?.length > 0 && apiData.map((card, index) => (
  <Link  to={`/player/${card.id}`} className="card" key={index}>
    <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt="" />
    <p>{card.original_title}</p>
    </Link>

))}
      </div>
    </div>
  )
}

TitleCards.propTypes = {
  title: PropTypes.string,
  category: PropTypes.string
};

export default TitleCards
