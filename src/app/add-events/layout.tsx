import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Create an Event",
  description:
    "Organize a local relief effort, environmental cleanup, or community support event on GoodWork.",
};

export default function CreateEventLayout({
  children,
}: {
  children: ReactNode;
}) {
  return children;
}
