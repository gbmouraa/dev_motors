const slugs: { [key: string]: string } = {
  eletrico: "Carros elétricos",
  hatch: "Hatches",
  picape: "Picapes",
  sedan: "Sedans",
  suv: "SUVs",
};

export const formatCategorySlug = (slug: string): string => {
  return slugs[slug];
};
