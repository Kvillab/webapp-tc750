import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { postMensaje } from "../services/api";

const ContactPage = () => {
  const [form, setForm] = useState({ nombre: "", correo: "", mensaje: "" });
  const [status, setStatus] = useState(null); // "sending" | "success" | "error"

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await postMensaje(form);
      setStatus("success");
      setForm({ nombre: "", correo: "", mensaje: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="py-12 px-4 mx-auto max-w-2xl md:px-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900 md:text-4xl">
        Contacto
      </h1>
      <p className="mb-8 text-gray-600">
        ¿Tenés preguntas o querés colaborar con el TCU? Escribinos y te
        responderemos pronto.
      </p>

      {status === "success" ? (
        <div className="p-8 text-center bg-green-50 rounded-2xl border border-green-200">
          <CheckCircle size={40} className="mx-auto mb-3 text-green-500" />
          <h2 className="mb-2 text-xl font-semibold text-green-700">
            Mensaje enviado
          </h2>
          <p className="mb-4 text-green-600">
            Gracias por contactarnos. Te responderemos lo antes posible.
          </p>
          <button
            onClick={() => setStatus(null)}
            className="py-2 px-5 text-sm font-medium rounded-full transition-colors text-[#ed741b] bg-[#ed741b]/10 hover:bg-[#ed741b]/20"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5 bg-gray-50 rounded-2xl md:p-8"
        >
          <div>
            <label
              htmlFor="nombre"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              Nombre
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              value={form.nombre}
              onChange={handleChange}
              className="py-3 px-4 w-full text-sm bg-white rounded-lg border border-gray-200 transition-colors outline-none focus:ring-1 focus:border-[#4fb9ab] focus:ring-[#4fb9ab]"
              placeholder="Tu nombre"
            />
          </div>

          <div>
            <label
              htmlFor="correo"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              Correo electrónico
            </label>
            <input
              id="correo"
              name="correo"
              type="email"
              required
              value={form.correo}
              onChange={handleChange}
              className="py-3 px-4 w-full text-sm bg-white rounded-lg border border-gray-200 transition-colors outline-none focus:ring-1 focus:border-[#4fb9ab] focus:ring-[#4fb9ab]"
              placeholder="tu@correo.com"
            />
          </div>

          <div>
            <label
              htmlFor="mensaje"
              className="block mb-1.5 text-sm font-medium text-gray-700"
            >
              Mensaje
            </label>
            <textarea
              id="mensaje"
              name="mensaje"
              required
              rows={5}
              value={form.mensaje}
              onChange={handleChange}
              className="py-3 px-4 w-full text-sm bg-white rounded-lg border border-gray-200 transition-colors outline-none resize-y focus:ring-1 focus:border-[#4fb9ab] focus:ring-[#4fb9ab]"
              placeholder="Escribí tu mensaje..."
            />
          </div>

          {status === "error" && (
            <div className="flex gap-2 items-center p-3 text-sm text-red-700 bg-red-50 rounded-lg">
              <AlertCircle size={16} className="shrink-0" />
              Error al enviar el mensaje. Intentá de nuevo.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex gap-2 items-center py-3 px-6 text-sm font-medium text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed bg-[#ed741b] hover:bg-[#ed741b]/90"
          >
            <Send size={16} />
            {status === "sending" ? "Enviando..." : "Enviar"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactPage;
