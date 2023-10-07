import { Connector } from "@/components/connector/Connector"
import "./globals.css";

import { Roboto } from "next/font/google";

export const inter = Roboto({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={`${inter.className}`} lang="en" data-theme="dark">
      <body><Connector>{children}</Connector></body>
    </html>
  );
}
