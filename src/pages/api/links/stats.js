import dbConnect from '../../../../lib/dbConnect';
import Link from '../../../../models/Link';
import { startOfDay, startOfYesterday, startOfWeek, startOfMonth, startOfYear, subMonths } from 'date-fns';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const now = new Date();
    const startOfISOWeek = (date) => {
      const day = date.getDay();
      const isoOffset = day === 0 ? -6 : 1;
      return new Date(date.setDate(date.getDate() + isoOffset - day));
    };

    const ranges = {
      day: startOfDay(now),
      yesterday: startOfYesterday(now),
      week: startOfISOWeek(now),
      month: startOfMonth(now),
      '6 months': subMonths(now, 6),
      year: startOfYear(now),
    };

    const aggregationPipeline = [
      {
        $facet: {
          day: [{ $match: { date: { $gte: ranges.day } } }, { $count: 'count' }],
          yesterday: [
            { $match: { date: { $gte: ranges.yesterday, $lt: ranges.day } } },
            { $count: 'count' },
          ],
          week: [{ $match: { date: { $gte: ranges.week } } }, { $count: 'count' }],
          month: [{ $match: { date: { $gte: ranges.month } } }, { $count: 'count' }],
          '6 months': [{ $match: { date: { $gte: ranges['6 months'] } } }, { $count: 'count' }],
          year: [{ $match: { date: { $gte: ranges.year } } }, { $count: 'count' }],
        },
      },
    ];

    const [result] = await Link.aggregate(aggregationPipeline);

    const linksCount = {
      day: result.day[0]?.count || 0,
      yesterday: result.yesterday[0]?.count || 0,
      week: result.week[0]?.count || 0,
      month: result.month[0]?.count || 0,
      '6 months': result['6 months'][0]?.count || 0,
      year: result.year[0]?.count || 0,
    };

    res.status(200).json(linksCount);
  } catch (error) {
    console.error('Error fetching link stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
