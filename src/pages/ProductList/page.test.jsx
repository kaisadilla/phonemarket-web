import { render, screen } from "@testing-library/react";
import { beforeAll, describe, expect, it } from "vitest";
import ProductListPage from "./page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MantineProvider } from "@mantine/core";

beforeAll(() => {
  window.matchMedia = window.matchMedia || ((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }));
});

describe("ProductListPage", () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  it("renders the 'filter items' textbox", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MantineProvider>
          <ProductListPage />
        </MantineProvider>
      </QueryClientProvider>
    );
    const textbox = screen.getByPlaceholderText('Filter items');
    expect(textbox).toBeInTheDocument();
  });
});