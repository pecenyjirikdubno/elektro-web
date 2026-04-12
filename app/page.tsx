"use client";
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Např. Jan Novák"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">Telefon</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+420 ..."
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">E-mail</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="vas@email.cz"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Typ služby</label>
                  <select
                    name="service"
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
                  <label className="mb-2 block text-sm font-medium text-slate-300">Zpráva</label>
                  <textarea
                    rows={5}
                    name="message"
                    required
                    placeholder="Stručně popište, co potřebujete zajistit..."
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-2xl bg-amber-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-amber-300"
                >
                  Odeslat poptávku
                </button>

                <p className="text-sm text-slate-500">
                  Po prvním testovacím odeslání potvrďte aktivaci formuláře v e-mailu pro info@jzelektro.cz.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <a
        href="#kontakt"
        className="fixed bottom-4 left-4 right-4 z-40 rounded-2xl bg-amber-400 px-6 py-4 text-center text-sm font-semibold text-slate-950 shadow-2xl transition hover:bg-amber-300 md:hidden"
      >
        Nezávazná poptávka
      </a>
    </div>
  );
}
