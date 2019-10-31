import express from 'express';
const router = express.Router();

import GmailService from '../../../service/gmailService';
import Query from '../../../model/query';

const wrapper = (asyncFn) => {
  return (async (req, res, next) => {
    try {
      return await asyncFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  });
};

router.get('/messages/id/:useremail', async (req, res) => {
  const useremail = req.params.useremail;

  try {
    const result = await GmailService.userMessagesId(useremail);

    res.json(result).end();
  } catch (err) {
    throw err;
  };

});

router.get('/messages', async (req, res) => {
  const useremail = req.query.useremail;
  const from = (req.query.from === undefined) ? '' : req.query.from;
  const hasTheWords = (req.query.hasTheWords === undefined) ? '' : req.query.hasTheWords;

  const SearchQuery = new Query(from, hasTheWords);
  const q = SearchQuery.queryMaker();

  try {
    const result = await GmailService.userMessages(useremail, q);

    res.send({
      result
    });

  } catch (err) {
    throw err;
  };

});

router.get('/messages/parsing', wrapper(async (req, res) => {
  const useremail = req.query.useremail;
  const from = (req.query.from === undefined) ? '' : req.query.from;
  const hasTheWords = (req.query.hasTheWords === undefined) ? '' : req.query.hasTheWords;

  const SearchQuery = new Query(from, hasTheWords);
  const q = SearchQuery.queryMaker();

  const result = await GmailService.messagesParse(useremail, q);
  const count = result.length;

  const config = {
    useremail,
    'search-query': {
      status: 'changeable',
      query: q,
      from,
      hasTheWords,
    },
    'data': {
      count,
      result,
    }
  };

  res.send(config);
}));

export default router;