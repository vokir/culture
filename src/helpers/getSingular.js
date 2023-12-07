const getSingular = (s) => {
  switch (s) {
    case 'Новости':
      return 'Новость';
    case 'Оповещения':
      return 'Оповещение';
    case 'Акции':
      return 'Акция';
    default:
      return s;
  }
};

export default getSingular;
