import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <section className="error-page">
      <h1>¡Oops!</h1>
      <p>Lo sentimos, ha ocurrido un error inesperado.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <a href="/">Volver al inicio</a>
    </section>
  );
};

export default ErrorPage;
