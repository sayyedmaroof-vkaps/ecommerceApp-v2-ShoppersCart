import { Star, StarHalf } from '@material-ui/icons'

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating inline">
      <span>
        {value >= 1 ? (
          <Star style={{ color }} />
        ) : value >= 0.5 ? (
          <StarHalf style={{ color }} />
        ) : (
          <Star style={{ color }} />
        )}
      </span>
      <span>
        {value >= 2 ? (
          <Star style={{ color }} />
        ) : value >= 1.5 ? (
          <StarHalf style={{ color }} />
        ) : (
          <Star style={{ color }} />
        )}
      </span>
      <span>
        {value >= 3 ? (
          <Star style={{ color }} />
        ) : value >= 2.5 ? (
          <StarHalf style={{ color }} />
        ) : (
          <Star style={{ color }} />
        )}
      </span>
      <span>
        {value >= 4 ? (
          <Star style={{ color }} />
        ) : value >= 3.5 ? (
          <StarHalf style={{ color }} />
        ) : (
          <Star style={{ color }} />
        )}
      </span>
      <span>
        {value >= 5 ? (
          <Star style={{ color }} />
        ) : value >= 4.5 ? (
          <StarHalf style={{ color }} />
        ) : (
          <Star style={{ color }} />
        )}
      </span>
      <span>{text && text > 0 ? `(${text})` : ''}</span>
    </div>
  )
}

Rating.defaultProps = {
  color: '#f8e825',
}

export default Rating
