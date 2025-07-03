const getIndexView = (req, res) => {
  res.render('index', {
    title: 'Home',
  });
};

export { getIndexView };
