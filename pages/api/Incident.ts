import { NextApiRequest, NextApiResponse } from 'next';

type Incident = {
  title: string;
  details: string;
  date: string;
};

const incidents: Incident[] = [
  {
    title: "Incident 1",
    details: "Details of incident 1",
    date: "2023-07-31"
  },
  {
    title: "Incident 2",
    details: "Details of incident 2",
    date: "2023-07-31"
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json(incidents);
}