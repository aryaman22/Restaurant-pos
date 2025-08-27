import "./globals.css";
import { Provider } from "react-redux";
import { store } from "../store";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Provider store={store}>
          {children}
        </Provider>
      </body>
    </html>
  );
}
