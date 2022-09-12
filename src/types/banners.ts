export interface BannersIndex {
  endDate: string;
  link: string;
  text?: string;
  html?: string;
  startDate: string;
}

export interface BannersBLM {
  link: string;
  text: string;
  visible: boolean;
}

export interface Banners {
  banners: {
    index: BannersIndex;
    blacklivesmatter: BannersBLM;
  };
}
