import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import { MdFavorite, MdShare } from 'react-icons/md';
import Button from '../Button/Button';
import * as S from './style';

function DoneAndFavCard({
  name,
  image, category, doneDate, tags, index, type, nationality, alcoholic, id, done, isFav,
}) {
  const [isCopy, setIsCopy] = useState(false);

  const handleShare = () => {
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopy(!isCopy);
  };

  const handleFavorite = () => {
    isFav(id);
  };

  return (
    <S.DoneContainer>
      <Link to={`/${type}s/${id}`}>
        <img
          src={image}
          alt="imagem da receita"
          data-testid={`${index}-horizontal-image`}
          width={250}
          height={200}
        />
        <h1 data-testid={`${index}-horizontal-name`}>{name}</h1>
      </Link>
      <p
        data-testid={`${index}-horizontal-top-text`}
      >
        {type === 'meal' ? `${nationality} - ${category}`
          : `${alcoholic}`}
      </p>
      {doneDate ? (
        <p data-testid={`${index}-horizontal-done-date`}>{doneDate}</p>
      ) : null}
      <p
        data-testid={`${index}-${tags}-horizontal-tag`}
        key={tags}
      >
        {tags}
      </p>
      {isCopy && (
        <div>
          <span>Link copied!</span>
        </div>
      )}
      {
        done ? (
          <Button
            handleClick={handleShare}
            alt="share button"
            id={`${index}-horizontal-share-btn`}
            color="secondary"
            size="35px"
          >
            <MdShare />
          </Button>
        ) : (
          <>
            <Button
              handleClick={handleFavorite}
              alt="share button"
              id={`${index}-horizontal-favorite-btn`}
              color="secondary"
              size="35px"
            >
              <MdFavorite />
            </Button>
            <Button
              handleClick={handleShare}
              alt="share button"
              id={`${index}-horizontal-share-btn`}
              color="secondary"
              size="35px"
            >
              <MdShare />
            </Button>
          </>
        )
      }
    </S.DoneContainer>
  );
}

DoneAndFavCard.propTypes = {
  name: PropTypes.string,
  image: PropTypes.string,
  category: PropTypes.string,
  doneDate: PropTypes.string,
  index: PropTypes.number,
  tags: PropTypes.string,
  type: PropTypes.string.isRequired,
  nationality: PropTypes.string,
  alcoholic: PropTypes.string,
  id: PropTypes.string.isRequired,
  done: PropTypes.bool,
  isFav: PropTypes.func,
};

DoneAndFavCard.defaultProps = {
  name: '',
  image: '',
  category: '',
  doneDate: '',
  index: 0,
  tags: [],
  nationality: '',
  alcoholic: '',
  done: false,
  isFav: () => { },
};

export default DoneAndFavCard;
