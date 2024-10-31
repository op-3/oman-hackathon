import type { Metadata } from "next";

export type EditPageParams = {
  id: string;
};

export type EditPageProps = {
  params: EditPageParams;
};

export type EditPageMetadata = Metadata;
