const getIndexView = (req, res) => {
  res.render('index', {
    user: req.user,
  });
};

export { getIndexView };
