import { getAllMessages } from "../db/queries.js";

const getIndexView = async (req, res) => {
  const messages = await getAllMessages()

  res.render('index', {
    user: req.user,
    messages
  });
};

export { getIndexView };
