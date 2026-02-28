import './Card.css'

const Card = ({ id, title, body }) => {
  return (
    <div className='card'>
      <h4>id is {id}</h4>
      <h5>title: {title}</h5>
      <p>desc: {body}</p>
    </div>
  )
}

export default Card