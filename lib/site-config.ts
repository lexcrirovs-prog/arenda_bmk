const siteOrigin = (process.env.NEXT_PUBLIC_SITE_ORIGIN ?? "http://kotelgavno.ru").replace(
  /\/$/,
  "",
);

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/arendabmk";
const normalizedBasePath = basePath.startsWith("/") ? basePath : `/${basePath}`;

export const siteConfig = {
  name: "АРЕНДА БМК",
  shortName: "Аренда БМК",
  factory: "Завод «Премиум Газ», Энгельс",
  description:
    "Аренда мобильных водогрейных и паровых котельных в контейнере: подменное тепло и технологический пар без CAPEX, с запуском от 24–48 часов, сервисом 24/7 и доставкой по России и СНГ.",
  siteOrigin,
  basePath: normalizedBasePath,
  url: `${siteOrigin}${normalizedBasePath}`,
  hotlineDisplay: "8 (800) 700-51-33",
  hotlineHref: "tel:+78007005133",
  email: "premium-gas@mail.ru",
  maxUrl: "https://max.ru/id6449067259_biz",
  catalogPdfPath: `${normalizedBasePath}/docs/arenda-bmk-brief.pdf`,
  catalogPdfUrl: `${siteOrigin}${normalizedBasePath}/docs/arenda-bmk-brief.pdf`,
  navigation: [
    { label: "Парк", href: "#catalog" },
    { label: "Калькулятор", href: "#calculator" },
    { label: "Тарифы", href: "#pricing" },
    { label: "Кейсы", href: "#cases" },
    { label: "Контакты", href: "#contact" },
  ],
} as const;

export const withBasePath = (path: string) => {
  if (!path) {
    return normalizedBasePath;
  }

  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  return `${normalizedBasePath}${path.startsWith("/") ? path : `/${path}`}`;
};

export const currencyFormatter = new Intl.NumberFormat("ru-RU", {
  style: "currency",
  currency: "RUB",
  maximumFractionDigits: 0,
});

export const compactNumberFormatter = new Intl.NumberFormat("ru-RU", {
  notation: "compact",
  maximumFractionDigits: 1,
});
