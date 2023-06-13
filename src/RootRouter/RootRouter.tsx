import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import TodoList from "../pages/TodoList/TodoList";
import Index from "../pages/Index/Index";
import NotFound from "../pages/Error/NotFound";
import ErrorBoundary from "../components/ErrorBoundary";
import Error from "../pages/Error/Error";

function RootRouter() {
  return (
    <ErrorBoundary fallback={<Error />}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/todo" element={<TodoList />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default RootRouter;
