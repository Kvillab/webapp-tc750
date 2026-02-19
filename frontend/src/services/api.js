const BASE_URL = import.meta.env.VITE_STRAPI_URL || "http://localhost:1337";

async function fetchAPI(path) {
  const res = await fetch(`${BASE_URL}/api${path}`);
  if (!res.ok) throw new Error(`Error ${res.status}: ${path}`);
  const json = await res.json();
  return json.data;
}

export function getImageUrl(media) {
  const url = typeof media === "string" ? media : media?.url;
  if (!url) return null;
  if (url.startsWith("http")) return url;
  return `${BASE_URL}${url}`;
}

export async function getPaginaPrincipal() {
  return fetchAPI(
    "/pagina-principal?populate[heroImagen][populate]=*&populate[evento_destacado][populate][categoria]=true&populate[evento_destacado][populate][metricas]=true&populate[evento_destacado][populate][imagenes]=true",
  );
}

export async function getFooter() {
  return fetchAPI("/footer");
}

export async function getHeader() {
  return fetchAPI("/header?populate=*");
}

export async function getArticulos(params = "") {
  return fetchAPI(`/articulos?populate=*${params}`);
}

export async function getArticulo(slug) {
  const data = await fetchAPI(
    `/articulos?filters[slug][$eq]=${slug}&populate=*`,
  );
  return data[0] || null;
}

export async function getInvestigaciones(params = "") {
  return fetchAPI(`/investigaciones?populate=*${params}`);
}

export async function getInvestigacion(slug) {
  const data = await fetchAPI(
    `/investigaciones?filters[slug][$eq]=${slug}&populate=*`,
  );
  return data[0] || null;
}

export async function postMensaje(data) {
  const res = await fetch(`${BASE_URL}/api/mensajes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data }),
  });
  if (!res.ok) throw new Error("Error al enviar mensaje");
  return res.json();
}

export async function getEvento(slug) {
  const data = await fetchAPI(
    `/eventos?filters[slug][$eq]=${slug}&populate[imagenes]=true&populate[categoria]=true&populate[metricas]=true&populate[contenido][on][evento.bloque-texto][populate]=*&populate[contenido][on][evento.galeria][populate][ImagenConPie][populate]=*&populate[contenido][on][evento.testimonio][populate]=*&populate[contenido][on][evento.aprendizajes-clave][populate]=*`,
  );
  return data[0] || null;
}

export async function getEventos(params = "") {
  return fetchAPI(
    `/eventos?populate[imagenes]=true&populate[categoria]=true&populate[metricas]=true${params}`,
  );
}

export async function getSobreElTcu() {
  return fetchAPI("/sobre-el-tcu");
}
