import { eq, desc } from "drizzle-orm";

export default eventHandler(async (event) : Promise<MappedLoveMarker> => {
  const { user } = await requireUserSession(event);
  const body = await readBody(event);
  const DB = useDb();

  const last = await DB.select().from(tables.markers).where(eq(tables.markers.bond, user.bond.id)).orderBy(desc(tables.markers.order)).limit(1).get();
  return DB.insert(tables.markers).values({
    lat: body.lat,
    lng: body.lng,
    group: body.group,
    bond: user.bond.id,
    title: body.title,
    description: body.description,
    order: last ? last.order + 1 : 0,
  }).returning().get();
});
