import SEO from "../components/SEO";

function Contact() {
  return (
    <>
      <SEO
        title="Contact QuickQR"
        description="Contact the QuickQR team."
        canonical="/contact"
      />

      <main className="mx-auto max-w-2xl px-4 py-16 text-slate-900 transition-colors duration-300 dark:text-white">
        <h1 className="text-4xl font-black">Contact Us</h1>

        <p className="mt-4 text-slate-500 dark:text-slate-400">
          Have a question, suggestion or issue? We'd love to hear from you.
        </p>

        <form
          action="mailto:hello@yourdomain.com"
          method="post"
          encType="text/plain"
          className="mt-8 space-y-5"
        >
          <input
            name="name"
            placeholder="Your name"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
          />

          <input
            name="email"
            type="email"
            placeholder="Your email"
            required
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
          />

          <textarea
            name="message"
            rows="6"
            placeholder="Your message"
            required
            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition-colors focus:border-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-indigo-600 px-5 py-3 font-bold text-white hover:bg-indigo-700"
          >
            Send Message
          </button>
        </form>
      </main>
    </>
  );
}

export default Contact;
