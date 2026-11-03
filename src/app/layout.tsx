import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "GoodWork — Turn compassion into action where you live",
    template: "%s | GoodWork",
  },
  description:
    "GoodWork is a community platform for local action. Discover nearby causes, join neighborhood events, or create your own event and rally volunteers in minutes.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${plusJakartaSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <Navbar />
       <main className="pt-20 pb-10">
         {children}
       </main>
         <Footer />
        </body>
    </html>
  );
}
