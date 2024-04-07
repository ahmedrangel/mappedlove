export { ErrorCode } from "~/types/enums/errors";
export { Quota } from "~/types/enums/quotas";

const deb = {} as Record<string, NodeJS.Timeout | undefined>;

export const debounce = (id: string, fn: () => void, delay: number) => {
  if (deb[id]) {
    clearTimeout(deb[id]);
    deb[id] = undefined;
  }
  deb[id] = setTimeout(() => fn(), delay);
};

export const getGroups = () => {
  return groups.map((group: typeof groups[number]) => t(group.key));
};

export const getGroup = (i: number) => {
  return t(groups[i].key);
};

export const formatDate = (time: number) => {
  const date = new Date(time);
  return date.toLocaleString(t("lang_code"), { month: "long", day: "numeric", year: "numeric" });
};

export const animate = ref(true);

export const animateElements = () => {
  animate.value = false;
  setTimeout(() => {
    animate.value = true;
  });
};

export const yearsFromStories = (stories: MappedLoveStory[]) => {
  const years = stories.map((story) => story.year);
  return [...new Set(years)];
};

export const storiesByYear = (stories: MappedLoveStory[], year: number) => {
  return stories.filter((story) => story.year === year);
};

export const getStoryImageTransform = (hash?: string) => {
  if (import.meta.dev) return `/uploads/stories/${hash}`;
  return `https://res.cloudinary.com/dyxajqsia/image/upload/stories/${hash}`;
};

export const getStoryImage = (hash?: string) => {
  return `${import.meta.dev ? SITE.dev : SITE.cdn}/uploads/stories/${hash}`;
};

export const getDefaultAvatar = (id: number) => {
  const avatarNumber = ((id % 10) % 5) + 1;
  return `${import.meta.dev ? SITE.dev : SITE.host}/images/defaults/avatar-${avatarNumber}.jpg`;
};

export const getAvatarImage = (hash?: string) => {
  return `${import.meta.dev ? SITE.dev : SITE.cdn}/uploads/avatars/${hash}`;
};

export const copyToClipboard = async (text: string) => {
  if (typeof navigator === "undefined" || !navigator.clipboard || !navigator.clipboard.writeText) {
    return { success: false, message: t("copy_not_supported") };
  }
  await navigator.clipboard.writeText(text);
  return { success: true, message: t("copy_success") };
};

export const storiesCarousel = (marker: MappedLoveMarker, stories: MappedLoveStory[]) => {
  return !stories.length ? `<div class="mt-2 text-center fw-bold">${marker.title}</div>` :
    `<div id="story-carousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner mw-100 mx-auto">`
        + stories.map(({ hash, updatedAt }, index) => {
          return `
          <div class="carousel-item ${!index ? "active" : "inactive"} d-flex justify-content-center">
            <div class="border border-primary border-2 rounded-circle">
              <div class="map-story" style="background-image: url('${getStoryImageTransform(hash)}?updated=${updatedAt}')"></div>
            </div>
          </div>`;
        }).join("")
        + `
        <div class="close position-absolute end-0 top-0 rounded-pill bg-primary px-2 py-1 small fw-bold z-1">${stories.length}</div>
      </div>
    </div>
  <div class="mt-2 text-center fw-bold">${marker.title}</div>`.replace(/\n/g, "");
};

export const isMobileScreen = () => {
  return window.innerWidth < 768;
};

export const normalize = (text: string) : string => {
  return text.normalize("NFD").replace(/[\u0300-\u036F]/g, "");
};
export const isDarkMode = () => {
  const { $colorMode } = useNuxtApp();
  return $colorMode.preference === "dark";
};

export const sleep = (ms?: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const getRandomNumber = ({ min, max }: { min: number, max: number }) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
