const ORIGINAL_PHOTO_KEY = 'senzhao:original-photo';

export async function getOriginalPhoto(): Promise<string | null> {
  try {
    return localStorage.getItem(ORIGINAL_PHOTO_KEY);
  } catch {
    return null;
  }
}

export async function setOriginalPhoto(dataUrl: string): Promise<void> {
  try {
    localStorage.setItem(ORIGINAL_PHOTO_KEY, dataUrl);
  } catch {
    // ignore storage failures (e.g. quota exceeded, private browsing)
  }
}
