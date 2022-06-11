import prisma from "../../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = JSON.parse(req.body);
    try {
      await prisma.users.upsert({
        where: {
          email: email,
        },
        update: {},
        create: {
          email: email,
        },
      });

      res.status(200).json({ email });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
