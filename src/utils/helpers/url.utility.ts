import validUrl from 'valid-url';

export class UrlUtility {
  isValidUrl(url: string): boolean {
    if (!url || !validUrl.isUri(url)) {
      return false;
    }

    return true;
  }

  generateShortCode(length: number): string {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortCode = '';

    for (let i = 0; i < length; i++) {
      shortCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return shortCode;
  }
}
