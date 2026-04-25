export const getStories = async () => {
  const res = await fetch("https://69cfd6b2a4647a9fc6760d2c.mockapi.io/");
  return res.json();
};
