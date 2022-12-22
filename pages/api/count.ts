import { prisma } from '../../prisma/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    const { month, date } = req.query;
    if (month) {
      const monthCheckReg = /^[0-9]{6}$/;
      if (!monthCheckReg.test(month as string)) {
        return res
          .status(400)
          .json({ error: '올바르지 않은 월 형식의 파라미터입니다.' });
      }
      const result = await prisma.count.findMany({
        where: { date: { startsWith: month as string } },
      });
      return res.status(200).json(result);
    }
    if (date) {
      const dateCheckReg = /^[0-9]{8}$/;
      if (!dateCheckReg.test(date as string)) {
        return res
          .status(400)
          .json({ error: '올바르지 않은 일 형식의 파라미터입니다.' });
      }
      const result = await prisma.count.findUnique({
        where: { date: date as string },
      });
      if (result) {
        return res.status(200).json(result);
      }
      return res.status(404).json({ error: '해당 날짜의 데이터가 없습니다.' });
    }
  }

  if (req.method === 'POST') {
    const dateCheckReg = /^[0-9]{8}$/;
    if (!dateCheckReg.test(req.body.date as string)) {
      return res
        .status(400)
        .json({ error: '올바르지 않은 일 형식의 쿼리요청입니다.' });
    }
    const result = await prisma.count.findUnique({
      where: {
        date: req.body.date,
      },
    });
    let newData;
    if (!result) {
      newData = await prisma.count.create({ data: req.body });
    } else {
      newData = await prisma.count.update({
        where: {
          date: req.body.date,
        },
        data: req.body,
      });
    }
    return res.status(201).json(newData);
  }
}
