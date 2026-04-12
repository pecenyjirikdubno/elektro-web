"use client";
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Typ služby
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400"
                  >
                    <option>Projekce elektro</option>
                    <option>Revize VN/NN</option>
                    <option>Elektromontáže VN/NN</option>
                    <option>Trafostanice</option>
                    <option>Jiná poptávka</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">
                    Zpráva
                  </label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Stručně popište, co potřebujete zajistit..."
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formState === "sending"}
                  className="w-full rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {formState === "sending" ? "Odesílám..." : "Odeslat poptávku"}
                </button>

                {formMessage && (
                  <p
                    className={`text-sm ${
                      formState === "success" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {formMessage}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <a
        href="https://wa.me/420720298279?text=Dobr%C3%BD%20den%2C%20m%C3%A1m%20z%C3%A1jem%20o%20nez%C3%A1vaznou%20konzultaci."
        target="_blank"
        rel="noreferrer"
        aria-label="Napsat na WhatsApp"
        className="fixed bottom-4 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-2xl transition hover:scale-105 hover:bg-green-400"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
          <path d="M20.52 3.48A11.82 11.82 0 0 0 12.09 0C5.5 0 .14 5.36.14 11.95c0 2.1.55 4.15 1.59 5.95L0 24l6.27-1.64a11.9 11.9 0 0 0 5.82 1.48h.01c6.58 0 11.95-5.36 11.95-11.95 0-3.19-1.24-6.18-3.53-8.41Zm-8.43 18.34h-.01a9.94 9.94 0 0 1-5.06-1.39l-.36-.21-3.72.97 1-3.62-.23-.37a9.93 9.93 0 0 1-1.53-5.25c0-5.49 4.47-9.96 9.97-9.96 2.66 0 5.16 1.03 7.04 2.92a9.88 9.88 0 0 1 2.91 7.04c0 5.49-4.47 9.96-9.96 9.96Zm5.46-7.45c-.3-.15-1.78-.88-2.05-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.18.2-.35.23-.65.08-.3-.15-1.27-.47-2.42-1.5a9.1 9.1 0 0 1-1.68-2.08c-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.68-1.64-.93-2.24-.25-.6-.5-.51-.68-.52h-.58c-.2 0-.53.08-.8.38-.28.3-1.06 1.03-1.06 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.13 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.89.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.31.18-1.43-.08-.13-.28-.2-.58-.35Z" />
        </svg>
      </a>

      <a
        href="#kontakt"
        className="fixed bottom-4 left-4 right-24 z-40 rounded-2xl bg-amber-400 px-6 py-4 text-center text-sm font-semibold text-slate-950 shadow-2xl transition hover:bg-amber-300 md:hidden"
      >
        Nezávazná poptávka
      </a>
    </div>
  );
}
