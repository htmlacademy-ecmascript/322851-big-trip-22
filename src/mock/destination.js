import { getRandomInteger } from '../utils.js';
import { IMAGES_URL } from '../const.js';


const generatePictures = (name) => {
  let num = 0;
  return Array.from({length: getRandomInteger(1,5)}, () => ({'src': `${IMAGES_URL}${name}`, 'description': `${name}-${num++}`}));
};

const mockDestinations = [
  {
    'id': 1,
    'name': 'Paris',
    'description':'Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    'pictures': generatePictures('Paris')
  },
  {
    'id': 2,
    'name': 'London',
    'description':'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    pictures: generatePictures('London')
  },
  {
    'id': 3,
    'name': 'Madrid',
    'description':' Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'pictures': generatePictures('Madrid')
  },
  {
    'id': 4,
    'name': 'Berlin',
    'description':'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    'pictures': generatePictures('Berlin')
  },
  {
    'id': 5,
    'name': 'Rome',
    'description':'In rutrum ac purus sit amet tempus.',
    'pictures': generatePictures('Rome')
  },
  {
    'id': 6,
    'name': 'Some Good Hotel',
    'description': '',
    'pictures': []
  },
  {
    'id': 7,
    'name': 'Some Excellent Restaurant',
    'description':'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
    'pictures': []
  }

];

export { mockDestinations };
