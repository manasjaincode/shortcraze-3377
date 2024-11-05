import dbConnect from '../../../../lib/dbConnect';
import Link from '../../../../models/Link';
import { startOfDay, startOfYesterday, startOfWeek, startOfMonth, startOfYear, subMonths } from 'date-fns';

export default async function handler(req, res) {
  await dbConnect();

  try {
    const now = new Date();

    const linksCount = {
      day: await Link.countDocuments({ date: { $gte: startOfDay(now) } }),
      yesterday: await Link.countDocuments({ date: { $gte: startOfYesterday(now), $lt: startOfDay(now) } }),
      week: await Link.countDocuments({ date: { $gte: startOfWeek(now) } }),
      month: await Link.countDocuments({ date: { $gte: startOfMonth(now) } }),
      '6 months': await Link.countDocuments({ date: { $gte: subMonths(now, 6) } }),
      year: await Link.countDocuments({ date: { $gte: startOfYear(now) } }),
    };

    res.status(200).json(linksCount);
  } catch (error) {
    console.error('Error fetching link stats:', error);
    res.status(500).json({ error: 'Server error' });
  }
}
