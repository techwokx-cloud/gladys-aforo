import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gladys Aforo Pedei Newman Foundation | Serving Mothers & Children in the Name of Christ",
  description:
    "The Gladys Aforo Pedei Newman Foundation is a Christian, non-denominational nonprofit supporting needy mothers and children across Accra, Ghana — through maternity ward support, NICU/PICU care, feeding programs, and more.",
  metadataBase: new URL("https://gladysaforofoundation.org"),
  openGraph: {
    title: "Gladys Aforo Pedei Newman Foundation",
    description: "Serving Mothers & Children in the Name of Christ",
    images: ["/images/gallery/g6.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
