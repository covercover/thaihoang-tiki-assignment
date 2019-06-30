import moment from 'moment';

export const formatTimePost = posts => {
  return  posts.map((item) => {
    const newItem = {...item};
    newItem.publishedAt = moment(newItem.publishedAt).utc().format('DD/MM/YYYY HH:mm:ss');
    return newItem
  });
};
