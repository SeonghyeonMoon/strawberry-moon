import type { NextApiRequest, NextApiResponse } from 'next';

const count = [
  { date: '20221205', special: 1220, good: 20, normal: 0 },
  {
    date: '20221207',
    special: 810,
    good: 15,
    normal: 0,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { month } = req.query;
    const monthCheckReg = /^[0-9]{6}$/;
    if (!monthCheckReg.test(month as string)) {
      res
        .status(400)
        .json({ error: '올바르지 않은 월 형식의 파라미터입니다.' });
      return;
    }
    res
      .status(200)
      .json(
        count
          .filter(({ date }) => date.startsWith(month as string))
          .sort((a, b) => (Number(a.date) - Number(b.date) > 0 ? 1 : -1)),
      );
  }

  if (req.method === 'POST') {
    const dateCheckReg = /^[0-9]{8}$/;
    if (!dateCheckReg.test(req.body.month as string)) {
      res
        .status(400)
        .json({ error: '올바르지 않은 일 형식의 쿼리요청입니다.' });
      return;
    }
    const index = count.findIndex(({ date }) => date === req.body.date);
    if (index === -1) {
      count.push(req.body);
    } else {
      count.splice(index, 1, req.body);
    }
    res.status(201).json(req.body);
  }
}
