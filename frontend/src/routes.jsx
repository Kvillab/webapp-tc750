import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home.jsx";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
// import BlogPage from "./pages/BlogPage";
// import BlogDetailPage from "./pages/BlogDetailPage";
import ResearchPage from "./pages/ResearchPage";
import ResearchDetailPage from "./pages/ResearchDetailPage";
import Podcast from "./pages/Podcast";
// import ActivitiesPage from "./pages/ActivitiesPage";
// import ActivityDetailPage from "./pages/ActivityDetailPage";
import CalendarPage from "./pages/CalendarPage";
import SearchResultsPage from "./pages/SearchResultsPage";
// import AdminLogin from "./pages/AdminLogin";
// import AdminPanel from "./components/Admin/AdminPanel";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";
import EventsPage from "./pages/EventsPage";
import EventDetailPage from "./pages/EventDetailPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TestimonialsPage from "./pages/TestimonialsPage";
import ImpactPage from "./pages/ImpactPage";
import ImpactDetailPage from "./pages/ImpactDetailPage";
import ManualPage from "./pages/ManualPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/proyectos",
        element: <Projects />,
      },
      {
        path: "/proyectos/:slug",
        element: <ProjectDetailPage />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      // {
      //   path: "/explora-y-aprende",
      //   element: <BlogPage />,
      // },
      // {
      //   path: "/explora-y-aprende/:slug",
      //   element: <BlogDetailPage />,
      // },
      {
        path: "/explora-y-aprende",
        element: <ArticlesPage />,
      },
      {
        path: "/explora-y-aprende/:slug",
        element: <ArticleDetailPage />,
      },
      {
        path: "/sapere-aude",
        element: <ResearchPage />,
      },
      {
        path: "/sapere-aude/:slug",
        element: <ResearchDetailPage />,
      },
      {
        path: "/podcast",
        element: <Podcast />,
      },
      {
        path: "/mi-experiencia",
        element: <TestimonialsPage />,
      },
      {
        path: "/impacto-comunal",
        element: <ImpactPage />,
      },
      {
        path: "/impacto-comunal/:slug",
        element: <ImpactDetailPage />,
      },
      {
        path: "/manual-estudiante",
        element: <ManualPage />,
      },
      {
        path: "/vida-en-accion",
        element: <EventsPage />,
      },
      {
        path: "/vida-en-accion/:slug",
        element: <EventDetailPage />,
      },
      {
        path: "/calendario",
        element: <CalendarPage />,
      },
      {
        path: "/search",
        element: <SearchResultsPage />,
      },
      // {
      //   path: "/admin/login",
      //   element: <AdminLogin />,
      // },
      // {
      //   path: "/admin",
      //   element: <AdminPanel />,
      // },
    ],
  },
]);

export default router;
