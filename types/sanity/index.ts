export interface SanityReference {
  _ref: string;
}
interface SanityImageWithAssetStub {
  asset: {
    url: string;
  };
}
interface SanityAsset {
  _id?: string;
  url?: string;
  path?: string;
  assetId?: string;
  extension?: string;
  [key: string]: any;
}
interface SanityImageCrop {
  _type?: string;
  left: number;
  bottom: number;
  right: number;
  top: number;
}
interface SanityImageHotspot {
  _type?: string;
  width: number;
  height: number;
  x: number;
  y: number;
}
interface SanityImageObject {
  asset: SanityReference | SanityAsset;
  crop?: SanityImageCrop;
  hotspot?: SanityImageHotspot;
}
type Image = SanityImageObject & {
  key?: string;
  altText?: string;
  caption?: string;
  credits?: string;
};

type PlaceReference = {
  place: Place;
};

type Area = {
  id?: string;
  name: string;
  country: Country;
};

type AreaReference = {
  area: Area;
};

type Country = {
  name: string;
  slug: string;
  altSlugs?: string;
  // ISO 3166-1 Alpha-2 code
  countryCode: string;
};

type Place = {
  id: string;
  name: string;
  area: Area;
};

type CategoryTagReference = {
  categoryTag: CategoryTag;
};

type CategoryTag = {
  id: string;
  title: string;
  slug: string;
};

type SuitableReference = {
  suitable: Suitable;
};

type Suitable = {
  name: string;
};

type PriceLevelReference = {
  priceLevel: PriceLevel;
};
type PriceLevel = {
  name: string;
};

type AccommodationCategory =
  | "APARTMENT"
  | "HOTEL"
  | "VACATION_CENTER"
  | "CABIN";

type Relations = {
  categoryTags: CategoryTagReference[];
  suitableFor: SuitableReference[];
  priceLevels: PriceLevelReference[];
  accommodationCategories?: AccommodationCategory[];
};

type Season = {
  name: string;
  slug: string;
  altSlugs?: string;
};

export type TCampaignPackagePeriod = {
  key: string;
  type: "period";
  fromDate: Date;
  toDate: Date;
  description?: string;
};
export type TCampaignPackageAccommodation = {
  key: string;
  type: "accommodation";
  accommodation: any;
  description?: string;
};
export type TCampaignPackageTickets = {
  key: string;
  type: "tickets";
  description: string;
};

export type TCampaignPackageBoatTrip = {
  key: string;
  type: "boatTrip";
  description: string;
};

type TCampaignPackage =
  | TCampaignPackageBoatTrip
  | TCampaignPackageTickets
  | TCampaignPackageAccommodation
  | TCampaignPackagePeriod;

type Port = {
  id: string;
  name: string;
};

type PriceItem = {
  key: string;
  nb?: number;
  en?: number;
  da?: number;
  de?: number;
  nl?: number;
};

type OriginPortPrice = {
  key: string;
  port: Port;
  price: PriceItem[];
  fjordClubPrice?: PriceItem[];
  portType?: "from" | "to";
};

type TCampaignPriceInfo = {
  disclaimer?: any;
  priceList: OriginPortPrice[];
};

export type TCampaignCTA = {
  text?: string;
  toPort: Port;
  priceFactor: number;
  priceTerms?: string;
  buttonText: string;
};

export type TCampaignBookingInfo = {
  defaultStretch: string;
  destinationPortsFilter: string;
  portsFilter?: string;
};

export type Campaigns = {
  supportedLanguages: "nb" | "da" | "en";
  id: string;
  title: string;
  slug: string;
  altSlugs: string;
  ingress: string;
  body: any;
  images: Image[];
  localeImages?: Image[];
  places: PlaceReference[];
  areas: AreaReference[];
  relations: Relations;
  season: Season;
  package: TCampaignPackage[];
  priceInfo: TCampaignPriceInfo;
  cta: TCampaignCTA;
  bookingInfo: TCampaignBookingInfo;
};
