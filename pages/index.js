const HeaderBar = (await import("landing/HeaderBar")).default;
const Footer = (await import("landing/Footer")).default;

export default function Home() {
  return (
    <div>
      <HeaderBar />
      Discovery page
      <Footer />
    </div>
  )
}
