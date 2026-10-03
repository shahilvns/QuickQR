import SEO from "../components/SEO";

function Terms() {
  return (
    <>
      <SEO
        title="Terms of Service - QuickQR"
        description="Read the QuickQR terms of service."
        canonical="/terms"
      />

      <main className="mx-auto max-w-4xl px-4 py-16 transition-colors duration-300 dark:text-white">
        <h1 className="text-4xl font-black">Terms of Service</h1>

        <div className="mt-8 space-y-8 leading-7 text-slate-500">
          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Use of Service
            </h2>

            <p className="mt-3">
              You agree to use QuickQR only for lawful purposes and in
              accordance with applicable laws.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Availability
            </h2>

            <p className="mt-3">
              We may modify, suspend or improve parts of the service at any
              time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              User Responsibility
            </h2>

            <p className="mt-3">
              You are responsible for the information and content encoded into
              QR codes you create.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}

export default Terms;
