import { eq, and } from "drizzle-orm";

export default eventHandler(async (event) : Promise<MappedLoveMarker | undefined> => {
  const { user } = await requireUserSession(event);
  if (!user.bond) throw createError({ statusCode: 400, statusMessage: "Bad Request" });
  const { id } = getRouterParams(event);
  const DB = useDb();
  return DB.delete(tables.markers).where(and(eq(tables.markers.id, Number(id)), eq(tables.markers.bond, user.bond.id))).returning().get();
});
