import SEO from "../components/SEO";

function About() {
  return (
    <>
      <SEO
        title="About QuickQR"
        description="Learn more about QuickQR, a free online QR code generator and scanner."
        canonical="/about"
      />

      <main className="min-h-screen bg-white px-4 py-16 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-white">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            About QuickQR
          </h1>

          <div className="mt-8 space-y-6 text-base leading-7 text-slate-500 dark:text-slate-400">
            <p>
              QuickQR is an online platform designed to make creating and
              scanning QR codes simple and fast.
            </p>

            <p>
              Users can create QR codes for websites, WiFi, WhatsApp, contacts,
              text and other supported information.
            </p>

            <p>
              Our goal is to provide simple, useful and accessible QR tools
              without unnecessary complexity.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default About;
