import { prisma } from '../../prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { month, week } = req.query;
    const monthCheckReg = /^[0-9]{6}$/;
    if (!monthCheckReg.test(month as string)) {
      return res
        .status(400)
        .json({ error: '올바르지 않은 월 형식의 파라미터입니다.' });
    }
    if (week) {
      const result = await prisma.price.findUnique({
        where: { month_week: { month: month as string, week: Number(week) } },
      });
      if (result) {
        return res.status(200).json(result);
      }
      return res.status(404).json({ error: '해당 날짜의 데이터가 없습니다.' });
    }
    if (month) {
      const result = await prisma.price.findMany({
        where: { month: month as string },
      });
      return res.status(200).json(result);
    }
  }
  if (req.method === 'POST') {
    const monthCheckReg = /^[0-9]{6}$/;
    if (!monthCheckReg.test(req.body.month as string)) {
      return res
        .status(400)
        .json({ error: '올바르지 않은 일 형식의 쿼리요청입니다.' });
    }

    const result = await prisma.price.findUnique({
      where: {
        month_week: { month: req.body.month, week: req.body.week },
      },
    });

    let newData;
    if (!result) {
      newData = await prisma.price.create({ data: req.body });
    } else {
      newData = await prisma.price.update({
        where: { month_week: { month: req.body.month, week: req.body.week } },
        data: req.body,
      });
    }
    return res.status(201).json(newData);
  }
}
