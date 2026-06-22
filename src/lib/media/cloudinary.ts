export async function uploadImage(base64Data: string, folder = "oncampus"): Promise<string | null> {
  const cloudinaryUrl = process.env.CLOUDINARY_URL;
  if (!cloudinaryUrl) return null;

  // CLOUDINARY_URL format: cloudinary://api_key:api_secret@cloud_name
  const match = cloudinaryUrl.match(/cloudinary:\/\/([^:]+):([^@]+)@(.+)/);
  if (!match) return null;

  const [, apiKey, apiSecret, cloudName] = match;
  const credentials = Buffer.from(`${apiKey}:${apiSecret}`).toString("base64");

  const form = new FormData();
  form.append("file", base64Data);
  form.append("folder", folder);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      headers: { Authorization: `Basic ${credentials}` },
      body: form,
    },
  );

  if (!response.ok) {
    console.error("Cloudinary upload failed:", await response.text());
    return null;
  }

  const json = (await response.json()) as { secure_url?: string };
  return json.secure_url ?? null;
}
