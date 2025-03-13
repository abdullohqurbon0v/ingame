export const fallbackLng = "uz";
export const languages = [fallbackLng, "ru"];
export const cookieName = "i18next";

export function getOptions(lng = fallbackLng) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
  };
}
