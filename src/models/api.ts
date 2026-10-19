export async function fetchFisheyeData() {
  const url: string = "/data/photographers.json";
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Bad request");
  }
  const data = await response.json();

  return { photographers: data.photographers, media: data.media };
}
