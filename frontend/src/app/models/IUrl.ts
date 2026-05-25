export interface IShortUrl {
  message: string;
  data: {
    originalUrl: string;
    shortCode: string;
    shortUrl: string;
    clicks: number;
  };
}
