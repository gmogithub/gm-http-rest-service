export function sha256(str: string) {
  const utf8Encoder = new TextEncoder();
  const buffer = utf8Encoder.encode(str);
  return crypto.subtle.digest("SHA-256", buffer).then(hashBuffer => {
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  });
}