import prisma from "../../utils/prisma";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { email } = req.query;
    try {
      const { animes } = await prisma.users.findUnique({
        where: {
          email: email,
        },
        include: {
          animes: {
            include: {
              episodes: true,
            },
          },
        },
      });
      res.status(200).json({ animes });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === "POST") {
    const { anime, email } = JSON.parse(req.body);

    try {
      const { id } = await prisma.users.findUnique({ where: { email } });
      const addedAnime = await prisma.animes.create({
        data: {
          title: anime.title,
          image_url: anime.image_url,
          user_id: id,
          episodes: {
            createMany: {
              data: [...anime.episodes],
            },
          },
        },
      });

      res.status(200).send(addedAnime);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === "PATCH") {
    const { episode } = JSON.parse(req.body);
    console.log(episode);
    try {
      await prisma.episodes.update({
        where: {
          id: episode.id,
        },
        data: {
          watched: episode.watched,
        },
      });
      res.status(200).send(episode);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  } else if (req.method === "DELETE") {
    const { id } = JSON.parse(req.body);
    try {
      await prisma.animes.delete({
        where: {
          id: id,
        },
      });
      res.status(200).send({ id });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
