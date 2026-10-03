import SEO from "../components/SEO";

function Privacy() {
  return (
    <>
      <SEO
        title="Privacy Policy - QuickQR"
        description="Read the QuickQR privacy policy."
        canonical="/privacy-policy"
      />

      <main className="mx-auto max-w-4xl px-4 py-16 transition-colors duration-300 dark:text-white">
        <h1 className="text-4xl font-black">Privacy Policy</h1>

        <div className="mt-8 space-y-8 leading-7 text-slate-500">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Introduction
            </h2>

            <p className="mt-3">
              QuickQR respects your privacy and aims to minimize the information
              required to use our QR tools.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Information We Collect
            </h2>

            <p className="mt-3">
              We may collect limited technical information such as browser type,
              device information and anonymous usage information for improving
              the website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              QR Data
            </h2>

            <p className="mt-3">
              Where QR generation and scanning are performed locally in your
              browser, the data does not need to be uploaded to our server.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Advertising
            </h2>

            <p className="mt-3">
              We may use third-party advertising services to display
              advertisements on the website. These services may use cookies or
              similar technologies according to their own policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Contact
            </h2>

            <p className="mt-3">
              If you have questions about this policy, please contact us through
              our contact page.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default Privacy;
