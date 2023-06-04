import "./globals.css";
import { Nunito } from "next/font/google";

const nunito = Nunito({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext", "vietnamese"],
});

export const metadata = {
  title: "Moge Tee",
  description: "DEDICATED JUST FOR TEA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
