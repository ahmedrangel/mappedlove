import type { UserSessionComposable } from "#auth-utils";

export {};

declare global {
  interface MappedLoveSession {
    user?: MappedLoveUser;
  }
  interface MappedLoveUser {
    id: number;
    hash?: string;
    name: string;
    email: string;
    country: string | null;
    birthDate: number | null;
    showAvatar: number;
    confirmed: number;
    createdAt: number;
    updatedAt: number;
    auth?: number;
    bond?: MappedLoveBond;
  }
  interface MappedLovePartner {
    id: number;
    hash: string;
    name: string;
    showAvatar: number;
    country: string | null;
    updatedAt: number;
  }
  interface MappedLoveMarker {
    bond?: number;
    id: number;
    lat: number;
    lng: number;
    group: number;
    title: string;
    description: string;
    order: number;
  }
  interface MappedLoveBond {
    id: number;
    code: string;
    partner1: MappedLovePartner | number | null;
    partner2: MappedLovePartner | number | null;
    coupleDate: number | null;
    bonded: number;
    public: number;
    premium: number;
    subscriptionId?: string | null;
    nextPayment: number | null;
    createdAt: number;
    updatedAt: number;
  }
  interface MappedLoveStory {
    id: number;
    hash?: string;
    marker: number;
    user: number;
    description: string | null;
    year: number;
    month: number;
    updatedAt: number;
    createdAt: number;
  }
  interface MappedLoveMap {
    markers: MappedLoveMarker[];
    stories: MappedLoveStory[];
  }
  interface MappedLoveToast {
    message: string;
    success: boolean;
    id?: number;
  }
  interface MappedLovePublicMap extends MappedLoveBond {
    partner1: MappedLovePartner;
    partner2: MappedLovePartner;
    markers: MappedLoveMarker[];
    stories: MappedLoveStory[];
  }
  interface MappedLoveSelectedMarker extends MappedLoveMarker {
    stories: MappedLoveStory[];
  }
  interface MappedLoveAccountData {
    user: MappedLoveUser & {
      bond?: MappedLoveBond & {
        markers?: MappedLoveMarker[];
        stories?: MappedLoveStory[];
      };
    };
  }
  interface MappedLoveSeoOptions {
    title?: string;
    description?: string;
    path?: string;
    name?: string;
    image?: string;
    imageWidth?: number;
    imageHeight?: number;
    imageAlt?: string;
    robots?: boolean;
  }
  interface MappedLoveSessionComposable extends UserSessionComposable {
    user: ComputedRef<MappedLoveUser>;
  }
}
