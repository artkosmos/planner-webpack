import notFoundImg from './error-404.png';

import './style.scss';

export const NotFound = () => {
  return (
    <figure className={'not-found'}>
      <img
        className={'not-found__image'}
        src={notFoundImg}
        alt={'Page not found'}
      />
      <figcaption className={'not-found__title'}>
        Page not found. Please, check your URL
      </figcaption>
    </figure>
  );
};
