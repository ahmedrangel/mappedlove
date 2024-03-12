import Mustache from "mustache";
import { eq } from "drizzle-orm";

export default eventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) => z.object({
    email: z.string()
  }).safeParse(body));

  if (!body.success) throw createError({ statusCode: ErrorCode.BAD_REQUEST, message: "email_required" });

  const form = body.data;
  const email = form.email.toLowerCase();

  const DB = useDb();

  const user = await DB.select({
    id: tables.users.id,
    name: tables.users.name
  }).from(tables.users).where(eq(tables.users.email, email)).get();

  if (!user) throw createError({ statusCode: ErrorCode.NOT_FOUND, message: "user_not_found" });

  const config = useRuntimeConfig(event);
  const userHash = hash([user.id].join(), config.secure.salt);
  const url = import.meta.dev ? SITE.dev : SITE.host;

  const html = Mustache.render(templates.accountData, {
    lang: "en",
    domain: SITE.domain,
    downloadLink: `${url}/account-data/${encodeURIComponent(btoa(email))}/${userHash}`
  });

  await sendMail(config, {
    to: { email, name: user.name },
    subject: "Account data request",
    html
  });

  return { success: true };
});
