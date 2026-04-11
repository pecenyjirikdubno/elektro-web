"use client";
                <div>
                  <div className="text-sm text-slate-500">Telefon</div>
                  <div className="font-medium text-white">+420 123 456 789</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">E-mail</div>
                  <div className="font-medium text-white">info@elektroservis.cz</div>
                </div>
                <div>
                  <div className="text-sm text-slate-500">Adresa</div>
                  <div className="font-medium text-white">Doplňte firemní adresu</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-amber-400/20 bg-slate-950 p-6 shadow-2xl">
              <form className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Jméno a příjmení</label>
                  <input
                    type="text"
                    placeholder="Např. Jan Novák"
                    className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">Telefon</label>
                    <input
                      type="tel"
                      placeholder="+420 ..."
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-slate-300">E-mail</label>
                    <input
                      type="email"
                      placeholder="vas@email.cz"
                      className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-300">Typ služby</label>
                  <select className="w-full rounded-2xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none transition focus:border-amber-400">
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
                  Formulář je nyní připravený vizuálně. V dalším kroku ho můžeme napojit, aby skutečně posílal e-maily.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
