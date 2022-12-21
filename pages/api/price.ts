import type { NextApiRequest, NextApiResponse } from 'next';

const price = [
  {
    month: '202212',
    week: 2,
    special: 1489,
    good: 1322,
    normal: 0,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { month, week } = req.query;
    const monthCheckReg = /^[0-9]{6}$/;
    if (!monthCheckReg.test(month as string)) {
      return res
        .status(400)
        .json({ error: '올바르지 않은 월 형식의 파라미터입니다.' });
    }
    if (week) {
      const result = price.find(
        (priceData) =>
          priceData.month === month && priceData.week === Number(week),
      );
      if (result) {
        return res.status(200).json(result);
      }
      return res.status(404).json({ error: '해당 날짜의 데이터가 없습니다.' });
    }
    if (month) {
      return res
        .status(200)
        .json(
          price
            .filter((priceData) => priceData.month.startsWith(month as string))
            .sort((a, b) => a.week - b.week),
        );
    }
  }
  if (req.method === 'POST') {
    const monthCheckReg = /^[0-9]{6}$/;
    if (!monthCheckReg.test(req.body.month as string)) {
      return res
        .status(400)
        .json({ error: '올바르지 않은 일 형식의 쿼리요청입니다.' });
    }
    const index = price.findIndex(
      ({ month, week }) => month === req.body.month && week === req.body.week,
    );
    if (index === -1) {
      price.push(req.body);
    } else {
      price.splice(index, 1, req.body);
    }
    return res.status(201).json(req.body);
  }
}
