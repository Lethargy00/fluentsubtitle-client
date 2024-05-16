export interface Subtitle {
  id: string;
  uploaderName: string;
  language: string;
  isForHearingImpaired: boolean;
  uploadedDate: string;
  downloadCount: number;
  subtitleFile: Blob;
  subtitleFileName: string;
  subtitleFileSize: number;
  subtitleFileType: string;
}
