import "./globals.css";

export const metadata = {
  title: "SDcar Servis | Autoservis Breza",
  description: "Kompletný autoservis v Breze – diagnostika, motor, brzdy, prevodovky, karoséria a ďalšie opravy.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="sk">
      <body>{children}</body>
    </html>
  );
}
