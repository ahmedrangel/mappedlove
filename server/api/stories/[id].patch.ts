import { eq, and } from "drizzle-orm";

export default eventHandler(async (event) : Promise<MappedLoveStory> => {
  const { user } = await requireUserSession(event);

  const body = await readMultipartFormData(event);
  const file = getFileFromUpload(body);

  if (!body || !user.bond) throw createError({ statusCode: ErrorCode.BAD_REQUEST, message: "bad_request" });

  const DB = useDb();
  const today = Date.now();

  const { id } = getRouterParams(event);
  const form : { [key: string]: string } = {};

  for (const { name, data } of body) {
    if (!name || name === "file") continue;
    form[name] = data.toString();
  }

  const story = await DB.update(tables.stories).set({
    description: form.description,
    year: Number(form.year),
    month: Number(form.month),
    updatedAt: today
  }).where(and(eq(tables.stories.id, Number(id)), eq(tables.stories.bond, user.bond.id))).returning().get();

  const { secure } = useRuntimeConfig(event);
  const storyHash = hash([story.id, user.bond.code].join(), secure.salt);
  const storyPatch = { ...story, hash: storyHash };

  if (!file) return storyPatch;

  const uploaded = await uploadImage(file, storyHash, "stories", event);

  if (!uploaded) {
    throw createError({ statusCode: ErrorCode.BAD_REQUEST, message: "check_file_size" });
  }

  await uploadToCloudinary(file, storyHash, "stories", event);

  return storyPatch;
});
