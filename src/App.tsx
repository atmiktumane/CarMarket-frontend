import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";

export const App = () => {
  return (
    <MantineProvider>
      <div className="text-3xl">CarMarket Application Started</div>
    </MantineProvider>
  );
};
